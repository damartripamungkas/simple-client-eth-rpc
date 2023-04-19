const net = require('net');
const Websocket = require('ws');


class ConnectHttp {
    #url;
    constructor(url = "") {
        this.#url = url;
        this.#connect();
    }

    async #connect() {
        const res = await fetch(this.#url, { method: "GET" });
        if (res.status == 200) return true;
    }

    async send(data) {
        try {
            const res = await fetch(this.#url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            });
            return await res.json();
        } catch (err) {
            throw err;
        }
    }

    isReady() {
        return true;
    }
}

class ConnectWebsocket {
    #ws;
    #url;
    constructor(url = "") {
        this.#url = url;
        this.#connect();
    }

    #connect() {
        this.#ws = new Websocket(this.#url, { handshakeTimeout: 20000 });
        this.#ws.on("close", () => {
            setTimeout(() => {
                this.#ws.terminate();
                this.#ws = new Websocket(this.#url, { handshakeTimeout: 20000 });
                console.log("network is disconnect, try reconnect in 2s");
            }, 2000)
        });
    }

    onMessage(callbackRes) {
        this.#ws.on("message", callbackRes)
    }

    onError(callbackRes) {
        this.#ws.on("error", callbackRes)
    }

    send(data) {
        this.#ws.send(data)
    }

    async isReady() {
        return new Promise((resolve) => {
            this.#ws.on("open", () => resolve(true));
            this.#ws.off("open", () => { });
        })
    }
}

class ConnectIpc {
    #ipc;
    #url;
    constructor(url = "") {
        this.#url = url;
        this.#connect();
    }

    #connect() {
        this.#ipc = net.createConnection(this.#url);
        this.#ipc.on("close", () => {
            setTimeout(() => {
                this.#ipc.destroy();
                this.#ipc = net.createConnection(this.#url);
                console.log("network is disconnect, try reconnect in 2s");
            }, 2000)
        });
    }

    onMessage(callbackRes) {
        this.#ipc.on("data", callbackRes)
    }

    onError(callbackRes) {
        this.#ipc.on("error", callbackRes)
    }

    send(data) {
        this.#ipc.write(data)
    }

    async isReady() {
        return new Promise((resolve) => {
            this.#ipc.on("ready", () => resolve(true));
            this.#ipc.off("ready", () => { });
        })
    }
}

class EthRpc {
    #provider;
    #typeNetwork;
    #nextId = 0;
    #maxSafeNextId = Number.MAX_SAFE_INTEGER - 100;
    #eventList = { onMessage: [], onError: [] };

    constructor(urlRpc = "", onError = (err) => { }) {
        if (urlRpc.startsWith("http")) {
            this.#typeNetwork = "http";
            this.#provider = new ConnectHttp(urlRpc)
        } else if (urlRpc.startsWith("ws")) {
            this.#typeNetwork = "ws";
            this.#provider = new ConnectWebsocket(urlRpc);
            this.subscribe = this.#subscribe; // convert private func to public
            this.unSubscribe = this.#unSubscribe; // convert private func to public
            this.#provider.onError(res => onError(res));
            this.#provider.onMessage(res => {
                if (res.method != "eth_subscription") this.#eventList.onMessage.push(res);
            });
        } else if (urlRpc.startsWith("ipc")) {
            this.#typeNetwork = "ipc";
            this.#provider = new ConnectIpc(urlRpc);
            this.subscribe = this.#subscribe; // convert private func to public
            this.unSubscribe = this.#unSubscribe; // convert private func to public
            this.#provider.onError(res => onError(res));
            this.#provider.onMessage(res => {
                if (res.method != "eth_subscription") this.#eventList.onMessage.push(res);
            });
        }

        setInterval(() => {
            if (this.#nextId >= this.#maxSafeNextId) this.#nextId = 0;
        }, 50);
    }

    async #subscribe(params = "", callbackRes = (res) => { }) {
        this.#nextId += 1; // increment id jsonrpc
        const dataJsonRpc = JSON.stringify({ jsonrpc: "2.0", id: this.#nextId, method: "eth_subscribe", params: [params] });
        const handle = (it) => {
            try {
                callbackRes(JSON.parse(it));
            } catch (err) {
                // callbackRes(err, null);
            }
        };
        this.#provider.send(dataJsonRpc);
        this.#provider.onMessage(handle);
    }

    async #unSubscribe(subId = "") {
        return await this.send("eth_unsubscribe", [subId]);
    }

    async send(method = "", params = []) {
        this.#nextId += 1; // increment id jsonrpc
        const id = this.#nextId;
        const dataJsonRpc = JSON.stringify({ jsonrpc: "2.0", id, method, params });

        if (this.#typeNetwork == "http") return await this.#provider.send(dataJsonRpc);
        if (this.#typeNetwork == "ws" || this.#typeNetwork == "ipc") {
            this.#provider.send(dataJsonRpc);
            const result = await new Promise((resolve, reject) => {
                let idSetInterval = 0;
                const handle = (it, index, eventMethod) => {
                    try {
                        it = JSON.parse(it);
                        if (it.id == id) {
                            resolve(it);

                            // delete value eventList with index
                            let arr = this.#eventList[eventMethod];
                            arr.splice(index, 1);
                            this.#eventList[eventMethod] = arr;

                            // stop operation setInterval
                            clearInterval(idSetInterval);
                        }
                    } catch (err) {
                        reject(err);

                        // stop operation setInterval
                        clearInterval(idSetInterval);
                    }
                };

                idSetInterval = setInterval(() => {
                    this.#eventList.onMessage.forEach((it, index) => handle(it, index, "onMessage"));
                });
            });
            return result;
        }
    }

    async sendBatch(methodAndParams = [{ method: "", params: [] }]) {
        methodAndParams = methodAndParams.map(it => {
            this.#nextId += 1; // increment id jsonrpc
            return Object.assign(it, { jsonrpc: "2.0", id: this.#nextId });
        });

        const lengthMethodAndParams = methodAndParams.length;
        const dataJsonRpc = JSON.stringify(methodAndParams);

        if (this.#typeNetwork == "http") return await this.#provider.send(dataJsonRpc);
        if (this.#typeNetwork == "ws" || this.#typeNetwork == "ipc") {
            this.#provider.send(dataJsonRpc);
            const result = await new Promise((resolve, reject) => {
                let idSetInterval = 0;
                const handle = (it, index, eventMethod) => {
                    try {
                        it = JSON.parse(it);
                        if (
                            Array.isArray(it) &&
                            lengthMethodAndParams == methodAndParams.filter(f => it.some(item => item.id === f.id)).length
                        ) {
                            resolve(it);

                            // delete value eventList with index
                            let arr = this.#eventList[eventMethod];
                            arr.splice(index, 1);
                            this.#eventList[eventMethod] = arr;

                            // stop operation setInterval
                            clearInterval(idSetInterval);
                        }
                    } catch (err) {
                        reject(it);

                        // stop operation setInterval
                        clearInterval(idSetInterval);
                    }
                };

                idSetInterval = setInterval(() => {
                    this.#eventList.onMessage.forEach((it, index) => handle(it, index, "onMessage"));
                });
            });
            return result;
        }
    }

    async isReady() {
        return await this.#provider.isReady();
    }
}

module.exports = EthRpc;