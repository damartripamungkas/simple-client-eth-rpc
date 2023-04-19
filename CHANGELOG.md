Change Log
==========

v1.0.2
------
- add callback error on constructor, only support network ws or ipc
example :  

```javascript
const EthRpc = require("simple-client-eth-rpc")
const provider = new EthRpc("ws://localhost:8080", (err) => {
    console.log(`This is error listener with callback: ${err}`)
})
```

v1.0.3
------
- event listener optimization

v1.0.4
------
- update command test

v1.0.5
------
- remove listener onError on func send and sendBatch, you can handle it with callback on constructor. this only effect if you use network ws or ipc
- onError listener is error network not error value request