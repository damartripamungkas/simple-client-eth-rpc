const EthNameSpace = require("./src/name_space/eth");
const ConnectHttp = require("./src/connect/http");
const ConnectIpc = require("./src/connect/ipc");
const ConnectWs = require("./src/connect/ws");
const InterfaceReconnectOpt = { autoReconnect: true, delay: 500, maxAttempts: Number.MAX_SAFE_INTEGER };

class Provider {
    client;
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
                this.client = new ConnectHttp(urlRpc, socketOpt);
                this.subscribe = () => { throw `network type http not support subscribe` };
            }

            if (urlRpc.startsWith("ws")) {
                this.client = new ConnectWs(urlRpc, socketOpt, reconnectOpt);
            }

            if (urlRpc.endsWith(".ipc")) {
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

    #returnSend = (result, returnFormat) => {
        if (result.error !== undefined) throw result.error.message;
        if (returnFormat === undefined) return result.result;
        return returnFormat(result.result);
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
        const bodyJsonRpc = { jsonrpc: "2.0", id, method: args[0], params: args[1] };
        const result = await this.client.client.request(bodyJsonRpc);
        return this.#returnSend(result, args[2]);
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

        const res = await this.client.client.request(bodyJsonRpc);
        return res.map((it, index) => this.#returnSend(it, args[index][2]));
    }
}

module.exports = { Provider, EthNameSpace };