import {
  getLastTenRecommendations,
  getRecommendationById,
  getTopRecommendations,
  getRandomRecommendation,
} from "./factories/recommendationFactory.js";
import {
  createRecomendations,
  validReccomendationId,
  isRecommendation,
  createRecomendationsAndUpvote,
} from "./factories/contexts.js";

async function getLastTenRecommendationsTests() {
  return describe("get all recommendations", () => {
    it("trying to get recommendations", async () => {
      await createRecomendations(20);
      const response = await getLastTenRecommendations();
      const recommendations = response.body;
      expect(response.statusCode).toBe(200);
      if (recommendations.length > 0) {
        expect(isRecommendation(recommendations[0])).toBe(true);
        expect(recommendations.length <= 10).toBe(true);
      }
      expect(Array.isArray(recommendations)).toBe(true);
    });
  });
}

async function getValidRecommendationByIdTests() {
  return describe("get valid recommendation by id", () => {
    it("trying to get a valid recommendation data", async () => {
      const validId = await validReccomendationId();
      const response = await getRecommendationById(validId);
      const recommendation = response.body;
      expect(isRecommendation(recommendation)).toBe(true);
      expect(response.statusCode).toBe(200);
    });
  });
}

async function getInvalidRecommendationByIdTests() {
  return describe("get invalid recommendation by id", () => {
    it("trying to get a non-existing recommendation", async () => {
      const nonExistingId = 1;
      const response = await getRecommendationById(nonExistingId);
      expect(response.statusCode).toBe(404);
    });

    it("trying to get recommendation with non-numeric id value", async () => {
      const nonNumericId = "non numeric value";
      const response = await getRecommendationById(nonNumericId);
      expect(response.statusCode).toBe(500);
    });
  });
}

async function getInvalidRandomRecommendationTest() {
  return describe("get invalid Random recommendation", () => {
    it("trying to get non-existent recommendation", async () => {
      const response = await getRandomRecommendation();
      expect(response.statusCode).toBe(404);
    });
  });
}

async function getValidRandomRecommendationTest() {
  return describe("get valid Random recommendation", () => {
    it("trying to get a valid recommendation", async () => {
      const amount = 5;
      await createRecomendations(amount);
      const response = await getRandomRecommendation();
      expect(response.statusCode).toBe(200);
    });
  });
}

async function getInvalidTopRecommendationsTest() {
  return describe("get invalid top recommendation", () => {
    it("trying to get recommendations with non-numeric amount value", async () => {
      const nonNumericAmount = "non numeric value";
      const response = await getTopRecommendations(nonNumericAmount);
      expect(response.statusCode).toBe(500);
    });
  });
}

async function getValidTopRecommendationsTest() {
  return describe("get valid top recommendations", () => {
    it("trying to get top recommendation", async () => {
      const amount = 5;
      await createRecomendationsAndUpvote(amount);
      const response = await getTopRecommendations(amount);
      const recommendations = response.body;
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(recommendations)).toBe(true);
      if (recommendations.length > 0) {
        expect(isRecommendation(recommendations[0])).toBe(true);
        expect(recommendations[0].score).toBe(amount);
        expect(recommendations.length <= amount).toBe(true);
      }
    });
  });
}

export default function getRecommendationsTest() {
  getLastTenRecommendationsTests();
  getInvalidRecommendationByIdTests();
  getValidRecommendationByIdTests();
  getInvalidTopRecommendationsTest();
  getValidTopRecommendationsTest();
  getInvalidRandomRecommendationTest();
  getValidRandomRecommendationTest();
}
