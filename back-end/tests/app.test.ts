import supertest from "supertest";

import { prisma } from "../src/database.js";
import app from "../src/app.js";
import postReccomendationsTests from "./postRecommendations.js";
import getRecommendationsTest from "./getRecommendations.js";
import postVotesTests from "./postVotes.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
});

describe("generic tests", () => {
  it("return not found", async () => {
    const response = await supertest(app).get("/not_found");
    expect(response.statusCode).toEqual(404);
  });
});

postReccomendationsTests();
getRecommendationsTest();
postVotesTests();

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  await prisma.$disconnect();
});
