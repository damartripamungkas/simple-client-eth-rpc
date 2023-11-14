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
  Provider: () => Provider,
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/provider/eth.ts
var _buildSend;
var eth_default = class {
  constructor(funcBuildSend) {
    __privateAdd(this, _buildSend, void 0);
    this._overrideFormatReturn = (method, formatReturn) => {
      const mockupOnlyForTypescript = { eth_chainId: this.eth_chainId };
      this[method] = (...args) => __privateGet(this, _buildSend).call(this, method, args === void 0 ? [] : args, formatReturn);
    };
    this.eth_subscribe = (...params) => __privateGet(this, _buildSend).call(this, "eth_subscribe", params, null);
    this.eth_unsubscribe = (subscriptionId) => __privateGet(this, _buildSend).call(this, "eth_unsubscribe", subscriptionId, null);
    this.eth_blockNumber = () => __privateGet(this, _buildSend).call(this, "eth_blockNumber", [], parseInt);
    this.eth_chainId = () => __privateGet(this, _buildSend).call(this, "eth_chainId", [], parseInt);
    this.eth_call = (tx, blockNumber) => __privateGet(this, _buildSend).call(this, "eth_call", [tx, blockNumber], null);
    this.eth_estimateGas = (tx) => __privateGet(this, _buildSend).call(this, "eth_estimateGas", [tx], parseInt);
    this.eth_feeHistory = (blockCount, latestBlock, rewardPercentiles) => __privateGet(this, _buildSend).call(this, "eth_feeHistory", [blockCount, latestBlock, rewardPercentiles], null);
    this.eth_gasPrice = () => __privateGet(this, _buildSend).call(this, "eth_gasPrice", [], parseInt);
    this.eth_getBalance = (address, tag) => __privateGet(this, _buildSend).call(this, "eth_getBalance", [address, tag], parseInt);
    this.eth_getBlockByHash = (hash, txDetail) => __privateGet(this, _buildSend).call(this, "eth_getBlockByHash", [hash, txDetail], null);
    this.eth_getBlockByNumber = (blockNumber, txDetail) => __privateGet(this, _buildSend).call(this, "eth_getBlockByNumber", [blockNumber, txDetail], null);
    this.eth_getBlockReceipts = (blockNumber) => __privateGet(this, _buildSend).call(this, "eth_getBlockReceipts", [blockNumber], null);
    this.eth_getBlockTransactionCountByHash = (hash) => __privateGet(this, _buildSend).call(this, "eth_getBlockTransactionCountByHash", [hash], parseInt);
    this.eth_getBlockTransactionCountByNumber = (blockNumber) => __privateGet(this, _buildSend).call(this, "eth_getBlockTransactionCountByNumber", [blockNumber], parseInt);
    this.eth_getCode = (address, blockNumber) => __privateGet(this, _buildSend).call(this, "eth_getCode", [address, blockNumber], null);
    this.eth_getFilterChanges = (filterId) => __privateGet(this, _buildSend).call(this, "eth_getFilterChanges", [filterId], null);
    this.eth_getFilterLogs = (filterId) => __privateGet(this, _buildSend).call(this, "eth_getFilterLogs", [filterId], null);
    this.eth_getLogs = (filterObj) => __privateGet(this, _buildSend).call(this, "eth_getLogs", [filterObj], null);
    this.eth_getProof = (address, storageKeys, blockNumber) => __privateGet(this, _buildSend).call(this, "eth_getProof", [address, storageKeys, blockNumber], null);
    this.eth_getStorageAt = (address, position, blockNumber) => __privateGet(this, _buildSend).call(this, "eth_getStorageAt", [address, position, blockNumber], null);
    this.eth_getTransactionByBlockHashAndIndex = (blockHash, index) => __privateGet(this, _buildSend).call(this, "eth_getTransactionByBlockHashAndIndex", [blockHash, index], null);
    this.eth_getTransactionByBlockNumberAndIndex = (blockNumber, index) => __privateGet(this, _buildSend).call(this, "eth_getTransactionByBlockNumberAndIndex", [blockNumber, index], null);
    this.eth_getTransactionByHash = (hash) => __privateGet(this, _buildSend).call(this, "eth_getTransactionByHash", [hash], null);
    this.eth_getTransactionCount = (address, blockNumber) => __privateGet(this, _buildSend).call(this, "eth_getTransactionCount", [address, blockNumber], parseInt);
    this.eth_getTransactionReceipt = (hash) => __privateGet(this, _buildSend).call(this, "eth_getTransactionReceipt", [hash], null);
    this.eth_getUncleCountByBlockHash = (hash) => __privateGet(this, _buildSend).call(this, "eth_getUncleCountByBlockHash", [hash], parseInt);
    this.eth_getUncleCountByBlockNumber = (hexNumber) => __privateGet(this, _buildSend).call(this, "eth_getUncleCountByBlockNumber", [hexNumber], parseInt);
    this.eth_hashrate = () => __privateGet(this, _buildSend).call(this, "eth_hashrate", [], parseInt);
    this.eth_maxPriorityFeePerGas = () => __privateGet(this, _buildSend).call(this, "eth_maxPriorityFeePerGas", [], parseInt);
    this.eth_mining = () => __privateGet(this, _buildSend).call(this, "eth_mining", [], null);
    this.eth_newBlockFilter = () => __privateGet(this, _buildSend).call(this, "eth_newBlockFilter", [], null);
    this.eth_newFilter = (obj) => __privateGet(this, _buildSend).call(this, "eth_newFilter", [obj], null);
    this.eth_newPendingTransactionFilter = () => __privateGet(this, _buildSend).call(this, "eth_newPendingTransactionFilter", [], null);
    this.eth_sendRawTransaction = (signedTx) => __privateGet(this, _buildSend).call(this, "eth_sendRawTransaction", [signedTx], null);
    this.eth_syncing = () => __privateGet(this, _buildSend).call(this, "eth_syncing", [], null);
    this.eth_uninstallFilter = (filterId) => __privateGet(this, _buildSend).call(this, "eth_uninstallFilter", [filterId], null);
    this.net_listening = () => __privateGet(this, _buildSend).call(this, "net_listening", [], null);
    this.net_peerCount = () => __privateGet(this, _buildSend).call(this, "net_peerCount", [], parseInt);
    this.net_version = () => __privateGet(this, _buildSend).call(this, "net_version", [], parseInt);
    this.qn_broadcastRawTransaction = (signedTx) => __privateGet(this, _buildSend).call(this, "qn_broadcastRawTransaction", [signedTx], null);
    this.qn_getBlockWithReceipts = (hexNumber) => __privateGet(this, _buildSend).call(this, "qn_getBlockWithReceipts", [hexNumber], null);
    this.qn_getReceipts = (hexNumber) => __privateGet(this, _buildSend).call(this, "qn_getReceipts", [hexNumber], null);
    this.trace_block = (blockNumber) => __privateGet(this, _buildSend).call(this, "trace_block", [blockNumber], null);
    this.trace_call = (obj, typeTrace, blockNumber) => __privateGet(this, _buildSend).call(this, "trace_call", [obj, typeTrace, blockNumber], null);
    this.trace_callMany = (typeTrace, blockNumber) => __privateGet(this, _buildSend).call(this, "trace_callMany", [typeTrace, blockNumber], null);
    this.trace_filter = (obj) => __privateGet(this, _buildSend).call(this, "trace_filter", [obj], null);
    this.trace_replayBlockTransactions = (blockNumber, typeTrace) => __privateGet(this, _buildSend).call(this, "trace_replayBlockTransactions", [blockNumber, typeTrace], null);
    this.trace_replayTransaction = (hash, typeTrace) => __privateGet(this, _buildSend).call(this, "trace_replayTransaction", [hash, typeTrace], null);
    this.trace_transaction = (hash) => __privateGet(this, _buildSend).call(this, "trace_transaction", [hash], null);
    this.txpool_content = () => __privateGet(this, _buildSend).call(this, "txpool_content", [], null);
    this.txpool_inspect = () => __privateGet(this, _buildSend).call(this, "txpool_inspect", [], null);
    this.txpool_status = () => __privateGet(this, _buildSend).call(this, "txpool_status", [], null);
    this.web3_clientVersion = () => __privateGet(this, _buildSend).call(this, "web3_clientVersion", [], null);
    this.web3_sha3 = (data) => __privateGet(this, _buildSend).call(this, "web3_sha3", [data], null);
    this.debug_getBadBlocks = () => __privateGet(this, _buildSend).call(this, "debug_getBadBlocks", [], null);
    this.debug_storageRangeAt = (blockHash, txIndex, address, startKey, limit) => __privateGet(this, _buildSend).call(this, "debug_storageRangeAt", [blockHash, txIndex, address, startKey, limit], null);
    this.debug_traceBlock = (blockRlpEncode, tracerObject) => __privateGet(this, _buildSend).call(this, "debug_traceBlock", [blockRlpEncode, tracerObject], null);
    this.debug_traceBlockByHash = (blockHash, tracerObject) => __privateGet(this, _buildSend).call(this, "debug_traceBlockByHash", [blockHash, tracerObject], null);
    this.debug_traceBlockByNumber = (blockNumber, tracerObject) => __privateGet(this, _buildSend).call(this, "debug_traceBlockByNumber", [blockNumber, tracerObject], null);
    this.debug_traceCall = (tx, blockNumber, tracerObject) => __privateGet(this, _buildSend).call(this, "debug_traceCall", [tx, blockNumber, tracerObject], null);
    this.debug_traceTransaction = (hash, tracerObject) => __privateGet(this, _buildSend).call(this, "debug_traceTransaction", [hash, tracerObject], null);
    __privateSet(this, _buildSend, funcBuildSend);
  }
};
_buildSend = new WeakMap();

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

