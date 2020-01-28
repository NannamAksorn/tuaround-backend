import app from "./app.js";
const server = app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port " + server.address().port);
});
