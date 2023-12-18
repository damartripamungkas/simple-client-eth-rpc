import { TypeBlockNumber, TypeTrace, IfaceGetLogs, IfaceNewFilter, IfaceTraceCall, IfaceTraceFilter, IfaceTraceObject, IfaceTxObj, IfaceTxObjCall } from "./iface";

class Main {
  #buildSend: any;
  constructor(funcBuildSend: any) {
    this.#buildSend = funcBuildSend;
  }

  _overrideFormatReturn = (method: string, formatReturn: any) => {
    const mockupOnlyForTypescript = { eth_chainId: this.eth_chainId };
    this[method as keyof typeof mockupOnlyForTypescript] = (...args: any) => this.#buildSend(method, args === undefined ? [] : args, formatReturn);
  };

  _eth = (method: string, params: any[], formatReturn?: any) => this.#buildSend(method, params, formatReturn);
  eth_subscribe = (...params: any) => this.#buildSend("eth_subscribe", params, null);
  eth_unsubscribe = (subscriptionId: string) => this.#buildSend("eth_unsubscribe", subscriptionId, null);
  eth_blockNumber = () => this.#buildSend("eth_blockNumber", [], parseInt);
  eth_chainId = () => this.#buildSend("eth_chainId", [], parseInt);
  eth_call = (tx: IfaceTxObjCall, blockNumber: TypeBlockNumber) => this.#buildSend("eth_call", [tx, blockNumber], null);
  eth_estimateGas = (tx: IfaceTxObj) => this.#buildSend("eth_estimateGas", [tx], parseInt);
  eth_feeHistory = (blockCount: string, latestBlock: string, rewardPercentiles: string[]) => this.#buildSend("eth_feeHistory", [blockCount, latestBlock, rewardPercentiles], null);
  eth_gasPrice = () => this.#buildSend("eth_gasPrice", [], parseInt);
  eth_getBalance = (address: string, tag: string) => this.#buildSend("eth_getBalance", [address, tag], parseInt);
  eth_getBlockByHash = (hash: string, txDetail: boolean) => this.#buildSend("eth_getBlockByHash", [hash, txDetail], null);
  eth_getBlockByNumber = (blockNumber: TypeBlockNumber, txDetail: boolean) => this.#buildSend("eth_getBlockByNumber", [blockNumber, txDetail], null);
  eth_getBlockReceipts = (blockNumber: TypeBlockNumber) => this.#buildSend("eth_getBlockReceipts", [blockNumber], null);
  eth_getBlockTransactionCountByHash = (hash: string) => this.#buildSend("eth_getBlockTransactionCountByHash", [hash], parseInt);
  eth_getBlockTransactionCountByNumber = (blockNumber: TypeBlockNumber) => this.#buildSend("eth_getBlockTransactionCountByNumber", [blockNumber], parseInt);
  eth_getCode = (address: string, blockNumber: TypeBlockNumber) => this.#buildSend("eth_getCode", [address, blockNumber], null);
  eth_getFilterChanges = (filterId: string) => this.#buildSend("eth_getFilterChanges", [filterId], null);
  eth_getFilterLogs = (filterId: string) => this.#buildSend("eth_getFilterLogs", [filterId], null);
  eth_getLogs = (filterObj: IfaceGetLogs) => this.#buildSend("eth_getLogs", [filterObj], null);
  eth_getProof = (address: string, storageKeys: string[], blockNumber: TypeBlockNumber) => this.#buildSend("eth_getProof", [address, storageKeys, blockNumber], null);
  eth_getStorageAt = (address: string, position: string, blockNumber: TypeBlockNumber) => this.#buildSend("eth_getStorageAt", [address, position, blockNumber], null);
  eth_getTransactionByBlockHashAndIndex = (blockHash: string, index: string) => this.#buildSend("eth_getTransactionByBlockHashAndIndex", [blockHash, index], null);
  eth_getTransactionByBlockNumberAndIndex = (blockNumber: TypeBlockNumber, index: string) => this.#buildSend("eth_getTransactionByBlockNumberAndIndex", [blockNumber, index], null);
  eth_getTransactionByHash = (hash: string) => this.#buildSend("eth_getTransactionByHash", [hash], null);
  eth_getTransactionCount = (address: string, blockNumber: TypeBlockNumber) => this.#buildSend("eth_getTransactionCount", [address, blockNumber], parseInt);
  eth_getTransactionReceipt = (hash: string) => this.#buildSend("eth_getTransactionReceipt", [hash], null);
  eth_getUncleCountByBlockHash = (hash: string) => this.#buildSend("eth_getUncleCountByBlockHash", [hash], parseInt);
  eth_getUncleCountByBlockNumber = (hexNumber: string) => this.#buildSend("eth_getUncleCountByBlockNumber", [hexNumber], parseInt);
  eth_hashrate = () => this.#buildSend("eth_hashrate", [], parseInt);
  eth_maxPriorityFeePerGas = () => this.#buildSend("eth_maxPriorityFeePerGas", [], parseInt);
  eth_mining = () => this.#buildSend("eth_mining", [], null);
  eth_newBlockFilter = () => this.#buildSend("eth_newBlockFilter", [], null);
  eth_newFilter = (obj: IfaceNewFilter) => this.#buildSend("eth_newFilter", [obj], null);
  eth_newPendingTransactionFilter = () => this.#buildSend("eth_newPendingTransactionFilter", [], null);
  eth_sendRawTransaction = (signedTx: string) => this.#buildSend("eth_sendRawTransaction", [signedTx], null);
  eth_syncing = () => this.#buildSend("eth_syncing", [], null);
  eth_uninstallFilter = (filterId: string) => this.#buildSend("eth_uninstallFilter", [filterId], null);
  net_listening = () => this.#buildSend("net_listening", [], null);
  net_peerCount = () => this.#buildSend("net_peerCount", [], parseInt);
  net_version = () => this.#buildSend("net_version", [], parseInt);
  qn_broadcastRawTransaction = (signedTx: string) => this.#buildSend("qn_broadcastRawTransaction", [signedTx], null);
  qn_getBlockWithReceipts = (hexNumber: string) => this.#buildSend("qn_getBlockWithReceipts", [hexNumber], null);
  qn_getReceipts = (hexNumber: string) => this.#buildSend("qn_getReceipts", [hexNumber], null);
  trace_block = (blockNumber: TypeBlockNumber) => this.#buildSend("trace_block", [blockNumber], null);
  trace_call = (obj: IfaceTraceCall, typeTrace: TypeTrace, blockNumber: TypeBlockNumber) => this.#buildSend("trace_call", [obj, typeTrace, blockNumber], null);
  trace_callMany = (typeTrace: TypeTrace, blockNumber: TypeBlockNumber) => this.#buildSend("trace_callMany", [typeTrace, blockNumber], null);
  trace_filter = (obj: IfaceTraceFilter) => this.#buildSend("trace_filter", [obj], null);
  trace_replayBlockTransactions = (blockNumber: TypeBlockNumber, typeTrace: TypeTrace) => this.#buildSend("trace_replayBlockTransactions", [blockNumber, typeTrace], null);
  trace_replayTransaction = (hash: string, typeTrace: TypeTrace) => this.#buildSend("trace_replayTransaction", [hash, typeTrace], null);
  trace_transaction = (hash: string) => this.#buildSend("trace_transaction", [hash], null);
  txpool_content = () => this.#buildSend("txpool_content", [], null);
  txpool_inspect = () => this.#buildSend("txpool_inspect", [], null);
  txpool_status = () => this.#buildSend("txpool_status", [], null);
  web3_clientVersion = () => this.#buildSend("web3_clientVersion", [], null);
  web3_sha3 = (data: string) => this.#buildSend("web3_sha3", [data], null);
  debug_getBadBlocks = () => this.#buildSend("debug_getBadBlocks", [], null);
  debug_storageRangeAt = (blockHash: string, txIndex: string, address: string, startKey: string, limit: string) => this.#buildSend("debug_storageRangeAt", [blockHash, txIndex, address, startKey, limit], null);
  debug_traceBlock = (blockRlpEncode: string, tracerObject: IfaceTraceObject) => this.#buildSend("debug_traceBlock", [blockRlpEncode, tracerObject], null);
  debug_traceBlockByHash = (blockHash: string, tracerObject: IfaceTraceObject) => this.#buildSend("debug_traceBlockByHash", [blockHash, tracerObject], null);
  debug_traceBlockByNumber = (blockNumber: TypeBlockNumber, tracerObject: IfaceTraceObject) => this.#buildSend("debug_traceBlockByNumber", [blockNumber, tracerObject], null);
  debug_traceCall = (tx: IfaceTraceCall, blockNumber: TypeBlockNumber, tracerObject: IfaceTraceObject) => this.#buildSend("debug_traceCall", [tx, blockNumber, tracerObject], null);
  debug_traceTransaction = (hash: string, tracerObject: IfaceTraceObject) => this.#buildSend("debug_traceTransaction", [hash, tracerObject], null);
}

export default Main;
