import "babel-polyfill";
import request from "supertest";
import app from "../app.js";

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
    expect(res.statusCode).toEqual(200);
    expect(res.body.displayname_en).toBe("Nannam Aksorn");
  });
});
