import supertest from "supertest";
import { Recommendation } from "@prisma/client";

import app from "../../src/app.js";

type PostRecommendationMask = Omit<Recommendation, "id" | "score">;

export async function postRecommendation(data?: PostRecommendationMask) {
  return supertest(app).post("/recommendations").send(data);
}

export async function getAllRecommendations() {
  return supertest(app).get("/recommendations");
}

export async function postVote(
  string: "up" | "down",
  recommendationId: number
) {
  if (string === "up") {
    return supertest(app).post(`/recommendations/${recommendationId}/upvote`);
  }else if(string === "down"){
    return supertest(app).post(`/recommendations/${recommendationId}/downvote`);
  }
}
