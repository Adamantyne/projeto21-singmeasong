import supertest from "supertest";
import { Recommendation } from "@prisma/client";
import { faker } from "@faker-js/faker";

import { prisma } from "../../src/database.js";
import app from "../../src/app.js";

type PostRecommendationMask = Omit<Recommendation, "id" | "score">;

export async function postRecommendation(data?: PostRecommendationMask) {
  return supertest(app).post("/recommendations").send(data);
}

export function validReccomendationData() {
  return {
    name: faker.internet.userName(),
    youtubeLink: `www.youtube.com/${faker.image.animals()}`,
  };
}
