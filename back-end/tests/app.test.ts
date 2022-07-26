import supertest from "supertest";

import app from "../src/app.js";
import { prisma } from "../src/database.js";
import {
  postRecommendation,
  validReccomendationData,
} from "./factories/recommendationFactory.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
});

describe("generic tests", () => {
  it("return not found", async () => {
    const response = await supertest(app).get("/not_found");
    expect(response.statusCode).toEqual(404);
  });
});

describe("invalid post routers", () => {
  it("should answer with status 422 when trying to post a invalid Recommendation ", async () => {
    const response = await postRecommendation();
    expect(response.statusCode).toEqual(422);
  });
});

describe("valid post routers", () => {
  const recommendation =
    it("should answer with status 201 when trying to post a valid Recommendation ", async () => {
      const recommendation = validReccomendationData();
      const response = await postRecommendation(recommendation);
      console.log(response.body);
      expect(response.statusCode).toEqual(201);
    });
});

afterAll(async () => {
  await prisma.$executeRaw`DROP TABLE IF EXISTS recommendations;`;
  await prisma.$disconnect();
});
