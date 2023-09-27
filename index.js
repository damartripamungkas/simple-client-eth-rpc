const EthNameSpace = require("./src/name_space/eth");
const ConnectHttp = require("./src/connect/http");
const ConnectIpc = require("./src/connect/ipc");
const ConnectWs = require("./src/connect/ws");

class Provider {
    #provider;
    #typeNetwork;
    #nextId = 0;
    #maxSafeNextId = Number.MAX_SAFE_INTEGER - 100;
    #poolMessage = new Map();
    #handleErrorOther = (err) => { err };

    /**
     * 
     * @param urlRpc url node blockchain 
     * @param handleErrorOther function to handle error other than JSON-RPC
     */
    constructor(urlRpc = "", handleErrorOther = (err) => { err }) {
        this.#handleErrorOther = handleErrorOther;

        const listenPoolMessage = () => {
            this.#provider.client.on("message", (res) => {
                res = JSON.parse(res);
                if (res?.params?.subscription !== undefined) return;
                if (res.length !== undefined) return;
                const resolve = this.#poolMessage.get(res.id);
                resolve(res);
            })
        };

        try {
            if (urlRpc.startsWith("http")) {
                this.#typeNetwork = "http";
                this.#provider = new ConnectHttp(urlRpc);
                this.subscribe = () => { throw `network type http not support subscribe` };
            }

            if (urlRpc.startsWith("ws")) {
                this.#typeNetwork = "ws";
                this.#provider = new ConnectWs(urlRpc);
                listenPoolMessage();
            }

            if (urlRpc.endsWith(".ipc")) {
                this.#typeNetwork = "ipc";
                this.#provider = new ConnectIpc(urlRpc);
                listenPoolMessage();
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
     * @param {*} args format: [method, params]
     * @param {*} args example: ["eth_subscribe", "newPendingTransactions"]
     * @returns subs id string
     */
    subscribe = async (args = [], callbackRes = (res) => { res }) => {
        const subsId = await this.send(args);
        const handle = (res) => {
            try {
                res = JSON.parse(res);
                if (res?.params?.subscription == subsId) {
                    callbackRes(res.params.result);
                }
            } catch (err) {
                this.#handleErrorOther(err);
            }
        };

        this.#provider.client.on("message", handle);
        return subsId;
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
        const bodyJsonRpc = JSON.stringify({ jsonrpc: "2.0", id, method: args[0], params: args[1] });
        let result = {};

        if (this.#typeNetwork == "http") {
            result = await this.#provider.send(bodyJsonRpc);
        }

        if (this.#typeNetwork == "ws" || this.#typeNetwork == "ipc") {
            result = await new Promise((resolve) => {
                // const handle = (res) => {
                //     let isReturn;
                //     try {
                //         const parseRes = JSON.parse(res);
                //         if (id == parseRes.id) {
                //             resolve(parseRes);
                //             isReturn = true;
                //         }
                //     } catch (err) {
                //         reject(err)
                //         isReturn = true;
                //     }

                //     if (isReturn === true) {
                //         this.#provider.client.removeListener("message", handle);
                //     }
                // }

                // this.#provider.client.on("message", handle);
                this.#poolMessage.set(id, resolve);
                this.#provider.send(bodyJsonRpc);
            });
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
        const lengthArgs = args.length;
        const dataJsonRpc = args.map(it => {
            this.#incrementNextId();
            return {
                jsonrpc: "2.0",
                id: this.#nextId,
                method: it[0],
                params: it[1]
            }
        });

        const bodyJsonRpc = JSON.stringify(dataJsonRpc);

        if (this.#typeNetwork == "http") {
            const res = await this.#provider.send(bodyJsonRpc);
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
                    try {
                        const parseRes = JSON.parse(res);
                        if (parseRes.length == lengthArgs) {
                            const resFilter = parseRes.filter((it1, index) => {
                                const it2 = dataJsonRpc[index];
                                if (it1.id != it2.id) return false;
                                if (it1.error !== undefined) throw it1.error;
                                return true;
                            });

                            if (resFilter.length == lengthArgs) {
                                const map = parseRes.map((it1, index) => {
                                    const returnFormat = args[index][2];
                                    if (returnFormat === undefined) return it1.result;
                                    return returnFormat(it1.result);
                                });

                                resolve(map);
                                this.#provider.client.removeListener("message", handle);
                            }
                        }
                    } catch (err) {
                        this.#handleErrorOther(err);
                    }
                }

                this.#provider.client.on("message", handle);
                this.#provider.send(bodyJsonRpc);
            });
        }
    }

    isReady = async () => {
        return await this.#provider.isReady();
    }
}

module.exports = { Provider, EthNameSpace };