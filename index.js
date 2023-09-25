const net = require('net');
const Websocket = require('ws');
const InterfaceTxObj = { to: "", from: "", data: "0x", gasLimit: "0", gasPrice: "0", maxFeePerGas: "0", maxPriorityFeePerGas: "0", lastBaseFeePerGas: "0", value: "0", nonce: "0", chainId: "0" };
const InterfaceTxObjCall = { to: "", from: "", data: "0x", gasLimit: "0", gasPrice: "0", value: "0" };
const InterfaceGetLogs = { fromBlock: "", toBlock: "", address: "", topics: "", blockHash: "" };
const InterfaceGetStorageAt = { address: "", position: "", quantityOrTag: "pending" };
const InterfaceNewFilter = { fromBlock: "", toBlock: "", address: "", topics: "", };
const InterfaceTraceCall = { from: "", to: "", gas: "", gasPrice: "", value: "", data: "" };
const InterfaceTraceFilter = { fromBlock: "", toBlock: "", fromAddress: "", toAddress: "", after: "", count: "" };


class ConnectHttp {
    constructor(url = "") {
        this.url = url;
    }

    connect = () => { }

    isReady() { return true; }

    send = async (data) => {
        const res = await fetch(this.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data
        });
        const jsonData = await res.json();
        return jsonData;
    }
}

class ConnectWebsocket {
    constructor(url = "") {
        this.client = this.connect(url);
    }

    connect = (url) => {
        const args = [url, { handshakeTimeout: 20000 }];
        const client = new Websocket(...args);
        client.on("close", () => {
            setTimeout(() => {
                client.terminate();
                this.client = new Websocket(...args);
            }, 2000)
        });

        return client;
    }

    isReady = async () => {
        return new Promise(resolve => {
            this.client.once("open", () => resolve(true));
        })
    }

    send = (data) => {
        this.client.send(data);
    }
}

class ConnectIpc {
    constructor(url = "") {
        this.client = this.connect(url);
    }

    connect = (url) => {
        const client = net.createConnection(url);
        client.on("close", () => {
            setTimeout(() => {
                client.destroy();
                this.client = net.createConnection(url);
            }, 2000)
        });

        return client;
    }

    isReady = async () => {
        return new Promise(resolve => {
            this.client.on("ready", () => resolve(true));
        })
    }

    send = (data) => {
        this.client.send(data);
    }
}

class EthRpc {
    #provider;
    #typeNetwork;
    #nextId = 0;
    #maxSafeNextId = Number.MAX_SAFE_INTEGER - 100;

    constructor(urlRpc = "") {
        if (urlRpc.startsWith("http")) {
            this.#typeNetwork = "http";
            this.#provider = new ConnectHttp(urlRpc);
            this.subscribe = () => { throw `network type http not support subscribe` };
        }

        if (urlRpc.startsWith("ws")) {
            this.#typeNetwork = "ws";
            this.#provider = new ConnectWebsocket(urlRpc);
        }

        if (urlRpc.endsWith(".ipc")) {
            this.#typeNetwork = "ipc";
            this.#provider = new ConnectIpc(urlRpc);
        }
    }

    #incrementNextId = () => {
        if (this.#nextId >= this.#maxSafeNextId) this.#nextId = 0;
        this.#nextId += 1; // increment id jsonrpc
    }

