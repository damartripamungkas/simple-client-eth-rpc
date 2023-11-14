<h1 align="center">
    SIMPLE-CLIENT-ETH-RPC
</h1>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/damartripamungkas/simple-client-eth-rpc?color=04D361&labelColor=000000">
  
  <a href="#">
    <img alt="Made by" src="https://img.shields.io/static/v1?label=made%20by&message=damartripamungkas&color=04D361&labelColor=000000">
  </a>
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/damartripamungkas/simple-client-eth-rpc?color=04D361&labelColor=000000">
  
  <a href="#">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/damartripamungkas/simple-client-eth-rpc?color=04D361&labelColor=000000">
  </a>
</p>

<br>

### 📖 Description :

This very light package was created for those of you who want to interact directly with the EVM Ethereum blockchain according to the documentation.

- support network http
- support network websocket
- support network ipc

### 💻 Step to install :

```
npm install --production simple-client-eth-rpc
```

### ✏️ Example :

#### Typescript

```javascript
import { Provider } from "simple-client-eth-rpc";
const provider = new Provider("https://bscrpc.com");
```

#### ESM (import)

```javascript
import { Provider } from "simple-client-eth-rpc";
const provider = new Provider("https://bscrpc.com");
```

#### CommonJs (require)

```javascript
const { Provider } = require("simple-client-eth-rpc");
const provider = new Provider("https://bscrpc.com");
```

#### Usage

```javascript
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
  console.log(
    `INFO: result eth_chainId, eth_blockNumber:`,
    getBlockNumberAndChainId
  );

  /**
   * @test custom send eth
   * @info get gasPriceLevel in spesific block
   * @returns Object{ all, top, mid, bottom }
   */
  const getGasPriceLevel = await provider.customSend.getGasPriceLevel();
  console.log(`INFO: result gasprice level top: ${getGasPriceLevel.top}`);
})();
```

full example see [here](./test)

### 🧾 Pre-Requisistes :

```
node.js >= 18
```

### 📝 License :

Licensed under the [MIT License](./LICENSE).
