# Smart contract event watcher

This service is watching for contract events and sends e-mail notifications.

Several parameters can be tuned on config.js, such as contract address, ABI, the desired events to watch, and the mail server to use.

RPC connection needs to be open before starting the server.

Only the basic info (event args) are sent. If whole info is needed, the whole result object can be sent.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
npm install
npm start
```