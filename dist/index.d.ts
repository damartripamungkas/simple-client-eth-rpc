type TypeString0x = `0x${string}`;
type TypeTxValue = TypeString0x | number | bigint;
type TypeTrace = Array<"vmTrace" | "trace" | "stateDiff">;
type TypeBlockNumber = string | "latest" | "pending";
interface InterfaceTxObjCall {
    to: TypeString0x;
    from?: TypeString0x;
    data?: TypeString0x;
    gas?: TypeTxValue;
    gasPrice?: TypeTxValue;
    value?: TypeTxValue;
}
interface InterfaceGetLogs {
    fromBlock?: string;
    toBlock?: string;
    address?: TypeString0x;
    topics?: string;
    blockHash?: TypeString0x;
}
interface InterfaceNewFilter {
    fromBlock?: TypeBlockNumber;
    toBlock?: TypeBlockNumber;
    address?: TypeString0x;
    topics?: string;
}
interface InterfaceTraceCall {
    from?: TypeString0x;
    to: TypeString0x;
    gas?: TypeTxValue;
    gasPrice?: TypeTxValue;
    value?: TypeTxValue;
    data?: TypeString0x;
}
interface InterfaceTraceFilter {
    fromBlock?: TypeBlockNumber;
    toBlock?: TypeBlockNumber;
    fromAddress?: TypeString0x;
    toAddress?: TypeString0x;
    after?: string;
    count?: string;
}
interface InterfaceTxObj {
    to?: TypeString0x;
    from?: TypeString0x;
    data?: TypeString0x;
    gasLimit?: TypeTxValue;
    gasPrice?: TypeTxValue;
    maxFeePerGas?: TypeTxValue;
    maxPriorityFeePerGas?: TypeTxValue;
    value?: TypeTxValue;
    nonce?: TypeTxValue;
    chainId?: TypeTxValue;
}
interface InterfaceTraceObject {
    tracer: "callTracer" | "prestateTracer";
    tracerConfig: {
        onlyTopCall: boolean;
    };
}

declare class export_default$3{
    constructor();
    buildFormat: (...args: any) => any;
    eth_subscribe: (...params: any) => any;
    eth_unsubscribe: (subscriptionId: string) => any;
    eth_blockNumber: () => any;
    eth_chainId: () => any;
    eth_call: (tx: InterfaceTxObjCall, blockNumber: TypeBlockNumber) => any;
    eth_estimateGas: (tx: InterfaceTxObj) => any;
    eth_feeHistory: (blockCount: string, latestBlock: string, rewardPercentiles: string[]) => any;
    eth_gasPrice: () => any;
    eth_getBalance: (address: string, tag: string) => any;
    eth_getBlockByHash: (hash: string, txDetail: boolean) => any;
    eth_getBlockByNumber: (blockNumber: TypeBlockNumber, txDetail: boolean) => any;
    eth_getBlockReceipts: (blockNumber: TypeBlockNumber) => any;
    eth_getBlockTransactionCountByHash: (hash: string) => any;
    eth_getBlockTransactionCountByNumber: (blockNumber: TypeBlockNumber) => any;
    eth_getCode: (address: string, blockNumber: TypeBlockNumber) => any;
    eth_getFilterChanges: (filterId: string) => any;
    eth_getFilterLogs: (filterId: string) => any;
    eth_getLogs: (filterObj: InterfaceGetLogs) => any;
    eth_getProof: (address: string, storageKeys: string[], blockNumber: TypeBlockNumber) => any;
    eth_getStorageAt: (address: string, position: string, blockNumber: TypeBlockNumber) => any;
    eth_getTransactionByBlockHashAndIndex: (blockHash: string, index: string) => any;
    eth_getTransactionByBlockNumberAndIndex: (blockNumber: TypeBlockNumber, index: string) => any;
    eth_getTransactionByHash: (hash: string) => any;
    eth_getTransactionCount: (address: string, blockNumber: TypeBlockNumber) => any;
    eth_getTransactionReceipt: (hash: string) => any;
    eth_getUncleCountByBlockHash: (hash: string) => any;
    eth_getUncleCountByBlockNumber: (hexNumber: string) => any;
    eth_hashrate: () => any;
    eth_maxPriorityFeePerGas: () => any;
    eth_mining: () => any;
    eth_newBlockFilter: () => any;
    eth_newFilter: (obj: InterfaceNewFilter) => any;
    eth_newPendingTransactionFilter: () => any;
    eth_sendRawTransaction: (signedTx: string) => any;
    eth_syncing: () => any;
    eth_uninstallFilter: (filterId: string) => any;
    net_listening: () => any;
    net_peerCount: () => any;
    net_version: () => any;
    qn_broadcastRawTransaction: (signedTx: string) => any;
    qn_getBlockWithReceipts: (hexNumber: string) => any;
    qn_getReceipts: (hexNumber: string) => any;
    trace_block: (blockNumber: TypeBlockNumber) => any;
    trace_call: (obj: InterfaceTraceCall, typeTrace: TypeTrace, blockNumber: TypeBlockNumber) => any;
    trace_callMany: (typeTrace: TypeTrace, blockNumber: TypeBlockNumber) => any;
    trace_filter: (obj: InterfaceTraceFilter) => any;
    trace_replayBlockTransactions: (blockNumber: TypeBlockNumber, typeTrace: TypeTrace) => any;
    trace_replayTransaction: (hash: string, typeTrace: TypeTrace) => any;
    trace_transaction: (hash: string) => any;
    txpool_content: () => any;
    txpool_inspect: () => any;
    txpool_status: () => any;
    web3_clientVersion: () => any;
    web3_sha3: (data: string) => any;
    debug_getBadBlocks: () => any;
    debug_storageRangeAt: (blockHash: string, txIndex: string, address: string, startKey: string, limit: string) => any;
    debug_traceBlock: (blockRlpEncode: string, tracerObject: InterfaceTraceObject) => any;
    debug_traceBlockByHash: (blockHash: string, tracerObject: InterfaceTraceObject) => any;
    debug_traceBlockByNumber: (blockNumber: TypeBlockNumber, tracerObject: InterfaceTraceObject) => any;
    debug_traceCall: (tx: InterfaceTraceCall, blockNumber: TypeBlockNumber, tracerObject: InterfaceTraceObject) => any;
    debug_traceTransaction: (hash: string, tracerObject: InterfaceTraceObject) => any;
}

