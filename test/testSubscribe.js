const { Provider, EthNameSpace } = require("../index");
const ethName = new EthNameSpace();
const provider = new Provider(
    "ws://localhost:1234",
    {},
    {
        delay: 500,
        autoReconnect: true,
        maxAttempts: Number.MAX_SAFE_INTEGER
    }
);

(async () => {
    /**
     * first run function isReady before send request
     * @returns bool
     */
    await provider.isReady();

    // test function .subscribe() and method unsubscribe
    const buildSubscribe = ethName.eth_subscribe("newPendingTransactions", true);
    await provider.subscribe(buildSubscribe, true, async (result, subsId) => {
        console.log(`INFO: result stream data eth_subscribe:`, result);

        const unsubs = await provider.send(ethName.eth_unsubscribe(subsId));
        console.log(`INFO: unsubscribe success with subsId: ${unsubs}`);
    });
})();