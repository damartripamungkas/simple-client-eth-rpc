const { IpcProvider } = require("web3-providers-ipc");

class Main {
    constructor(url = "", socketOpt = {}, reconnectOpt = {}) {
        this.client = new IpcProvider(url, socketOpt, reconnectOpt);
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