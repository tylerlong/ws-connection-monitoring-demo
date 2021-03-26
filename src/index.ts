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
  const webSocketExtension = new WebSocketExtension();
  await rc.installExtension(webSocketExtension);
  const ws = webSocketExtension.ws;
  ws.onopen = () => {
    console.log('Open event');
  };
  ws.onclose = () => {
    console.log('Close event');
  };
  ws.onerror = () => {
    console.log('Error event');
  };
  ws.onmessage = event => {
    console.log('Message', event);
  };
  ws.on('pong', () => {
    console.log('pong');
  });

  setInterval(() => {
    ws.ping();
  }, 3000);
  ws.ping();
})();
