This service is watching for contract events and sends e-mail notifications.

Several parameters can be tuned on config.js, such as contract address, ABI, the desired events to watch, and the mail server to use.

RPC connection needs to be open before starting the server.

Only the basic info (args) are sent. If whole info needed, the .args part can be removed so the whole result object is sent.