import supertest from "supertest";
import { Recommendation } from "@prisma/client";

import app from "../../src/app.js";

type PostRecommendationMask = Omit<Recommendation, "id" | "score">;

export async function postRecommendation(data?: PostRecommendationMask) {
  return supertest(app).post("/recommendations").send(data);
}

export async function getLastTenRecommendations() {
  return supertest(app).get("/recommendations");
}

export async function getRecommendationById(id:number|string) {
  return supertest(app).get(`/recommendations/${id}`);
}

export async function getRandomRecommendation() {
  return supertest(app).get(`/recommendations/random`);
}

export async function getTopRecommendations(amount:number|string) {
  return supertest(app).get(`/recommendations/top/${amount}`);
}

export async function postVote(
  string: "up" | "down",
  recommendationId: number|string
) {
  if (string === "up") {
    return supertest(app).post(`/recommendations/${recommendationId}/upvote`);
  }else if(string === "down"){
    return supertest(app).post(`/recommendations/${recommendationId}/downvote`);
  }
}
