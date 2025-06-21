import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app";

describe("GET /", () => {
  it("must return 'Wellcome Admin'", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("<h1>Wellcome Admin</h1>");
  });
});