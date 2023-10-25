import EthNameSpace from "./name_space/eth";
import ConnectHttp from "./connect/http";
import ConnectIpc from "./connect/ipc";
import ConnectWs from "./connect/ws";

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

class Provider {
  client;
  #nextId = 0;
  #maxSafeNextId = Number.MAX_SAFE_INTEGER - 100;

  /**
   *
   * @param urlRpc url node blockchain
   * @param handleErrorOther function to handle error other than JSON-RPC
   */
  constructor(urlRpc: string, socketOpt: object | undefined | null, reconnectOpt: InterfaceReconnectOpt | NonNullable<object> | undefined | null) {
    socketOpt = socketOpt === null || socketOpt === undefined ? {} : socketOpt;
    reconnectOpt = reconnectOpt === null || reconnectOpt === undefined ? {} : reconnectOpt;

    if (urlRpc.startsWith("http")) {
      this.client = new ConnectHttp(urlRpc, socketOpt);
      this.subscribe = () => {
        throw `network type http not support subscribe`;
      };
    } else if (urlRpc.startsWith("ws")) {
      this.client = new ConnectWs(urlRpc, socketOpt, reconnectOpt);
    } else if (urlRpc.endsWith(".ipc")) {
      this.client = new ConnectIpc(urlRpc, socketOpt, reconnectOpt);
    } else {
      throw `network type is not supported, only support http/ws/.ipc`;
    }
  }

  #incrementNextId = () => {
    if (this.#nextId >= this.#maxSafeNextId) this.#nextId = 0;
    return (this.#nextId += 1); // increment id jsonrpc
  };

  #returnSend = (result: any, returnFormat: (args: any) => void | null | undefined) => {
    if (result.error !== undefined) throw result.error.message;
    if (returnFormat === null || returnFormat === undefined) return result.result;
    return returnFormat(result.result);
  };

  /**
   *
   * @returns when "true" is ready
   */
  isReady = async () => {
    return await this.client.isReady();
  };

  /**
   *
   * @param {*} payload object or array object JSON-RPC request
   * @returns result without handling error
   */
  request = async (payload: object | []) => {
    return await this.client.client.request(payload);
  };

  /**
   *
   * @param {*} args format: [method, params]
   * @param {*} args example: { method: "eth_subscribe", params: ["newPendingTransactions"], formatReturn: null }
   * @callback res = callback(result, subsId = subscription id)
   */
  subscribe = async (args: InterfaceSend, reconnect: boolean, callbackRes: (res: any, subsId: string) => void) => {
    let subsId = await this.send(args);
    const handle = (res: any) => {
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
  send = async (args: InterfaceSend): Promise<any> => {
    const id = this.#incrementNextId();
    const bodyJsonRpc = { jsonrpc: "2.0", id, method: args.method, params: args.params };
    const result = await this.client.client.request(bodyJsonRpc);
    return this.#returnSend(result, args.formatReturn);
  };

  /**
   *
   * @param {*} args format: { method: "", params: [], formatReturn: Function | null | undefined }, { method: "", params: [], formatReturn: Function | null | undefined }
   * @param {*} args example: { method: "eth_chainId", params: [], formatReturn: parseInt }, { method: "eth_blockNumber", params: [], formatReturn: parseInt }
   * @returns any[]
   */
  sendBatch = async (...args: Array<InterfaceSend>): Promise<any[]> => {
    const bodyJsonRpc = args.map((it) => {
      this.#incrementNextId();
      return { jsonrpc: "2.0", id: this.#nextId, method: it.method, params: it.params };
    });

    const res = await this.client.client.request(bodyJsonRpc);
    return res.sort((a: any, b: any) => a.id - b.id).map((it: any, index: number) => this.#returnSend(it, args[index].formatReturn));
  };
}

export default { EthNameSpace, Provider };
export { EthNameSpace, Provider };
