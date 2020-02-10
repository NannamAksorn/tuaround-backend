import axios from "axios";
const TU_API_KEY =
  "ZTU3NDljYmExMDU1ZGE4NWRiM2RkMTE3ZjM2MjZjZjBmNThmYjM4ZGUzZWNjODcwZThiN2MyYjk1MmJlYjI1MQ==";

const tuApiAxios = axios.create({
  baseURL: "https://restapi.tu.ac.th/api/v1/",
  headers: {
    "Content-Type": "application/json",
    "Application-Key": TU_API_KEY
  }
});

export default class UserService {
  static postLogin(UserName, PassWord) {
    const data = { UserName, PassWord };
    return tuApiAxios.post("/auth/Ad/verify", data);
  }

  static getFaculty() {
    return tuApiAxios.get("/std/fac/all");
  }

  static getDepartment() {
    return tuApiAxios.get("/std/dep/all");
  }
}
