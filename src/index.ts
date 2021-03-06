import RingCentral from '@rc-ex/core';
import WebSocketExtension from '@rc-ex/ws';
import waitFor from 'wait-for-async';

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
    autoRecover: {enabled: true},
  });
  await rc.installExtension(webSocketExtension);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    await waitFor({interval: 30 * 60 * 1000});
    await rc.refresh();
  }
})();
