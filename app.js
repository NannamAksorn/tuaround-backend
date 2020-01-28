import express from "express";
import setRoutes from "./routes.js";

const isProduction = process.env.NODE_ENV === "PRODUCTION";
const app = express();
app.use(express.json());
// Route
setRoutes(app);
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

/// error handlers
//
// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
} else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: {}
      }
    });
  });
}

export default app;
