import EthBuild from "./eth";
import ConnectHttp from "../connect/http";
import ConnectIpc from "../connect/ipc";
import ConnectWs from "../connect/ws";
import { IfaceSend, IfaceReconnectOpt } from "./iface";

class Provider {
  #nextId = 0;
  #maxSafeNextId = Number.MAX_SAFE_INTEGER - 100;
  client;
  ethBuild;
  ethSend;

  /**
   *
   * @param_urlRpc urlRpc url node blockchain. input string
   * @param_socketOpt option socket for network ws | ipc. input {} | null | undefined
   * @param_reconnectOpt option reconnect for network ws | ipc. input {} | null | undefined
   */
  constructor(urlRpc: string, socketOpt: object, reconnectOpt: IfaceReconnectOpt, overrideEthReturn: { method: string; formatReturn: any }[]) {
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

    const buildSend = (...args: any) => {
      return {
        method: args[0],
        params: args[1],
        formatReturn: args[2],
      };
    };

    this.ethBuild = new EthBuild(buildSend);
    this.ethSend = new EthBuild(async (...args: any) => await this.send(buildSend(...args)));
    overrideEthReturn?.forEach((it) => {
      const { method, formatReturn } = it;
      this.ethBuild._overrideFormatReturn(method, formatReturn);
      this.ethSend._overrideFormatReturn(method, formatReturn);
    });
  }

  #incrementNextId = () => {
    if (this.#nextId >= this.#maxSafeNextId) this.#nextId = 0;
    return (this.#nextId += 1); // increment id jsonrpc
  };

  #returnSend = (result: any, returnFormat: (args: any) => any) => {
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
   * @paramPayload payload object or array object JSON-RPC request
   * @returns result without handling error
   */
  request = async (payload: object | []) => {
    return await this.client.client.request(payload);
  };

  /**
   *
   * @paramArgsFormat { method: "", params: [], formatReturn: Function | null | undefined }
   * @paramArgsExample { method: "eth_subscribe", params: ["newPendingTransactions"], formatReturn: null }
   * @callback res = callback(result, subsId = subscription id)
   */
  subscribe = async (args: IfaceSend, reconnect: boolean, callbackRes: (res: any, subsId: string) => void) => {
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
   * @paramArgsFormat { method: "", params: [], formatReturn: Function | null | undefined }
   * @paramArgsExample { method: "eth_chainId", params: [], formatReturn: parseInt }
   * @returns any
   */
  send = async (args: IfaceSend): Promise<any> => {
    const id = this.#incrementNextId();
    const bodyJsonRpc = { jsonrpc: "2.0", id, method: args.method, params: args.params };
    const result = await this.client.client.request(bodyJsonRpc);
    return this.#returnSend(result, args.formatReturn);
  };

  /**
   *
   * @paramArgsFormat { method: "", params: [], formatReturn: Function | null | undefined }, { method: "", params: [], formatReturn: Function | null | undefined }
   * @paramArgsExample { method: "eth_chainId", params: [], formatReturn: parseInt }, { method: "eth_blockNumber", params: [], formatReturn: parseInt }
   * @returns any[]
   */
  sendBatch = async (...args: Array<IfaceSend>): Promise<any[]> => {
    const bodyJsonRpc = args.map((it) => {
      this.#incrementNextId();
      return { jsonrpc: "2.0", id: this.#nextId, method: it.method, params: it.params };
    });

    const res = await this.client.client.request(bodyJsonRpc);
    if (res[0] === undefined) this.#returnSend(res, null);
    return res.sort((a: any, b: any) => a.id - b.id).map((it: any, index: number) => this.#returnSend(it, args[index].formatReturn));
  };
}

export default { EthBuild, Provider };
export { EthBuild, Provider };
