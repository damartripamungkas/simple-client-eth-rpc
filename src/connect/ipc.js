const net = require("node:net");

class Main {
    constructor(url = "") {
        this.client = this.connect(url);
    }

    connect = (url) => {
        const client = net.createConnection(url);
        client.on("close", () => {
            setTimeout(() => {
                client.destroy();
                this.client = net.createConnection(url);
            }, 2000)
        });

        return client;
    }

    isReady = async () => {
        return new Promise(resolve => {
            this.client.on("ready", () => resolve(true));
        })
    }

    send = (data) => {
        this.client.send(data);
    }
}

module.exports = Main;