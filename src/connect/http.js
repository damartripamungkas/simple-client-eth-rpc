const { default: fetch } = require("node-fetch-commonjs");

class Main {
	constructor(url = "", socketOpt = {}) {
		this.url = url;
		this.client = {};
		this.client.on = () => {};
		this.client.request = async (data) => {
			const init = Object.assign(
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				},
				socketOpt
			);
			const res = await fetch(this.url, init);
			const jsonData = await res.json();
			return jsonData;
		};
	}

	isReady = () => {
		return true;
	};
}

module.exports = Main;
