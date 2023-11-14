const { Provider } = require("..");

/**
 * @args_1 url rpc http/ws/ipc
 * @args_2 socket optional for ws/ipc
 * @args_3 reconnect optional for ws/ipc
 * @args_4 override formatReturn eth method
 * @returns object
 */
const provider = new Provider("https://bscrpc.com", null, null, [
  { method: "eth_chainId", formatReturn: BigInt },
  { method: "eth_blockNumber", formatReturn: BigInt },
]);

(async () => {
  /**
   * @info [require] first run function isReady before send request
   * @returns bool
   */
  await provider.isReady();

  /**
   * @test test 1 request
   * @info run eth_chainId
   * @returns BigInt
   */
  const getChainId = await provider.ethSend.eth_chainId();
  console.log(`INFO: result eth_chainId:`, getChainId);

  /**
   * @test test multi request
   * @info run eth_chainId, eth_blockNumber
   * @returns Array[BigInt, BigInt]
   */
  const getBlockNumberAndChainId = await provider.sendBatch(
    provider.ethBuild.eth_chainId(),
    provider.ethBuild.eth_blockNumber()
  );
  console.log(`INFO: result eth_chainId, eth_blockNumber:`, getBlockNumberAndChainId);

  /**
   * @test custom send eth
   * @info get gasPriceLevel in spesific block
   * @returns Object{ all, top, mid, bottom }
   */
  const getGasPriceLevel = await provider.customSend.getGasPriceLevel();
  console.log(`INFO: result gasprice level top: ${getGasPriceLevel.top}`);
})();
