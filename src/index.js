import app from "./app.js";
import("./subscriptions/gpsReciever");

const server = app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port " + server.address().port);
});
