import express from "express";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import setRoutes from "./routes/index.js";

const isProduction = process.env.NODE_ENV === "PRODUCTION";

// Cors Option
const origin = {
  origin: isProduction ? "http://127.0.0.1" : "*"
};
// Limiter Option
export const limiter = (sec, maxReqs) =>
  rateLimit({
    windowMs: sec * 1000,
    max: maxReqs
  });

// Express
const app = express();

// Plugins
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(cors(origin));
// app.use(limiter(60, 100));

// Public
app.use(express.static("public"));

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
