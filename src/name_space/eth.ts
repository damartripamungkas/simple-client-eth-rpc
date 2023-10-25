import { TypeBlockNumber, TypeTrace, InterfaceGetLogs, InterfaceNewFilter, InterfaceTraceCall, InterfaceTraceFilter, InterfaceTraceObject, InterfaceTxObj, InterfaceTxObjCall } from "./iType";

export default class {
  constructor() {}

  buildFormat = (...args: any): any => {
    return {
      method: args[0],
      params: args[1],
      formatReturn: args[2],
    };
  };

  eth_subscribe = (...params: any) => this.buildFormat("eth_subscribe", params, null);
  eth_unsubscribe = (subscriptionId: string) => this.buildFormat("eth_unsubscribe", subscriptionId, null);
  eth_blockNumber = () => this.buildFormat("eth_blockNumber", [], parseInt);
  eth_chainId = () => this.buildFormat("eth_chainId", [], parseInt);
  eth_call = (tx: InterfaceTxObjCall, blockNumber: TypeBlockNumber) => this.buildFormat("eth_call", [tx, blockNumber], null);
  eth_estimateGas = (tx: InterfaceTxObj) => this.buildFormat("eth_estimateGas", [tx], parseInt);
  eth_feeHistory = (blockCount: string, latestBlock: string, rewardPercentiles: string[]) => this.buildFormat("eth_feeHistory", [blockCount, latestBlock, rewardPercentiles], null);
  eth_gasPrice = () => this.buildFormat("eth_gasPrice", [], parseInt);
  eth_getBalance = (address: string, tag: string) => this.buildFormat("eth_getBalance", [address, tag], parseInt);
  eth_getBlockByHash = (hash: string, txDetail: boolean) => this.buildFormat("eth_getBlockByHash", [hash, txDetail], null);
  eth_getBlockByNumber = (blockNumber: TypeBlockNumber, txDetail: boolean) => this.buildFormat("eth_getBlockByNumber", [blockNumber, txDetail], null);
  eth_getBlockReceipts = (blockNumber: TypeBlockNumber) => this.buildFormat("eth_getBlockReceipts", [blockNumber], null);
  eth_getBlockTransactionCountByHash = (hash: string) => this.buildFormat("eth_getBlockTransactionCountByHash", [hash], parseInt);
  eth_getBlockTransactionCountByNumber = (blockNumber: TypeBlockNumber) => this.buildFormat("eth_getBlockTransactionCountByNumber", [blockNumber], parseInt);
  eth_getCode = (address: string, blockNumber: TypeBlockNumber) => this.buildFormat("eth_getCode", [address, blockNumber], null);
  eth_getFilterChanges = (filterId: string) => this.buildFormat("eth_getFilterChanges", [filterId], null);
  eth_getFilterLogs = (filterId: string) => this.buildFormat("eth_getFilterLogs", [filterId], null);
  eth_getLogs = (filterObj: InterfaceGetLogs) => this.buildFormat("eth_getLogs", [filterObj], null);
  eth_getProof = (address: string, storageKeys: string[], blockNumber: TypeBlockNumber) => this.buildFormat("eth_getProof", [address, storageKeys, blockNumber], null);
  eth_getStorageAt = (address: string, position: string, blockNumber: TypeBlockNumber) => this.buildFormat("eth_getStorageAt", [address, position, blockNumber], null);
  eth_getTransactionByBlockHashAndIndex = (blockHash: string, index: string) => this.buildFormat("eth_getTransactionByBlockHashAndIndex", [blockHash, index], null);
  eth_getTransactionByBlockNumberAndIndex = (blockNumber: TypeBlockNumber, index: string) => this.buildFormat("eth_getTransactionByBlockNumberAndIndex", [blockNumber, index], null);
  eth_getTransactionByHash = (hash: string) => this.buildFormat("eth_getTransactionByHash", [hash], null);
  eth_getTransactionCount = (address: string, blockNumber: TypeBlockNumber) => this.buildFormat("eth_getTransactionCount", [address, blockNumber], parseInt);
  eth_getTransactionReceipt = (hash: string) => this.buildFormat("eth_getTransactionReceipt", [hash], null);
  eth_getUncleCountByBlockHash = (hash: string) => this.buildFormat("eth_getUncleCountByBlockHash", [hash], parseInt);
  eth_getUncleCountByBlockNumber = (hexNumber: string) => this.buildFormat("eth_getUncleCountByBlockNumber", [hexNumber], parseInt);
  eth_hashrate = () => this.buildFormat("eth_hashrate", [], parseInt);
  eth_maxPriorityFeePerGas = () => this.buildFormat("eth_maxPriorityFeePerGas", [], parseInt);
  eth_mining = () => this.buildFormat("eth_mining", [], null);
  eth_newBlockFilter = () => this.buildFormat("eth_newBlockFilter", [], null);
  eth_newFilter = (obj: InterfaceNewFilter) => this.buildFormat("eth_newFilter", [obj], null);
  eth_newPendingTransactionFilter = () => this.buildFormat("eth_newPendingTransactionFilter", [], null);
  eth_sendRawTransaction = (signedTx: string) => this.buildFormat("eth_sendRawTransaction", [signedTx], null);
  eth_syncing = () => this.buildFormat("eth_syncing", [], null);
  eth_uninstallFilter = (filterId: string) => this.buildFormat("eth_uninstallFilter", [filterId], null);
  net_listening = () => this.buildFormat("net_listening", [], null);
  net_peerCount = () => this.buildFormat("net_peerCount", [], parseInt);
  net_version = () => this.buildFormat("net_version", [], parseInt);
  qn_broadcastRawTransaction = (signedTx: string) => this.buildFormat("qn_broadcastRawTransaction", [signedTx], null);
  qn_getBlockWithReceipts = (hexNumber: string) => this.buildFormat("qn_getBlockWithReceipts", [hexNumber], null);
  qn_getReceipts = (hexNumber: string) => this.buildFormat("qn_getReceipts", [hexNumber], null);
  trace_block = (blockNumber: TypeBlockNumber) => this.buildFormat("trace_block", [blockNumber], null);
  trace_call = (obj: InterfaceTraceCall, typeTrace: TypeTrace, blockNumber: TypeBlockNumber) => this.buildFormat("trace_call", [obj, typeTrace, blockNumber], null);
  trace_callMany = (typeTrace: TypeTrace, blockNumber: TypeBlockNumber) => this.buildFormat("trace_callMany", [typeTrace, blockNumber], null);
  trace_filter = (obj: InterfaceTraceFilter) => this.buildFormat("trace_filter", [obj], null);
  trace_replayBlockTransactions = (blockNumber: TypeBlockNumber, typeTrace: TypeTrace) => this.buildFormat("trace_replayBlockTransactions", [blockNumber, typeTrace], null);
  trace_replayTransaction = (hash: string, typeTrace: TypeTrace) => this.buildFormat("trace_replayTransaction", [hash, typeTrace], null);
  trace_transaction = (hash: string) => this.buildFormat("trace_transaction", [hash], null);
  txpool_content = () => this.buildFormat("txpool_content", [], null);
  txpool_inspect = () => this.buildFormat("txpool_inspect", [], null);
  txpool_status = () => this.buildFormat("txpool_status", [], null);
  web3_clientVersion = () => this.buildFormat("web3_clientVersion", [], null);
  web3_sha3 = (data: string) => this.buildFormat("web3_sha3", [data], null);
  debug_getBadBlocks = () => this.buildFormat("debug_getBadBlocks", [], null);
  debug_storageRangeAt = (blockHash: string, txIndex: string, address: string, startKey: string, limit: string) =>
    this.buildFormat("debug_storageRangeAt", [blockHash, txIndex, address, startKey, limit], null);
  debug_traceBlock = (blockRlpEncode: string, tracerObject: InterfaceTraceObject) => this.buildFormat("debug_traceBlock", [blockRlpEncode, tracerObject], null);
  debug_traceBlockByHash = (blockHash: string, tracerObject: InterfaceTraceObject) => this.buildFormat("debug_traceBlockByHash", [blockHash, tracerObject], null);
  debug_traceBlockByNumber = (blockNumber: TypeBlockNumber, tracerObject: InterfaceTraceObject) => this.buildFormat("debug_traceBlockByNumber", [blockNumber, tracerObject], null);
  debug_traceCall = (tx: InterfaceTraceCall, blockNumber: TypeBlockNumber, tracerObject: InterfaceTraceObject) => this.buildFormat("debug_traceCall", [tx, blockNumber, tracerObject], null);
  debug_traceTransaction = (hash: string, tracerObject: InterfaceTraceObject) => this.buildFormat("debug_traceTransaction", [hash, tracerObject], null);
}
