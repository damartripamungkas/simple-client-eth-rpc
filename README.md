<h1 align="center">SIMPLE-CLIENT-ETH-RPC</h1>

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

### 📖 Description
This very light package was created for those of you who want to interact directly with the EVM Ethereum blockchain according to the documentation.

### 💻 Step to install
```
npm install simple-client-eth-rpc
```

### ✏️ Example 
```javascript
const { Provider, EthNameSpace } = require("simple-client-eth-rpc")
const provider = new Provider("https://bscrpc.com")
const ethName = new EthNameSpace()

(async () => {
    await provider.isReady() // must be run before execute any function

    // send 1 request
    const getChainId = await provider.send(ethName.eth_chainId())
    console.log(`INFO chainid is: ${getChainId}`) // 0

    // send multiple request
    const getBlockNumberAndChainId = await provider.sendBatch(
        ethName.eth_blockNumber(),
        ethName.eth_chainId()
    )
    console.log(`INFO blockNumber and chainId is: ${getBlockNumberAndChainId}`) // [ 0, 0 ]

    // subscribe spesific event blockchain
    provider.subscribe(ethName.eth_subscribe("newPendingTransactions"), (result) => {
        console.log("result pending transaction:", result)
    })
})()
```

### 🧾 Pre-Requisistes
```
node.js
```
 
### 📝 License
Licensed under the [MIT License](./LICENSE).