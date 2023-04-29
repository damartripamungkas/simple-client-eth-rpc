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
                headers: { 'Content-Type': 'application/json' },
                body: data
            });
            const jsonData = await res.json();
            if (jsonData["error"] !== undefined) {
                throw jsonData.error;
            }

            return jsonData.result;
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
    }

    async #subscribe(params = [], callbackRes = (res) => { }) {
        /**
         * example params:
         * ["newPendingTransactions"] 
         */
        this.#nextId += 1; // increment id jsonrpc
        const dataJsonRpc = JSON.stringify({ jsonrpc: "2.0", id: this.#nextId, method: "eth_subscribe", params });
        const handle = (it) => {
            try {
                callbackRes(JSON.parse(it));
            } catch (err) {
                // callbackRes(err, null);
            }
        };
        this.#provider.send(dataJsonRpc);
        this.#provider.onMessage(handle);
        this.#nextId >= this.#maxSafeNextId ? this.#nextId = 0 : null;
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
                const idSetInterval = setInterval(() => {
                    this.#eventList.onMessage.forEach((it, index) => {
                        try {
                            it = JSON.parse(it);
                            if (it.id == id) {
                                resolve(it);

                                // delete value eventList with index
                                let arr = this.#eventList[eventMethod];
                                arr.splice(index, 1);
                                this.#eventList.onMessage = arr;

                                // stop operation setInterval
                                clearInterval(idSetInterval);
                            }
                        } catch (err) {
                            reject(err);

                            // stop operation setInterval
                            clearInterval(idSetInterval);
                        }
                    });
                });
            });

            if (result["error"] !== undefined) {
                throw result.error;
            }

            return result.result;
        }
        this.#nextId >= this.#maxSafeNextId ? this.#nextId = 0 : null;
    }

    async sendBatch(methodAndParams = [{ method: "", params: [] }]) {
        methodAndParams = methodAndParams.map(it => {
            this.#nextId += 1; // increment id jsonrpc
            return Object.assign(it, { jsonrpc: "2.0", id: this.#nextId });
        });

        const dataJsonRpc = JSON.stringify(methodAndParams);

        if (this.#typeNetwork == "http") return await this.#provider.send(dataJsonRpc);
        if (this.#typeNetwork == "ws" || this.#typeNetwork == "ipc") {
            this.#provider.send(dataJsonRpc);
            const lengthMethodAndParams = methodAndParams.length;
            const result = await new Promise((resolve, reject) => {
                const idSetInterval = setInterval(() => {
                    this.#eventList.onMessage.forEach((it, index) => {
                        try {
                            it = JSON.parse(it);
                            if (
                                Array.isArray(it) &&
                                lengthMethodAndParams == methodAndParams.filter(f => it.some(item => item.id === f.id)).length
                            ) {
                                resolve(it);

                                // delete value eventList with index
                                let arr = this.#eventList.onMessage;
                                arr.splice(index, 1);
                                this.#eventList.onMessage = arr;

                                // stop operation setInterval
                                clearInterval(idSetInterval);
                            }
                        } catch (err) {
                            reject(it);

                            // stop operation setInterval
                            clearInterval(idSetInterval);
                        }
                    });
                });
            });

            if (result["error"] !== undefined) {
                throw result.error;
            }

            return result.result;
        }
        this.#nextId >= this.#maxSafeNextId ? this.#nextId = 0 : null;
    }

    async isReady() {
        return await this.#provider.isReady();
    }

    async eth_blockNumber() {
        return BigInt(await this.send("eth_blockNumber", []));
    }

    async eth_chainId() {
        return await this.send("eth_chainId", []);
    }

    async eth_call(tx = InterfaceTxObjCall, quantityOrTag = "pending") {
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

    async trace_callMany(arrParams = [[obj = InterfaceTraceCall, arr = ["vmTrace", "trace", "stateDiff"]]], quantityOrTag = "pending") {
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
}

module.exports = EthRpc;