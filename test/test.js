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
    console.log(`INFO: result getChainId:`, getChainId);

    // test function .sendBatch()
    const getBlockNumberAndChainId = await provider.sendBatch(
        ethName.eth_blockNumber(),
        ethName.eth_chainId()
    );
    console.log(`INFO: result getBlockNumberAndChainId:`, getBlockNumberAndChainId);
})();