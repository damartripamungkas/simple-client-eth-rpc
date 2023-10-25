import { WebSocketProvider } from "web3-providers-ws";

export default class {
  public client: any;
  constructor(url: string, socketOpt: object, reconnectOpt: object) {
    this.client = new WebSocketProvider(url, socketOpt, reconnectOpt);
    this.client._getChainId = () => new Promise((res) => res([])); // overrides because is calling without agreement
    this.client._getAccounts = () => new Promise((res) => res([])); // overrides because is calling without agreement
  }

  isReady = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      this.client.once("connect", () => resolve(true));
    });
  };
}
