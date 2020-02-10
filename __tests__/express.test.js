import "babel-polyfill";
import request from "supertest";
import app from "../src/app.js";

describe("get /api", () => {
  it("should return Forbidden", async () => {
    const res = await request(app).get("/api");
    expect(res.statusCode).toEqual(403);
    expect(res.text).toBe("Forbidden");
  });
});

describe("post /api/login", () => {
  it("should return user obj", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ UserName: "5922782974", PassWord: "mnph1234" });
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.displayname_en).toBe("Nannam Aksorn");
  });
});

describe("get /api/faculty", () => {
  it("should return faculty obj", async () => {
    const res = await request(app).get("/api/faculty");
    expect(res.statusCode).toEqual(200);
  });
});

describe("get /api/department", () => {
  it("should return department obj", async () => {
    const res = await request(app).get("/api/department");
    expect(res.statusCode).toEqual(200);
  });
});

describe("get /api/ip", () => {
  it("should return client ip address", async () => {
    const res = await request(app).get("/api/ip");
    expect(res.statusCode).toEqual(200);
    expect(res.body.ip).toBe("::ffff:127.0.0.1");
  });
});
