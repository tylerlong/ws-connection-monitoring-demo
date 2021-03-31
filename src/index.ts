import RingCentral from '@rc-ex/core';
import WebSocketExtension from '@rc-ex/ws';

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID!,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET!,
  server: process.env.RINGCENTRAL_SERVER_URL!,
});
(async () => {
  await rc.login({
    username: process.env.RINGCENTRAL_USERNAME!,
    extension: process.env.RINGCENTRAL_EXTENSION!,
    password: process.env.RINGCENTRAL_PASSWORD!,
  });
  const webSocketExtension = new WebSocketExtension({
    restOverWebSocket: true,
    debugMode: true,
    autoRecover: {enabled: false},
  });
  await rc.installExtension(webSocketExtension);
  const ws = webSocketExtension.ws;
  ws.addEventListener('close', () => {
    console.log('close');
  });
  ws.addEventListener('ping', () => {
    console.log('ping', new Date());
  });

  ws.addEventListener('message', event => {
    console.log('message', event);
  });
})();
