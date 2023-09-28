const { WebSocketProvider } = require("web3-providers-ws");

class Main {
    constructor(url = "", socketOpt = {}, reconnectOpt = {}) {
        this.client = new WebSocketProvider(url, socketOpt, reconnectOpt);
        this.client._getChainId = () => new Promise(res => res([])); // overrides because is calling without agreement
        this.client._getAccounts = () => new Promise(res => res([])); // overrides because is calling without agreement
    }

    isReady = async () => {
        return new Promise(resolve => {
            this.client.once("connect", () => resolve(true));
        })
    }
}

module.exports = Main;