declare class export_default$2{
    client: any;
    constructor(url: string, socketOpt: object);
    isReady: () => boolean;
}

declare class export_default$1{
    client: any;
    constructor(url: string, socketOpt: object, reconnectOpt: object);
    isReady: () => Promise<boolean>;
}

declare class export_default{
    client: any;
    constructor(url: string, socketOpt: object, reconnectOpt: object);
    isReady: () => Promise<boolean>;
}

interface InterfaceReconnectOpt {
    autoReconnect: boolean | true;
    delay: number | 500;
    maxAttempts: number;
}
interface InterfaceSend {
    method: string;
    params: string[];
    formatReturn: any;
}
declare class Provider {
    #private;
    client: export_default$2 | export_default | export_default$1;
    /**
     *
     * @param urlRpc url node blockchain. input string
     * @param socketOpt option socket for network ws | ipc. input {} | null | undefined
     * @param reconnectOpt option reconnect for network ws | ipc. input {} | null | undefined
     */
    constructor(urlRpc: string, socketOpt: object | undefined | null, reconnectOpt: InterfaceReconnectOpt | NonNullable<object> | undefined | null);
    /**
     *
     * @returns when "true" is ready
     */
    isReady: () => Promise<boolean>;
    /**
     *
     * @param {*} payload object or array object JSON-RPC request
     * @returns result without handling error
     */
    request: (payload: object | [
    ]) => Promise<any>;
    /**
     *
     * @param {*} args format: [method, params]
     * @param {*} args example: { method: "eth_subscribe", params: ["newPendingTransactions"], formatReturn: null }
     * @callback res = callback(result, subsId = subscription id)
     */
    subscribe: (args: InterfaceSend, reconnect: boolean, callbackRes: (res: any, subsId: string) => void) => Promise<void>;
    /**
     *
     * @param {*} args format: { method: "", params: [], formatReturn: Function | null | undefined }
     * @param {*} args example: { method: "eth_chainId", params: [], formatReturn: parseInt }
     * @returns any
     */
    send: (args: InterfaceSend) => Promise<any>;
    /**
     *
     * @param {*} args format: { method: "", params: [], formatReturn: Function | null | undefined }, { method: "", params: [], formatReturn: Function | null | undefined }
     * @param {*} args example: { method: "eth_chainId", params: [], formatReturn: parseInt }, { method: "eth_blockNumber", params: [], formatReturn: parseInt }
     * @returns any[]
     */
    sendBatch: (...args: Array<InterfaceSend>) => Promise<any[]>;
}
declare const _default: {
    EthNameSpace: typeof export_default$3;
    Provider: typeof Provider;
};

export { export_default$3 as EthNameSpace, Provider, _default as default };