    subscribe = async (method = "", params = [], callbackRes = (res) => { res }) => {
        /**
         * example params:
         * eth_subscribe, ["newPendingTransactions"]
         */
        this.#incrementNextId();
        const bodyJsonRpc = JSON.stringify({ jsonrpc: "2.0", id: this.#nextId, method, params });
        const handle = (res) => {
            try {
                callbackRes(JSON.parse(res));
            } catch (err) {
                // callbackRes(err, null);
            }
        };

        this.#provider.send(bodyJsonRpc);
        this.#provider.onMessage(handle);
    }

    send = async (method = "", params = []) => {
        this.#incrementNextId();
        const id = this.#nextId;
        const bodyJsonRpc = JSON.stringify({ jsonrpc: "2.0", id, method, params });
        let result;

        if (this.#typeNetwork == "http") {
            result = await this.#provider.send(bodyJsonRpc);
        }

        if (this.#typeNetwork == "ws" || this.#typeNetwork == "ipc") {
            result = await new Promise((resolve, reject) => {
                const handle = (res) => {
                    try {
                        const parseRes = JSON.parse(res);
                        if (id == parseRes.id) resolve(parseRes);
                    } catch (err) {
                        reject(err)
                    }
                }

                this.#provider.onMessage(handle);
                this.#provider.send(bodyJsonRpc);
            });
        }

        if (result.error !== undefined) throw result.error;
        return result.result;
    }

    sendBatch = async (params = [{ method: "", params: [] }]) => {
        const lengthParams = params.length;
        const dataJsonRpc = params.map(it => {
            this.#incrementNextId();
            return Object.assign(it, { jsonrpc: "2.0", id: this.#nextId });
        });

        const bodyJsonRpc = JSON.stringify(dataJsonRpc);

        if (this.#typeNetwork == "http") {
            const res = await this.#provider.send(bodyJsonRpc);
            return res.map(it => {
                if (it.error !== undefined) throw it.error;
                return it.result;
            });
        }

        if (this.#typeNetwork == "ws" || this.#typeNetwork == "ipc") {
            return await new Promise((resolve, reject) => {
                const handle = (res) => {
                    try {
                        const parseRes = JSON.parse(res);
                        if (Array.isArray(parseRes) && parseRes.length == lengthParams) {
                            const map = parseRes.map((it1, index) => {
                                const it2 = params[index];
                                if (it1.id == it2.id) {
                                    if (it1.error !== undefined) throw it1.error;
                                    return it1.result;
                                }
                            });

                            resolve(map);
                        }
                    } catch (err) {
                        reject(err)
                    }
                }

                this.#provider.onMessage(handle);
                this.#provider.send(bodyJsonRpc);
            });
        }
    }

    isReady = async () => {
        return await this.#provider.isReady();
    }

    async eth_blockNumber() {
        return BigInt(await this.send("eth_blockNumber", []));
    }

    async eth_chainId() {
        return await this.send("eth_chainId", []);
    }

    async eth_call(tx = InterfaceTxObjCall, quantityOrTag = "latest") {
        return await this.send("eth_call", [tx, quantityOrTag]);
    }

    async eth_estimateGas(tx = InterfaceTxObj, tag = "pending") {
        return BigInt(await this.send("eth_estimateGas", [tx, tag]));
    }

    async eth_feeHistory(blockCount = "1", latestBlock = "pending", rewardPercentiles = ["25", "75"]) {
        return await this.send("eth_feeHistory", [blockCount, latestBlock, rewardPercentiles]);
    }

    async eth_gasPrice() {
        return BigInt(await this.send("eth_gasPrice", []));
    }

    async eth_getBalance(address = "", tag = "pending") {
        return BigInt(await this.send("eth_getBalance", [address, tag]));
    }

    async eth_getBlockByHash(hash = "", txDetail = true) {
        return await this.send("eth_getBlockByHash", [hash, txDetail]);
    }

    async eth_getBlockByNumber(quantityOrTag = "pending", txDetail = true) {
        return await this.send("eth_getBlockByNumber", [quantityOrTag, txDetail]);
    }

    async eth_getBlockReceipts(quantityOrTag = "pending") {
        return await this.send("eth_getBlockReceipts", [quantityOrTag]);
    }

    async eth_getBlockTransactionCountByHash(hash = "") {
        return BigInt(await this.send("eth_getBlockTransactionCountByHash", [hash]));
    }

    async eth_getBlockTransactionCountByNumber(quantityOrTag = "pending") {
        return BigInt(await this.send("eth_getBlockTransactionCountByNumber", [quantityOrTag]));
    }

    async eth_getCode(address = "", quantityOrTag = "") {
        return await this.send("eth_getCode", [address, quantityOrTag]);
    }

    async eth_getFilterChanges(filterId = "") {
        return await this.send("eth_getFilterChanges", [filterId]);
    }

    async eth_getFilterLogs(filterId = "") {
        return await this.send("eth_getFilterLogs", [filterId]);
    }

    async eth_getLogs(filterObj = InterfaceGetLogs) {
        return await this.send("eth_getLogs", [filterObj]);
    }

    async eth_getProof(address = "", storageKeys = [""], quantityOrTag = "pending") {
        return await this.send("eth_getProof", [address, storageKeys, quantityOrTag]);
    }

    async eth_getStorageAt(obj = InterfaceGetStorageAt) {
        return await this.send("eth_getStorageAt", [obj]);
    }

    async eth_getTransactionByBlockHashAndIndex(blockHash = "", index = "0") {
        return await this.send("eth_getTransactionByBlockHashAndIndex", [blockHash, index]);
    }

    async eth_getTransactionByBlockNumberAndIndex(quantityOrTag = "pending", index = "0") {
        return await this.send("eth_getTransactionByBlockNumberAndIndex", [quantityOrTag, index]);
    }

    async eth_getTransactionByHash(hash = "") {
        return await this.send("eth_getTransactionByHash", [hash]);
    }

    async eth_getTransactionCount(address = "", quantityOrTag = "pending") {
        return BigInt(await this.send("eth_getTransactionCount", [address, quantityOrTag]));
    }

    async eth_getTransactionReceipt(hash = "") {
        return await this.send("eth_getTransactionReceipt", [hash]);
    }

    async eth_getUncleCountByBlockHash(hash = "") {
        return BigInt(await this.send("eth_getUncleCountByBlockHash", [hash]));
    }

    async eth_getUncleCountByBlockNumber(number = "") {
        number = "0x" + parseInt(number).toString(16);
        return BigInt(await this.send("eth_getUncleCountByBlockNumber", [number]));
    }

    async eth_hashrate() {
        return BigInt(await this.send("eth_hashrate", []));
    }

    async eth_maxPriorityFeePerGas() {
        return BigInt(await this.send("eth_maxPriorityFeePerGas", []));
    }

    async eth_mining() {
        return await this.send("eth_mining", []);
    }

    async eth_newBlockFilter() {
        return await this.send("eth_newBlockFilter", []);
    }

    async eth_newFilter(obj = InterfaceNewFilter) {
        return await this.send("eth_newFilter", [obj]);
    }

    async eth_newPendingTransactionFilter() {
        return await this.send("eth_newPendingTransactionFilter", []);
    }

    async eth_sendRawTransaction(signedTx = "") {
        return await this.send("eth_sendRawTransaction", [signedTx]);
    }

    async eth_syncing() {
        return await this.send("eth_syncing", []);
    }

    async eth_uninstallFilter(filterId = "") {
        return await this.send("eth_uninstallFilter", [filterId]);
    }

    async net_listening() {
        return await this.send("net_listening", []);
    }

    async net_peerCount() {
        return BigInt(await this.send("net_peerCount", []));
    }

    async net_version() {
        return BigInt(await this.send("net_version", []));
    }

    async qn_broadcastRawTransaction(signedTx = "") {
        return await this.send("qn_broadcastRawTransaction", [signedTx]);
    }

    async qn_getBlockWithReceipts(number = "") {
        number = "0x" + parseInt(number).toString(16);
        return await this.send("qn_getBlockWithReceipts", [number]);
    }

    async qn_getReceipts(number = "") {
        number = "0x" + parseInt(number).toString(16);
        return await this.send("qn_getReceipts", [number]);
    }

    async trace_block(quantityOrTag = "pending") {
        return await this.send("trace_block", [quantityOrTag]);
    }

    async trace_call(obj = InterfaceTraceCall, typeTrace = ["vmTrace", "trace", "stateDiff"], quantityOrTag = "pending") {
        return await this.send("trace_call", [obj, typeTrace, quantityOrTag]);
    }

    async trace_callMany(arrParams = [], quantityOrTag = "pending") {
        return await this.send("trace_callMany", [arrParams, quantityOrTag]);
    }

    async trace_filter(obj = InterfaceTraceFilter) {
        return await this.send("trace_filter", [obj]);
    }

    async trace_replayBlockTransactions(quantityOrTag = "pending", typeTrace = ["vmTrace", "trace", "stateDiff"]) {
        return await this.send("trace_replayBlockTransactions", [quantityOrTag, typeTrace]);
    }

    async trace_replayTransaction(hash = "", typeTrace = ["vmTrace", "trace", "stateDiff"]) {
        return await this.send("trace_replayTransaction", [hash, typeTrace]);
    }

    async trace_transaction(hash = "") {
        return await this.send("trace_transaction", [hash]);
    }

    async txpool_content() {
        return await this.send("txpool_content", []);
    }

    async txpool_inspect() {
        return await this.send("txpool_inspect", []);
    }

    async txpool_status() {
        return await this.send("txpool_status", []);
    }

    async web3_clientVersion() {
        return await this.send("web3_clientVersion", []);
    }

    async web3_sha3(data = "") {
        return await this.send("web3_sha3", [data]);
    }

    async debug_getBadBlocks() {
        return await this.send("debug_getBadBlocks", []);
    }

    async debug_storageRangeAt(blockHash = "", txIndex = "", address = "", startKey = "", limit = "") {
        return await this.send("debug_storageRangeAt", [blockHash, txIndex, address, startKey, limit]);
    }

    async debug_traceBlock(blockRlpEncode = "", tracerObject = { tracer: "callTracer", tracerConfig: { onlyTopCall: false } }) {
        return await this.send("debug_traceBlock", [blockRlpEncode, tracerObject]);
    }

    async debug_traceBlockByHash(blockHash = "", tracerObject = { tracer: "callTracer", tracerConfig: { onlyTopCall: false } }) {
        return await this.send("debug_traceBlockByHash", [blockHash, tracerObject]);
    }

    async debug_traceBlockByNumber(quantityOrTag = "pending", tracerObject = { tracer: "callTracer", tracerConfig: { onlyTopCall: false } }) {
        return await this.send("debug_traceBlockByNumber", [quantityOrTag, tracerObject]);
    }

    async debug_traceCall(tx = InterfaceTraceCall, quantityOrTag = "pending", tracerObject = { tracer: "callTracer", tracerConfig: { onlyTopCall: false } }) {
        return await this.send("debug_traceCall", [tx, quantityOrTag, tracerObject]);
    }

    async debug_traceTransaction(hash = "", tracerObject = { tracer: "callTracer", tracerConfig: { onlyTopCall: false }, timeout: "5" }) {
        return await this.send("debug_traceTransaction", [hash, tracerObject]);
    }
}

module.exports = EthRpc;