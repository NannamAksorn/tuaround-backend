import axios from "axios";

const TU_API_KEY =
  "ZTU3NDljYmExMDU1ZGE4NWRiM2RkMTE3ZjM2MjZjZjBmNThmYjM4ZGUzZWNjODcwZThiN2MyYjk1MmJlYjI1MQ==";

const setRoutes = server => {
  server.get(`/api`, (req, res) => {
    return res.status(403).send("Forbidden");
  });
  //server.post(`/api/login`, (req, res, next) => {
  server.get(`/api/login`, (req, res, next) => {
    //    const { UserName, PassWord } = req.body;
    const { UserName, PassWord } = {
      UserName: "5922782974",
      PassWord: "mnph1234"
    };
    console.log(PassWord);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Application-Key": TU_API_KEY
      }
    };
    const data = { UserName, PassWord };
    return axios
      .post("https://restapi.tu.ac.th/api/v1/auth/Ad/verify", data, config)
      .then(_res => res.status(200).json(_res.data))
      .catch(err => next(err));
  });
};

export default setRoutes;
