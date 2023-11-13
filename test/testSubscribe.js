const { Provider } = require("..");
const provider = new Provider(
  "ws://localhost:1234",
  {},
  {
    delay: 500,
    autoReconnect: true,
    maxAttempts: Number.MAX_SAFE_INTEGER,
  },
  null
);

(async () => {
  await provider.isReady();

  const buildSubscribe = provider.ethSend.eth_subscribe("newPendingTransactions", true);
  await provider.ethSend.subscribe(buildSubscribe, true, async (result, subsId) => {
    console.log(`INFO: result stream data eth_subscribe:`, result);

    const unsubs = await provider.send(provider.ethSend.eth_unsubscribe(subsId));
    console.log(`INFO: unsubscribe success with subsId: ${unsubs}`);
  });
})();
