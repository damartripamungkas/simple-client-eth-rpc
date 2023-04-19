<h1 align="center">SIMPLE-ETH-RPC</h1>

<h3 align="center">
    This script was created to prioritize speed over functionality, perfect for use with websocket and ipc networks. this script works as CLIENT not SERVER
</h3>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/damartripamungkas/simple-eth-rpc?color=04D361&labelColor=000000">
  
  <a href="#">
    <img alt="Made by" src="https://img.shields.io/static/v1?label=made%20by&message=damartripamungkas&color=04D361&labelColor=000000">
  </a>
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/damartripamungkas/simple-eth-rpc?color=04D361&labelColor=000000">
  
  <a href="#">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/damartripamungkas/simple-eth-rpc?color=04D361&labelColor=000000">
  </a>
</p>

---

## 💻 Step to install
```
npm install simple-eth-rpc
```

## ✏️ Example 
```javascript
const EthRpc = require('simple-eth-rpc');
const provider = new EthRpc("https://bscrpc.com");

(async() => {
    // send 1 request
    await provider.isReady(); // must be call before send request
    const getChainId = await provider.send("eth_chainId", []);
    console.log(`INFO chainid is: ${BigInt(getChainId.result)}`);

    // send multiple request
    const getBlockNumberAndChainId = await provider.sendBatch([
        { method: "eth_blockNumber", params: [] },
        { method: "eth_chainId", params: [] }
    ]);
    const onlyResult = getBlockNumberAndChainId.map(it => BigInt(it.result));
    console.log(`INFO blockNumber and chainId is: ${onlyResult}`);
})();
```

## 🧾 Pre-Requisistes
```
node.js
```
 
## 📝 License
Licensed under the [MIT License](./LICENSE).