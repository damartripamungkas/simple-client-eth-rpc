interface InterfaceTxObjCall {
    to: string;
    from: string;
    data: string;
    gasLimit: string;
    gasPrice: string;
    value: string;
}
interface InterfaceGetLogs {
    fromBlock: string;
    toBlock: string;
    address: string;
    topics: string;
    blockHash: string;
}
interface InterfaceGetStorageAt {
    address: string;
    position: string;
    quantityOrTag: string;
}
interface InterfaceNewFilter {
    fromBlock: string;
    toBlock: string;
    address: string;
    topics: string;
}
interface InterfaceTraceCall {
    from: string;
    to: string;
    gas: string;
    gasPrice: string;
    value: string;
    data: string;
}
interface InterfaceTraceFilter {
    fromBlock: string;
    toBlock: string;
    fromAddress: string;
    toAddress: string;
    after: string;
    count: string;
}
interface InterfaceTxObj {
    to: string;
    from: string;
    data: string;
    gasLimit: string;
    gasPrice: string;
    maxFeePerGas: string;
    maxPriorityFeePerGas: string;
    lastBaseFeePerGas: string;
    value: string;
    nonce: string;
    chainId: string;
}
interface InterfaceTraceObject {
    tracer: "callTracer";
    tracerConfig: {
        onlyTopCall: boolean;
    };
}
type TypeTrace = Array<"vmTrace" | "trace" | "stateDiff">;
type TypeQuantityOrTag = string | "latest" | "pending";
declare class export_default$3{
    constructor();
    buildFormat: (...args: any) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_subscribe: (...params: any) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_unsubscribe: (subscriptionId: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_blockNumber: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_chainId: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_call: (tx: InterfaceTxObjCall | NonNullable<object>, quantityOrTag: TypeQuantityOrTag) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_estimateGas: (tx: InterfaceTxObj | NonNullable<object>) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_feeHistory: (blockCount: string, latestBlock: string, rewardPercentiles: string[]) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_gasPrice: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getBalance: (address: string, tag: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getBlockByHash: (hash: string, txDetail: boolean) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getBlockByNumber: (quantityOrTag: TypeQuantityOrTag, txDetail: boolean) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getBlockReceipts: (quantityOrTag: TypeQuantityOrTag) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getBlockTransactionCountByHash: (hash: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getBlockTransactionCountByNumber: (quantityOrTag: TypeQuantityOrTag) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getCode: (address: string, quantityOrTag: TypeQuantityOrTag) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getFilterChanges: (filterId: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getFilterLogs: (filterId: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getLogs: (filterObj: InterfaceGetLogs | NonNullable<object>) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getProof: (address: string, storageKeys: string[], quantityOrTag: TypeQuantityOrTag) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getStorageAt: (obj: InterfaceGetStorageAt | NonNullable<object>) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getTransactionByBlockHashAndIndex: (blockHash: string, index: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getTransactionByBlockNumberAndIndex: (quantityOrTag: string, index: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getTransactionByHash: (hash: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getTransactionCount: (address: string, quantityOrTag: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getTransactionReceipt: (hash: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getUncleCountByBlockHash: (hash: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_getUncleCountByBlockNumber: (hexNumber: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_hashrate: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_maxPriorityFeePerGas: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_mining: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_newBlockFilter: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_newFilter: (obj: InterfaceNewFilter | NonNullable<object>) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_newPendingTransactionFilter: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_sendRawTransaction: (signedTx: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_syncing: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    eth_uninstallFilter: (filterId: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    net_listening: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    net_peerCount: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    net_version: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    qn_broadcastRawTransaction: (signedTx: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    qn_getBlockWithReceipts: (hexNumber: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    qn_getReceipts: (hexNumber: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    trace_block: (quantityOrTag: TypeQuantityOrTag) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    trace_call: (obj: InterfaceTraceCall | NonNullable<object>, typeTrace: TypeTrace, quantityOrTag: TypeQuantityOrTag) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    trace_callMany: (typeTrace: TypeTrace, quantityOrTag: TypeQuantityOrTag) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    trace_filter: (obj: InterfaceTraceFilter | NonNullable<object>) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    trace_replayBlockTransactions: (quantityOrTag: TypeQuantityOrTag, typeTrace: TypeTrace) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    trace_replayTransaction: (hash: string, typeTrace: TypeTrace) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    trace_transaction: (hash: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    txpool_content: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    txpool_inspect: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    txpool_status: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    web3_clientVersion: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    web3_sha3: (data: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    debug_getBadBlocks: () => {
        method: any;
        params: any;
        formatReturn: any;
    };
    debug_storageRangeAt: (blockHash: string, txIndex: string, address: string, startKey: string, limit: string) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    debug_traceBlock: (blockRlpEncode: string, tracerObject: InterfaceTraceObject) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    debug_traceBlockByHash: (blockHash: string, tracerObject: InterfaceTraceObject) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    debug_traceBlockByNumber: (quantityOrTag: TypeQuantityOrTag, tracerObject: InterfaceTraceObject) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    debug_traceCall: (tx: InterfaceTraceCall | NonNullable<object>, quantityOrTag: TypeQuantityOrTag, tracerObject: InterfaceTraceObject) => {
        method: any;
        params: any;
        formatReturn: any;
    };
    debug_traceTransaction: (hash: string, tracerObject: InterfaceTraceObject) => {
        method: any;
        params: any;
        formatReturn: any;
    };
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
     * @param urlRpc url node blockchain
     * @param handleErrorOther function to handle error other than JSON-RPC
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
