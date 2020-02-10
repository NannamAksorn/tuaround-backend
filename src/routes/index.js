import UserController from "../controllers/UserController";

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
};

export default setRoutes;
