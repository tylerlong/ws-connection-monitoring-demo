# ws-connection-monitoring-demo


## Summary

It seems that JS in browser cannot access WS frame level events at all.
You cannot ping server in browser. And if server pings you, your code won't get the ping event at all.

However, this library can both send and receive ping: https://www.npmjs.com/package/ws
