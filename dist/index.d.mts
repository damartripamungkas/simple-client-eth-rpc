type TypeTxValue = string | number | bigint;
type TypeTrace = Array<"vmTrace" | "trace" | "stateDiff">;
type TypeBlockNumber = string | "latest" | "pending";
interface IfaceTxObjCall {
    to: string;
    from?: string;
    data?: string;
    gas?: TypeTxValue;
    gasPrice?: TypeTxValue;
    value?: TypeTxValue;
}
interface IfaceGetLogs {
    fromBlock?: string;
    toBlock?: string;
    address?: string;
    topics?: string;
    blockHash?: string;
}
interface IfaceNewFilter {
    fromBlock?: TypeBlockNumber;
    toBlock?: TypeBlockNumber;
    address?: string;
    topics?: string;
}
interface IfaceTraceCall {
    from?: string;
    to: string;
    gas?: TypeTxValue;
    gasPrice?: TypeTxValue;
    value?: TypeTxValue;
    data?: string;
}
interface IfaceTraceFilter {
    fromBlock?: TypeBlockNumber;
    toBlock?: TypeBlockNumber;
    fromAddress?: string;
    toAddress?: string;
    after?: string;
    count?: string;
}
interface IfaceTxObj {
    to?: string;
    from?: string;
    data?: string;
    gasLimit?: TypeTxValue;
    gasPrice?: TypeTxValue;
    maxFeePerGas?: TypeTxValue;
    maxPriorityFeePerGas?: TypeTxValue;
    value?: TypeTxValue;
    nonce?: TypeTxValue;
    chainId?: TypeTxValue;
}
interface IfaceTraceObject {
    tracer: "callTracer" | "prestateTracer";
    tracerConfig: {
        onlyTopCall: boolean;
    };
}
interface IfaceReconnectOpt {
    autoReconnect?: boolean | true;
    delay?: number | 500;
    maxAttempts?: number;
}
interface IfaceSend {
    method: string;
    params: any[];
    formatReturn?: any;
}
interface InterfaceCallback {
    (...args: any): void;
}

declare class Main {
    #private;
    constructor(funcBuildSend: any);
    _overrideFormatReturn: (method: string, formatReturn: any) => void;
    _eth: (method: string, params: any[], formatReturn?: any) => any;
    eth_subscribe: (...params: any) => any;
    eth_unsubscribe: (subscriptionId: string) => any;
    eth_blockNumber: () => any;
    eth_chainId: () => any;
    eth_call: (tx: IfaceTxObjCall, blockNumber: TypeBlockNumber) => any;
    eth_estimateGas: (tx: IfaceTxObj) => any;
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
    eth_getLogs: (filterObj: IfaceGetLogs) => any;
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
    eth_newFilter: (obj: IfaceNewFilter) => any;
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
    trace_call: (obj: IfaceTraceCall, typeTrace: TypeTrace, blockNumber: TypeBlockNumber) => any;
    trace_callMany: (typeTrace: TypeTrace, blockNumber: TypeBlockNumber) => any;
    trace_filter: (obj: IfaceTraceFilter) => any;
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
    debug_traceBlock: (blockRlpEncode: string, tracerObject: IfaceTraceObject) => any;
    debug_traceBlockByHash: (blockHash: string, tracerObject: IfaceTraceObject) => any;
    debug_traceBlockByNumber: (blockNumber: TypeBlockNumber, tracerObject: IfaceTraceObject) => any;
    debug_traceCall: (tx: IfaceTraceCall, blockNumber: TypeBlockNumber, tracerObject: IfaceTraceObject) => any;
    debug_traceTransaction: (hash: string, tracerObject: IfaceTraceObject) => any;
}

declare class export_default$3{
    client: any;
    constructor(url: string, socketOpt: object);
    isReady: () => boolean;
}

declare class export_default$2{
    client: any;
    constructor(url: string, socketOpt: object, reconnectOpt: object);
    isReady: () => Promise<boolean>;
}

declare class export_default$1{
    client: any;
    constructor(url: string, socketOpt: object, reconnectOpt: object);
    isReady: () => Promise<boolean>;
}

declare class export_default{
    #private;
    constructor(initEthSend: any, initEthBuild: any, sendBatch: any);
    getGasPriceLevel: (blockNumber: string) => Promise<{
        readonly all: any;
        readonly top: bigint;
        readonly mid: bigint;
        readonly bottom: bigint;
    }>;
    isSmartContract: (address: string) => Promise<any>;
    waitTransactionReceipt: (hash: string, intervalMs: number | 2500) => Promise<any>;
    batchWaitTransactionReceipt: (hash: string[], intervalMs: number | 2500, callbackRes: InterfaceCallback) => Promise<void>;
    batchSendRawTransaction: (signTx: string[]) => Promise<any>;
}

declare class Provider {
    #private;
    client: export_default$3 | export_default$2 | export_default$1;
    ethBuild: Main;
    ethSend: Main;
    customSend: export_default;
    /**
     *
     * @param_urlRpc urlRpc url node blockchain. input string
     * @param_socketOpt option socket for network ws | ipc. input {} | null | undefined
     * @param_reconnectOpt option reconnect for network ws | ipc. input {} | null | undefined
     */
    constructor(urlRpc: string, socketOpt: object, reconnectOpt: IfaceReconnectOpt, overrideEthReturn: {
        method: string;
        formatReturn: any;
    }[]);
    /**
     * @info generate id for next request JSON-RPC
     * @returns number
     */
    incrementNextId: () => number;
    /**
     * @info [REQUIRE] must be call first before run other method
     * @returns when "true" is ready
     */
    isReady: () => Promise<boolean>;
    /**
     *
     * @paramPayload payload object or array object JSON-RPC request
     * @returns result without handling error
     */
    request: (payload: object | [
    ]) => Promise<any>;
    /**
     *
     * @paramArgsFormat { method: "", params: [], formatReturn: Function | null | undefined }
     * @paramArgsExample { method: "eth_subscribe", params: ["newPendingTransactions"], formatReturn: null }
     * @callback res = callback(result, subsId = subscription id)
     */
    subscribe: (args: IfaceSend, reconnect: boolean, callbackRes: (res: any, subsId: string) => void) => Promise<void>;
    /**
     *
     * @paramArgsFormat { method: "", params: [], formatReturn: Function | null | undefined }
     * @paramArgsExample { method: "eth_chainId", params: [], formatReturn: parseInt }
     * @returns any
     */
    send: (args: IfaceSend) => Promise<any>;
    /**
     *
     * @paramArgsFormat { method: "", params: [], formatReturn: Function | null | undefined }, { method: "", params: [], formatReturn: Function | null | undefined }
     * @paramArgsExample { method: "eth_chainId", params: [], formatReturn: parseInt }, { method: "eth_blockNumber", params: [], formatReturn: parseInt }
     * @returns any[]
     */
    sendBatch: (...args: Array<IfaceSend>) => Promise<any[]>;
}

declare const _default: {
    Provider: typeof Provider;
};

export { Provider, _default as default };