// src/provider/custom.ts
var import_node_interval_return = require("node-interval-return");
var _ethSend, _ethBuild, _sendBatch;
var custom_default = class {
  constructor(initEthSend, initEthBuild, sendBatch) {
    __privateAdd(this, _ethSend, void 0);
    __privateAdd(this, _ethBuild, void 0);
    __privateAdd(this, _sendBatch, void 0);
    this.getGasPriceLevel = async (blockNumber) => {
      const { transactions } = await __privateGet(this, _ethSend).eth_getBlockByNumber(blockNumber, true);
      const arrGasPrice = transactions.map((it) => it.gasPrice);
      const lengthArrGasPrice = arrGasPrice.length;
      return {
        get all() {
          return arrGasPrice.reduce((acc, cur) => BigInt(acc) + BigInt(cur), 0);
        },
        get top() {
          return BigInt(arrGasPrice[0]);
        },
        get mid() {
          return BigInt(arrGasPrice[lengthArrGasPrice / 2]);
        },
        get bottom() {
          return BigInt(arrGasPrice[lengthArrGasPrice - 1]);
        }
      };
    };
    this.isSmartContract = async (address) => {
      const res = await __privateGet(this, _ethSend).eth_getCode(address, "latest");
      if (res == "0x") {
        throw `address is not smartcontract`;
      }
      return res;
    };
    this.waitTransactionReceipt = async (hash, intervalMs) => {
      const receipt = await (0, import_node_interval_return.intervalReturn)(intervalMs, true, async (resolve) => {
        const res = await __privateGet(this, _ethSend).eth_getTransactionReceipt(hash);
        if (res !== null) {
          resolve(res);
        }
      });
      receipt.status = receipt.status == 1 ? "success" : "failed";
      return receipt;
    };
    this.batchWaitTransactionReceipt = async (hash, intervalMs, callbackRes) => {
      for (let index = 0; index < hash.length; index++) {
        callbackRes(await this.waitTransactionReceipt(hash[index], intervalMs), index);
      }
    };
    this.batchSendRawTransaction = async (signTx) => {
      const buildRes = signTx.map((it) => __privateGet(this, _ethBuild).eth_sendRawTransaction(it));
      const sendBatch = await __privateGet(this, _sendBatch).call(this, ...buildRes);
      return sendBatch;
    };
    __privateSet(this, _ethSend, initEthSend);
    __privateSet(this, _ethBuild, initEthBuild);
    __privateSet(this, _sendBatch, sendBatch);
  }
};
_ethSend = new WeakMap();
_ethBuild = new WeakMap();
_sendBatch = new WeakMap();

