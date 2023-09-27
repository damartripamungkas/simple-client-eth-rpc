const { Provider, EthNameSpace } = require("../index");
const provider = new Provider("https://bscrpc.com");
const ethName = new EthNameSpace();

(async () => {
    /**
     * first run function isReady before send request
     * @returns bool
     */
    await provider.isReady();

    // test function .send()
    const getChainId = await provider.send(ethName.eth_chainId());
    console.log("🚀 ~ file: test.js:20 ~ getChainId:", getChainId);

    // test function .sendBatch()
    const getBlockNumberAndChainId = await provider.sendBatch(
        ethName.eth_blockNumber(),
        ethName.eth_chainId()
    );
    console.log("🚀 ~ file: test.js:27 ~ getBlockNumberAndChainId:", getBlockNumberAndChainId);

    // test function .subscribe() and method unsubscribe
    // await provider.subscribe(ethName.eth_subscribe("newPendingTransactions"), (result, subsId) => {
    //     console.log("🚀 ~ file: test.js:31:", result);
    //     await provider.send(ethName.eth_unsubscribe(subsId));
    // });
})();