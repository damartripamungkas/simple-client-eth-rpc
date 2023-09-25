const { Provider, EthNameSpace } = require("../index");
const provider = new Provider("https://bscrpc.com");
const ethName = new EthNameSpace();

(async () => {
    /**
     * first run function isReady before send request
     * @returns bool
     */
    await provider.isReady();

    // test method .send()
    const getChainId = await provider.send(ethName.eth_chainId());
    console.log("🚀 ~ file: test.js:20 ~ getChainId:", getChainId);

    // test method .sendBatch()
    const getBlockNumberAndChainId = await provider.sendBatch(
        ethName.eth_blockNumber(),
        ethName.eth_chainId()
    );
    console.log("🚀 ~ file: test.js:27 ~ getBlockNumberAndChainId:", getBlockNumberAndChainId);

    // // remove this comment for run method
    // test method .subscribe()
    // provider.subscribe(ethName.eth_subscribe("newPendingTransactions"), (result) => {
    //     console.log("🚀 ~ file: test.js:31:", result);
    // });
})();