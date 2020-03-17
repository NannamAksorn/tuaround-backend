import UserController from "../controllers/UserController";
import StopController from "../controllers/StopController";
import FacebookController from "../controllers/FacebookController";

const setRoutes = server => {
  server.get(`/api`, (req, res) => {
    return res.status(403).send("Forbidden");
  });

  server.post(`/api/login`, UserController.postLogin);
  server.get(`/api/faculty`, UserController.getFaculty);
  server.get(`/api/department`, UserController.getDepartment);

  server.get(`/api/ip`, (req, res) => {
    const ip = req.headers["x-forwareded-for"] || req.connection.remoteAddress;
    return res.status(200).json({ ip });
  });

  // facebook
  server.get(["/facebook", "/instagram"], FacebookController.getSubscribe);
  server.post(["/facebook", "/instagram"], FacebookController.callbackWebhook);
  server.get("/facebook/feed", FacebookController.getFeed);

  // stops
  server.post(`/api/stops`, StopController.postStops);
  server.get(`/api/stops`, StopController.getStops);
  server.get("/api/stops/:sid/eta", StopController.getStopETA);
};

export default setRoutes;
