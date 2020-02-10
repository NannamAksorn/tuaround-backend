import app from "./app.js";

import("./subscriptions/gpsReciever");

if (process.env.NODE_ENV === "production") {
  require("dotenv").config({ path: "src/configs/.env" });
} else {
  require("dotenv").config({ path: "src/configs/.env.test" });
}

const server = app.listen(process.env.PORT || 3000, function() {
  console.log(`running ${process.env.CURRENT_ENV}`);
  console.log("Listening on port " + server.address().port);
});
