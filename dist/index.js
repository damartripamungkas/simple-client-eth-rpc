var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// src/index.ts
var src_exports = {};
__export(src_exports, {
  EthNameSpace: () => eth_default,
  Provider: () => Provider,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/name_space/eth.ts
var eth_default = class {
  constructor() {
    this.buildFormat = (...args) => {
      return {
        method: args[0],
        params: args[1],
        formatReturn: args[2]
      };
    };
    this.eth_subscribe = (...params) => this.buildFormat("eth_subscribe", params, null);
    this.eth_unsubscribe = (subscriptionId) => this.buildFormat("eth_unsubscribe", subscriptionId, null);
    this.eth_blockNumber = () => this.buildFormat("eth_blockNumber", [], parseInt);
    this.eth_chainId = () => this.buildFormat("eth_chainId", [], parseInt);
    this.eth_call = (tx, quantityOrTag) => this.buildFormat("eth_call", [tx, quantityOrTag], null);
    this.eth_estimateGas = (tx) => this.buildFormat("eth_estimateGas", [tx], parseInt);
    this.eth_feeHistory = (blockCount, latestBlock, rewardPercentiles) => this.buildFormat("eth_feeHistory", [blockCount, latestBlock, rewardPercentiles], null);
    this.eth_gasPrice = () => this.buildFormat("eth_gasPrice", [], parseInt);
    this.eth_getBalance = (address, tag) => this.buildFormat("eth_getBalance", [address, tag], parseInt);
    this.eth_getBlockByHash = (hash, txDetail) => this.buildFormat("eth_getBlockByHash", [hash, txDetail], null);
    this.eth_getBlockByNumber = (quantityOrTag, txDetail) => this.buildFormat("eth_getBlockByNumber", [quantityOrTag, txDetail], null);
    this.eth_getBlockReceipts = (quantityOrTag) => this.buildFormat("eth_getBlockReceipts", [quantityOrTag], null);
    this.eth_getBlockTransactionCountByHash = (hash) => this.buildFormat("eth_getBlockTransactionCountByHash", [hash], parseInt);
    this.eth_getBlockTransactionCountByNumber = (quantityOrTag) => this.buildFormat("eth_getBlockTransactionCountByNumber", [quantityOrTag], parseInt);
    this.eth_getCode = (address, quantityOrTag) => this.buildFormat("eth_getCode", [address, quantityOrTag], null);
    this.eth_getFilterChanges = (filterId) => this.buildFormat("eth_getFilterChanges", [filterId], null);
    this.eth_getFilterLogs = (filterId) => this.buildFormat("eth_getFilterLogs", [filterId], null);
    this.eth_getLogs = (filterObj) => this.buildFormat("eth_getLogs", [filterObj], null);
    this.eth_getProof = (address, storageKeys, quantityOrTag) => this.buildFormat("eth_getProof", [address, storageKeys, quantityOrTag], null);
    this.eth_getStorageAt = (obj) => this.buildFormat("eth_getStorageAt", [obj], null);
    this.eth_getTransactionByBlockHashAndIndex = (blockHash, index) => this.buildFormat("eth_getTransactionByBlockHashAndIndex", [blockHash, index], null);
    this.eth_getTransactionByBlockNumberAndIndex = (quantityOrTag, index) => this.buildFormat("eth_getTransactionByBlockNumberAndIndex", [quantityOrTag, index], null);
    this.eth_getTransactionByHash = (hash) => this.buildFormat("eth_getTransactionByHash", [hash], null);
    this.eth_getTransactionCount = (address, quantityOrTag) => this.buildFormat("eth_getTransactionCount", [address, quantityOrTag], parseInt);
    this.eth_getTransactionReceipt = (hash) => this.buildFormat("eth_getTransactionReceipt", [hash], null);
    this.eth_getUncleCountByBlockHash = (hash) => this.buildFormat("eth_getUncleCountByBlockHash", [hash], parseInt);
    this.eth_getUncleCountByBlockNumber = (hexNumber) => this.buildFormat("eth_getUncleCountByBlockNumber", [hexNumber], parseInt);
    this.eth_hashrate = () => this.buildFormat("eth_hashrate", [], parseInt);
    this.eth_maxPriorityFeePerGas = () => this.buildFormat("eth_maxPriorityFeePerGas", [], parseInt);
    this.eth_mining = () => this.buildFormat("eth_mining", [], null);
    this.eth_newBlockFilter = () => this.buildFormat("eth_newBlockFilter", [], null);
    this.eth_newFilter = (obj) => this.buildFormat("eth_newFilter", [obj], null);
    this.eth_newPendingTransactionFilter = () => this.buildFormat("eth_newPendingTransactionFilter", [], null);
    this.eth_sendRawTransaction = (signedTx) => this.buildFormat("eth_sendRawTransaction", [signedTx], null);
    this.eth_syncing = () => this.buildFormat("eth_syncing", [], null);
    this.eth_uninstallFilter = (filterId) => this.buildFormat("eth_uninstallFilter", [filterId], null);
    this.net_listening = () => this.buildFormat("net_listening", [], null);
    this.net_peerCount = () => this.buildFormat("net_peerCount", [], parseInt);
    this.net_version = () => this.buildFormat("net_version", [], parseInt);
    this.qn_broadcastRawTransaction = (signedTx) => this.buildFormat("qn_broadcastRawTransaction", [signedTx], null);
    this.qn_getBlockWithReceipts = (hexNumber) => this.buildFormat("qn_getBlockWithReceipts", [hexNumber], null);
    this.qn_getReceipts = (hexNumber) => this.buildFormat("qn_getReceipts", [hexNumber], null);
    this.trace_block = (quantityOrTag) => this.buildFormat("trace_block", [quantityOrTag], null);
    this.trace_call = (obj, typeTrace, quantityOrTag) => this.buildFormat("trace_call", [obj, typeTrace, quantityOrTag], null);
    this.trace_callMany = (typeTrace, quantityOrTag) => this.buildFormat("trace_callMany", [typeTrace, quantityOrTag], null);
    this.trace_filter = (obj) => this.buildFormat("trace_filter", [obj], null);
    this.trace_replayBlockTransactions = (quantityOrTag, typeTrace) => this.buildFormat("trace_replayBlockTransactions", [quantityOrTag, typeTrace], null);
    this.trace_replayTransaction = (hash, typeTrace) => this.buildFormat("trace_replayTransaction", [hash, typeTrace], null);
    this.trace_transaction = (hash) => this.buildFormat("trace_transaction", [hash], null);
    this.txpool_content = () => this.buildFormat("txpool_content", [], null);
    this.txpool_inspect = () => this.buildFormat("txpool_inspect", [], null);
    this.txpool_status = () => this.buildFormat("txpool_status", [], null);
    this.web3_clientVersion = () => this.buildFormat("web3_clientVersion", [], null);
    this.web3_sha3 = (data) => this.buildFormat("web3_sha3", [data], null);
    this.debug_getBadBlocks = () => this.buildFormat("debug_getBadBlocks", [], null);
    this.debug_storageRangeAt = (blockHash, txIndex, address, startKey, limit) => this.buildFormat("debug_storageRangeAt", [blockHash, txIndex, address, startKey, limit], null);
    this.debug_traceBlock = (blockRlpEncode, tracerObject) => this.buildFormat("debug_traceBlock", [blockRlpEncode, tracerObject], null);
    this.debug_traceBlockByHash = (blockHash, tracerObject) => this.buildFormat("debug_traceBlockByHash", [blockHash, tracerObject], null);
    this.debug_traceBlockByNumber = (quantityOrTag, tracerObject) => this.buildFormat("debug_traceBlockByNumber", [quantityOrTag, tracerObject], null);
    this.debug_traceCall = (tx, quantityOrTag, tracerObject) => this.buildFormat("debug_traceCall", [tx, quantityOrTag, tracerObject], null);
    this.debug_traceTransaction = (hash, tracerObject) => this.buildFormat("debug_traceTransaction", [hash, tracerObject], null);
  }
};

// src/connect/http.ts
var http_default = class {
  constructor(url, socketOpt) {
    this.isReady = () => {
      return true;
    };
    this.client = {};
    this.client.on = () => {
    };
    this.client.request = async (data) => {
      const init = Object.assign(
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        },
        socketOpt
      );
      const res = await fetch(url, init);
      const jsonData = await res.json();
      return jsonData;
    };
  }
};

// src/connect/ipc.ts
var import_web3_providers_ipc = require("web3-providers-ipc");
var ipc_default = class {
  constructor(url, socketOpt, reconnectOpt) {
    this.isReady = async () => {
      return new Promise((resolve) => {
        this.client.once("connect", () => resolve(true));
      });
    };
    this.client = new import_web3_providers_ipc.IpcProvider(url, socketOpt, reconnectOpt);
    this.client._getChainId = () => new Promise((res) => res([]));
    this.client._getAccounts = () => new Promise((res) => res([]));
  }
};

// src/connect/ws.ts
var import_web3_providers_ws = require("web3-providers-ws");
var ws_default = class {
  constructor(url, socketOpt, reconnectOpt) {
    this.isReady = async () => {
      return new Promise((resolve) => {
        this.client.once("connect", () => resolve(true));
      });
    };
    this.client = new import_web3_providers_ws.WebSocketProvider(url, socketOpt, reconnectOpt);
    this.client._getChainId = () => new Promise((res) => res([]));
    this.client._getAccounts = () => new Promise((res) => res([]));
  }
};

// src/index.ts
var _nextId, _maxSafeNextId, _incrementNextId, _returnSend;
var Provider = class {
  /**
   *
   * @param urlRpc url node blockchain
   * @param handleErrorOther function to handle error other than JSON-RPC
   */
  constructor(urlRpc, socketOpt, reconnectOpt) {
    __privateAdd(this, _nextId, 0);
    __privateAdd(this, _maxSafeNextId, Number.MAX_SAFE_INTEGER - 100);
    __privateAdd(this, _incrementNextId, () => {
      if (__privateGet(this, _nextId) >= __privateGet(this, _maxSafeNextId))
        __privateSet(this, _nextId, 0);
      return __privateSet(this, _nextId, __privateGet(this, _nextId) + 1);
    });
    __privateAdd(this, _returnSend, (result, returnFormat) => {
      if (result.error !== void 0)
        throw result.error.message;
      if (returnFormat === null || returnFormat === void 0)
        return result.result;
      return returnFormat(result.result);
    });
    /**
     *
     * @returns when "true" is ready
     */
    this.isReady = async () => {
      return await this.client.isReady();
    };
    /**
     *
     * @param {*} payload object or array object JSON-RPC request
     * @returns result without handling error
     */
    this.request = async (payload) => {
      return await this.client.client.request(payload);
    };
    /**
     *
     * @param {*} args format: [method, params]
     * @param {*} args example: { method: "eth_subscribe", params: ["newPendingTransactions"], formatReturn: null }
     * @callback res = callback(result, subsId = subscription id)
     */
    this.subscribe = async (args, reconnect, callbackRes) => {
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
    };
    /**
     *
     * @param {*} args format: { method: "", params: [], formatReturn: Function | null | undefined }
     * @param {*} args example: { method: "eth_chainId", params: [], formatReturn: parseInt }
     * @returns any
     */
    this.send = async (args) => {
      const id = __privateGet(this, _incrementNextId).call(this);
      const bodyJsonRpc = { jsonrpc: "2.0", id, method: args.method, params: args.params };
      const result = await this.client.client.request(bodyJsonRpc);
      return __privateGet(this, _returnSend).call(this, result, args.formatReturn);
    };
    /**
     *
     * @param {*} args format: { method: "", params: [], formatReturn: Function | null | undefined }, { method: "", params: [], formatReturn: Function | null | undefined }
     * @param {*} args example: { method: "eth_chainId", params: [], formatReturn: parseInt }, { method: "eth_blockNumber", params: [], formatReturn: parseInt }
     * @returns any[]
     */
    this.sendBatch = async (...args) => {
      const bodyJsonRpc = args.map((it) => {
        __privateGet(this, _incrementNextId).call(this);
        return { jsonrpc: "2.0", id: __privateGet(this, _nextId), method: it.method, params: it.params };
      });
      const res = await this.client.client.request(bodyJsonRpc);
      return res.sort((a, b) => a.id - b.id).map((it, index) => __privateGet(this, _returnSend).call(this, it, args[index].formatReturn));
    };
    socketOpt = socketOpt === null || socketOpt === void 0 ? {} : socketOpt;
    reconnectOpt = reconnectOpt === null || reconnectOpt === void 0 ? {} : reconnectOpt;
    if (urlRpc.startsWith("http")) {
      this.client = new http_default(urlRpc, socketOpt);
      this.subscribe = () => {
        throw `network type http not support subscribe`;
      };
    } else if (urlRpc.startsWith("ws")) {
      this.client = new ws_default(urlRpc, socketOpt, reconnectOpt);
    } else if (urlRpc.endsWith(".ipc")) {
      this.client = new ipc_default(urlRpc, socketOpt, reconnectOpt);
    } else {
      throw `network type is not supported, only support http/ws/.ipc`;
    }
  }
};
_nextId = new WeakMap();
_maxSafeNextId = new WeakMap();
_incrementNextId = new WeakMap();
_returnSend = new WeakMap();
var src_default = { EthNameSpace: eth_default, Provider };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EthNameSpace,
  Provider
});
