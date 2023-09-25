const { default: fetch } = require("node-fetch-commonjs");

class Main {
    constructor(url = "") {
        this.url = url;
    }

    connect = () => { }

    isReady = () => { return true; }

    send = async (data) => {
        const res = await fetch(this.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: data
        });
        const jsonData = await res.json();
        return jsonData;
    }
}

module.exports = Main;