import supertest from "supertest";

import { prisma } from "../src/database.js";
import app from "../src/app.js";
import {
  invalidPostReccomendationsTests,
  validPostReccomendationsTests,
} from "./postRecommendations.js";
import { getAllRecommendationsTests } from "./getRecommendations.js";
import { postValidVotesTests, postInvalidVotesTests } from "./postVotes.js";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
});

describe("generic tests", () => {
  it("return not found", async () => {
    const response = await supertest(app).get("/not_found");
    expect(response.statusCode).toEqual(404);
  });
});

invalidPostReccomendationsTests();
validPostReccomendationsTests();
getAllRecommendationsTests();
postValidVotesTests();
postInvalidVotesTests();

afterAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  await prisma.$disconnect();
});
