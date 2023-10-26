import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";
import { logger } from "../src/application/logging.js";
describe("POST /api/users", function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "muhammadisa226",
      },
    });
  });
  it("should can register new User", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "muhammadisa226",
      password: "rahasia",
      name: "Muhammad Isa",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("muhammadisa226");
    expect(result.body.data.name).toBe("Muhammad Isa");
    expect(result.body.data.password).toBeUndefined();
    result = await supertest(web).post("/api/users").send({
      username: "muhammadisa226",
      password: "rahasia",
      name: "Muhammad Isa",
    });
    logger.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
