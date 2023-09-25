const Websocket = require("ws");

class Main {
    constructor(url = "") {
        this.client = this.connect(url);
    }

    connect = (url) => {
        const args = [url, { handshakeTimeout: 20000 }];
        const client = new Websocket(...args);
        client.on("close", () => {
            setTimeout(() => {
                client.terminate();
                this.client = new Websocket(...args);
            }, 2000)
        });

        return client;
    }

    isReady = async () => {
        return new Promise(resolve => {
            this.client.once("open", () => resolve(true));
        })
    }

    send = (data) => {
        this.client.send(data);
    }
}

module.exports = Main;