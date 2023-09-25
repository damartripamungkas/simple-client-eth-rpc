const InterfaceTxObj = { to: "", from: "", data: "0x", gasLimit: "0", gasPrice: "0", maxFeePerGas: "0", maxPriorityFeePerGas: "0", lastBaseFeePerGas: "0", value: "0", nonce: "0", chainId: "0" };
const InterfaceTxObjCall = { to: "", from: "", data: "0x", gasLimit: "0", gasPrice: "0", value: "0" };
const InterfaceGetLogs = { fromBlock: "", toBlock: "", address: "", topics: "", blockHash: "" };
const InterfaceGetStorageAt = { address: "", position: "", quantityOrTag: "pending" };
const InterfaceNewFilter = { fromBlock: "", toBlock: "", address: "", topics: "", };
const InterfaceTraceCall = { from: "", to: "", gas: "", gasPrice: "", value: "", data: "" };
const InterfaceTraceFilter = { fromBlock: "", toBlock: "", fromAddress: "", toAddress: "", after: "", count: "" };

class Main {
    constructor() {
        this.eth_subscribe = (...params) => ["eth_subscribe", params];
        this.eth_unsubscribe = (subscriptionId = "") => ["eth_unsubscribe", subscriptionId];
        this.eth_blockNumber = () => ["eth_blockNumber", [], parseInt];
        this.eth_chainId = () => ["eth_chainId", [], parseInt];
        this.eth_call = (tx = InterfaceTxObjCall, quantityOrTag = "latest") => ["eth_call", [tx, quantityOrTag]];
        this.eth_estimateGas = (tx = InterfaceTxObj, tag = "latest") => ["eth_estimateGas", [tx, tag], parseInt];
        this.eth_feeHistory = (blockCount = "1", latestBlock = "latest", rewardPercentiles = ["25", "75"]) => ["eth_feeHistory", [blockCount, latestBlock, rewardPercentiles]];
        this.eth_gasPrice = () => ["eth_gasPrice", [], parseInt];
        this.eth_getBalance = (address = "", tag = "latest") => ["eth_getBalance", [address, tag], parseInt];
        this.eth_getBlockByHash = (hash = "", txDetail = true) => ["eth_getBlockByHash", [hash, txDetail]];
        this.eth_getBlockByNumber = (quantityOrTag = "latest", txDetail = true) => ["eth_getBlockByNumber", [quantityOrTag, txDetail]];
        this.eth_getBlockReceipts = (quantityOrTag = "latest") => ["eth_getBlockReceipts", [quantityOrTag]];
        this.eth_getBlockTransactionCountByHash = (hash = "") => ["eth_getBlockTransactionCountByHash", [hash], BigInt];
        this.eth_getBlockTransactionCountByNumber = (quantityOrTag = "latest") => ["eth_getBlockTransactionCountByNumber", [quantityOrTag], BigInt];
        this.eth_getCode = (address = "", quantityOrTag = "") => ["eth_getCode", [address, quantityOrTag]];
        this.eth_getFilterChanges = (filterId = "") => ["eth_getFilterChanges", [filterId]];
        this.eth_getFilterLogs = (filterId = "") => ["eth_getFilterLogs", [filterId]];
        this.eth_getLogs = (filterObj = InterfaceGetLogs) => ["eth_getLogs", [filterObj]];
        this.eth_getProof = (address = "", storageKeys = [""], quantityOrTag = "latest") => ["eth_getProof", [address, storageKeys, quantityOrTag]];
        this.eth_getStorageAt = (obj = InterfaceGetStorageAt) => ["eth_getStorageAt", [obj]];
        this.eth_getTransactionByBlockHashAndIndex = (blockHash = "", index = "0") => ["eth_getTransactionByBlockHashAndIndex", [blockHash, index]];
        this.eth_getTransactionByBlockNumberAndIndex = (quantityOrTag = "latest", index = "0") => ["eth_getTransactionByBlockNumberAndIndex", [quantityOrTag, index]];
        this.eth_getTransactionByHash = (hash = "") => ["eth_getTransactionByHash", [hash]];
        this.eth_getTransactionCount = (address = "", quantityOrTag = "latest") => ["eth_getTransactionCount", [address, quantityOrTag], BigInt];
        this.eth_getTransactionReceipt = (hash = "") => ["eth_getTransactionReceipt", [hash]];
        this.eth_getUncleCountByBlockHash = (hash = "") => ["eth_getUncleCountByBlockHash", [hash], BigInt];
        this.eth_getUncleCountByBlockNumber = (hexNumber = "") => ["eth_getUncleCountByBlockNumber", [hexNumber], BigInt];
        this.eth_hashrate = () => ["eth_hashrate", [], BigInt];
        this.eth_maxPriorityFeePerGas = () => ["eth_maxPriorityFeePerGas", [], BigInt];
        this.eth_mining = () => ["eth_mining", []];
        this.eth_newBlockFilter = () => ["eth_newBlockFilter", []];
        this.eth_newFilter = (obj = InterfaceNewFilter) => ["eth_newFilter", [obj]];
        this.eth_newPendingTransactionFilter = () => ["eth_newPendingTransactionFilter", []];
        this.eth_sendRawTransaction = (signedTx = "") => ["eth_sendRawTransaction", [signedTx]];
        this.eth_syncing = () => ["eth_syncing", []];
        this.eth_uninstallFilter = (filterId = "") => ["eth_uninstallFilter", [filterId]];
        this.net_listening = () => ["net_listening", []];
        this.net_peerCount = () => ["net_peerCount", [], parseInt];
        this.net_version = () => ["net_version", [], parseInt];
        this.qn_broadcastRawTransaction = (signedTx = "") => ["qn_broadcastRawTransaction", [signedTx]];
        this.qn_getBlockWithReceipts = (hexNumber = "") => ["qn_getBlockWithReceipts", [hexNumber]];
        this.qn_getReceipts = (hexNumber = "") => ["qn_getReceipts", [hexNumber]];
        this.trace_block = (quantityOrTag = "latest") => ["trace_block", [quantityOrTag]];
        this.trace_call = (obj = InterfaceTraceCall, typeTrace = ["vmTrace", "trace", "stateDiff"], quantityOrTag = "latest") => ["", [obj, typeTrace, quantityOrTag]];
        this.trace_callMany = (arr = [], quantityOrTag = "latest") => ["trace_callMany", [arr, quantityOrTag]];
        this.trace_filter = (obj = InterfaceTraceFilter) => ["trace_filter", [obj]];
        this.trace_replayBlockTransactions = (quantityOrTag = "pending", typeTrace = ["vmTrace", "trace", "stateDiff"]) => ["trace_replayBlockTransactions", [quantityOrTag, typeTrace]];
        this.trace_replayTransaction = (hash = "", typeTrace = ["vmTrace", "trace", "stateDiff"]) => ["trace_replayTransaction", [hash, typeTrace]];
        this.trace_transaction = (hash = "") => ["trace_transaction", [hash]];
        this.txpool_content = () => ["txpool_content", []];
        this.txpool_inspect = () => ["txpool_inspect", []];
        this.txpool_status = () => ["txpool_status", []];
        this.web3_clientVersion = () => ["web3_clientVersion", []];
        this.web3_sha3 = (data = "") => ["web3_sha3", [data]];
        this.debug_getBadBlocks = () => ["debug_getBadBlocks", []];
        this.debug_storageRangeAt = (blockHash = "", txIndex = "", address = "", startKey = "", limit = "") => ["", [blockHash, txIndex, address, startKey, limit]];
        this.debug_traceBlock = (blockRlpEncode = "", tracerObject = { tracer: "callTracer", tracerConfig: { onlyTopCall: false } }) => ["debug_traceBlock", [blockRlpEncode, tracerObject]];
        this.debug_traceBlockByHash = (blockHash = "", tracerObject = { tracer: "callTracer", tracerConfig: { onlyTopCall: false } }) => ["debug_traceBlockByHash", [blockHash, tracerObject]];
        this.debug_traceBlockByNumber = (quantityOrTag = "latest", tracerObject = { tracer: "callTracer", tracerConfig: { onlyTopCall: false } }) => ["debug_traceBlockByNumber", [quantityOrTag, tracerObject]];
        this.debug_traceCall = (tx = InterfaceTraceCall, quantityOrTag = "latest", tracerObject = { tracer: "callTracer", tracerConfig: { onlyTopCall: false } }) => ["debug_traceCall", [tx, quantityOrTag, tracerObject]];
        this.debug_traceTransaction = (hash = "", tracerObject = { tracer: "callTracer", tracerConfig: { onlyTopCall: false }, timeout: "5" }) => ["debug_traceTransaction", [hash, tracerObject]];
    }
}

module.exports = Main;