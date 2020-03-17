import app from "./app.js";

if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: "src/configs/.env" });
} else {
  require("dotenv").config({ path: "src/configs/.env.test" });
}


// Init Socket IO server
const server = require("http").createServer(app);
import { connectSocketIo } from "./socket/app";
connectSocketIo(server);

import("./subscriptions/gpsReciever");
import("./kafka/consumer");

server.listen(process.env.PORT || 4435, function() {
  console.log(`running ${process.env.CURRENT_ENV}`);
  console.log("Listening on port " + server.address().port);
});
