const EthRpc = require('../index');
const provider = new EthRpc("https://bscrpc.com");

(async () => {
    /**
     * first run function isReady before send request
     * @returns bool
     */
    await provider.isReady();

    /**
     * test method .send()
     * @param string method - method eth name space 
     * @param array params - parameter request
     * @returns hex
     */
    const getChainId = await provider.send("eth_chainId", []);
    console.log("🚀 ~ file: test.js:18 ~ getChainId:", BigInt(getChainId.result));

    /**
     * test method .sendBatch()
     * @param arrayObject [ { method:"", params:[] } ]
     * @returns array
     */
    const getBlockNumberAndChainId = await provider.sendBatch([
        { method: "eth_blockNumber", params: [] },
        { method: "eth_chainId", params: [] }
    ]);
    console.log("🚀 ~ file: test.js:29 ~ getBlockNumberAndChainId", getBlockNumberAndChainId.map(it => BigInt(it.result)));

    // // unhidden this comment if you use network type ws or ipc
    // /**
    //  * test method .subscribe()
    //  * @param string params - subscription name
    //  * @param functionCallback callbackRes - callbackRes 1 param
    //  * @returns undefined
    //  */
    // let subId = 0;
    // provider.subscribe("newPendingTransactions", (res) => {
    //     if (res.id !== undefined) {
    //         subId = res.result;
    //     } else {
    //         console.log("🚀 ~ file: test.js:42 ~ provider.subscribe ~ res:", res.result)
    //     }
    // });

    // /**
    //  * test method .unSubscribe()
    //  * @param string subId - subscription id
    //  * @returns bool
    //  */
    // const unSubscribe = await provider.unSubscribe(subId);
})();