// src/provider/provider.ts
var _nextId, _maxSafeNextId, _returnSend;
var Provider = class {
  /**
   *
   * @param_urlRpc urlRpc url node blockchain. input string
   * @param_socketOpt option socket for network ws | ipc. input {} | null | undefined
   * @param_reconnectOpt option reconnect for network ws | ipc. input {} | null | undefined
   */
  constructor(urlRpc, socketOpt, reconnectOpt, overrideEthReturn) {
    __privateAdd(this, _nextId, 0);
    __privateAdd(this, _maxSafeNextId, Number.MAX_SAFE_INTEGER - 100);
    __privateAdd(this, _returnSend, (result, returnFormat) => {
      if (result.error !== void 0)
        throw result.error.message;
      if (returnFormat === null || returnFormat === void 0)
        return result.result;
      return returnFormat(result.result);
    });
    /**
     * @info generate id for next request JSON-RPC
     * @returns number
     */
    this.incrementNextId = () => {
      if (__privateGet(this, _nextId) >= __privateGet(this, _maxSafeNextId))
        __privateSet(this, _nextId, 0);
      return __privateSet(this, _nextId, __privateGet(this, _nextId) + 1);
    };
    /**
     * @info [REQUIRE] must be call first before run other method
     * @returns when "true" is ready
     */
    this.isReady = async () => {
      return await this.client.isReady();
    };
    /**
     *
     * @paramPayload payload object or array object JSON-RPC request
     * @returns result without handling error
     */
    this.request = async (payload) => {
      return await this.client.client.request(payload);
    };
    /**
     *
     * @paramArgsFormat { method: "", params: [], formatReturn: Function | null | undefined }
     * @paramArgsExample { method: "eth_subscribe", params: ["newPendingTransactions"], formatReturn: null }
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
     * @paramArgsFormat { method: "", params: [], formatReturn: Function | null | undefined }
     * @paramArgsExample { method: "eth_chainId", params: [], formatReturn: parseInt }
     * @returns any
     */
    this.send = async (args) => {
      const id = this.incrementNextId();
      const bodyJsonRpc = { jsonrpc: "2.0", id, method: args.method, params: args.params };
      const result = await this.client.client.request(bodyJsonRpc);
      return __privateGet(this, _returnSend).call(this, result, args.formatReturn);
    };
    /**
     *
     * @paramArgsFormat { method: "", params: [], formatReturn: Function | null | undefined }, { method: "", params: [], formatReturn: Function | null | undefined }
     * @paramArgsExample { method: "eth_chainId", params: [], formatReturn: parseInt }, { method: "eth_blockNumber", params: [], formatReturn: parseInt }
     * @returns any[]
     */
    this.sendBatch = async (...args) => {
      const bodyJsonRpc = args.map((it) => {
        this.incrementNextId();
        return { jsonrpc: "2.0", id: __privateGet(this, _nextId), method: it.method, params: it.params };
      });
      const res = await this.client.client.request(bodyJsonRpc);
      if (res[0] === void 0)
        __privateGet(this, _returnSend).call(this, res, null);
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
    const buildSend = (...args) => {
      return {
        method: args[0],
        params: args[1],
        formatReturn: args[2]
      };
    };
    this.ethBuild = new eth_default(buildSend);
    this.ethSend = new eth_default(async (...args) => await this.send(buildSend(...args)));
    overrideEthReturn?.forEach((it) => {
      const { method, formatReturn } = it;
      this.ethBuild._overrideFormatReturn(method, formatReturn);
      this.ethSend._overrideFormatReturn(method, formatReturn);
    });
    this.customSend = new custom_default(this.ethSend, this.ethBuild, this.sendBatch);
  }
};
_nextId = new WeakMap();
_maxSafeNextId = new WeakMap();
_returnSend = new WeakMap();

// src/index.ts
var src_default = { Provider };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Provider
});
