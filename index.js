const EthNameSpace = require("./src/name_space/eth");
const ConnectHttp = require("./src/connect/http");
const ConnectIpc = require("./src/connect/ipc");
const ConnectWs = require("./src/connect/ws");
const InterfaceReconnectOpt = { autoReconnect: true, delay: 500, maxAttempts: Number.MAX_SAFE_INTEGER };

class Provider {
    client;
    #typeNetwork;
    #nextId = 0;
    #maxSafeNextId = Number.MAX_SAFE_INTEGER - 100;

    /**
     * 
     * @param urlRpc url node blockchain 
     * @param handleErrorOther function to handle error other than JSON-RPC
     */
    constructor(urlRpc = "", socketOpt = {}, reconnectOpt = InterfaceReconnectOpt, handleErrorOther = (err) => { err }) {
        try {
            if (urlRpc.startsWith("http")) {
                this.#typeNetwork = "http";
                this.client = new ConnectHttp(urlRpc, socketOpt);
                this.subscribe = () => { throw `network type http not support subscribe` };
            }

            if (urlRpc.startsWith("ws")) {
                this.#typeNetwork = "ws";
                this.client = new ConnectWs(urlRpc, socketOpt, reconnectOpt);
            }

            if (urlRpc.endsWith(".ipc")) {
                this.#typeNetwork = "ipc";
                this.client = new ConnectIpc(urlRpc, socketOpt, reconnectOpt);
            }
        } catch (err) {
            handleErrorOther(err);
        }
    }

    #incrementNextId = () => {
        if (this.#nextId >= this.#maxSafeNextId) this.#nextId = 0;
        return this.#nextId += 1; // increment id jsonrpc
    }

    /**
     * 
     * @returns when "true" is ready
     */
    isReady = async () => {
        return await this.client.isReady();
    }

    /**
     * 
     * @param {*} payload object or array object JSON-RPC request 
     * @returns result without handling error
     */
    request = async (payload = {} || []) => {
        return await this.client.client.request(payload);
    }

    /**
     * 
     * @param {*} args format: [method, params]
     * @param {*} args example: ["eth_subscribe", "newPendingTransactions"]
     * @callback res = result, subsId = subscription id
     */
    subscribe = async (args = [], reconnect = false, callbackRes = (res, subsId) => { res, subsId }) => {
        let subsId = await this.send(args);
        const handle = (res) => {
            if (res?.params?.subscription == subsId) {
                callbackRes(res.params.result, subsId);
            }
        };

        this.client.client.on("message", handle);
        if (reconnect === true) {
            this.client.client.on("connect", async () => {
                subsId = await this.send(args);
            });
        }
    }

    /**
     * 
     * @param {*} args format: [method, params, functionReturnFormat]
     * @param {*} args example: ["eth_chainId", [], parseInt]
     * @returns string || object || number
     */
    send = async (args = []) => {
        const id = this.#incrementNextId();
        const returnFormat = args[2];
        const bodyJsonRpc = { jsonrpc: "2.0", id, method: args[0], params: args[1] };
        let result = {};
        if (this.#typeNetwork == "http") {
            result = await this.client.client.request(bodyJsonRpc);
        }

        if (this.#typeNetwork == "ws" || this.#typeNetwork == "ipc") {
            result = await this.client.client.request(bodyJsonRpc);
        }

        if (result.error !== undefined) throw result.error;
        if (returnFormat === undefined) return result.result;
        return returnFormat(result.result);
    }

    /**
     * 
     * @param {*} args format: [method, params, functionReturnFormat], [method, params, functionReturnFormat]
     * @param {*} args example: ["eth_chainId", [], parseInt], ["eth_chainId", [], parseInt]
     * @returns [string || object || number, string || object || number]
     */
    sendBatch = async (...args) => {
        const bodyJsonRpc = args.map(it => {
            this.#incrementNextId();
            return {
                jsonrpc: "2.0",
                id: this.#nextId,
                method: it[0],
                params: it[1]
            }
        });

        if (this.#typeNetwork == "http") {
            const res = await this.client.client.request(bodyJsonRpc);
            return res.map((it, index) => {
                if (it.error !== undefined) throw it.error;
                const returnFormat = args[index][2];
                if (returnFormat === undefined) return it.result;
                return returnFormat(it.result);
            });
        }

        if (this.#typeNetwork == "ws" || this.#typeNetwork == "ipc") {
            return await new Promise((resolve) => {
                const handle = (res) => {
                    const map = res.map((it1, index) => {
                        if (it1.error !== undefined) throw it1.error;
                        const returnFormat = args[index][2];
                        if (returnFormat === undefined) return it1.result;
                        return returnFormat(it1.result);
                    });

                    resolve(map);
                }

                this.client.client.request(bodyJsonRpc).then(handle);
            });
        }
    }
}

module.exports = { Provider, EthNameSpace };