import { postRecommendation } from "./factories/recommendationFactory.js";
import { validReccomendationData } from "./factories/contexts.js";

async function invalidPostReccomendationsTests() {
  return describe("invalid post recommendations route", () => {
    it("trying to post a invalid Recommendation ", async () => {
      const response = await postRecommendation();
      expect(response.statusCode).toBe(422);
    });

    it("trying to post a already existing recommendation name ", async () => {
      const recommendation = validReccomendationData();
      await postRecommendation(recommendation);
      const response = await postRecommendation(recommendation);
      expect(response.statusCode).toBe(409);
    });
  });
}

async function validPostReccomendationsTests() {
  return describe("valid post recommendations route", () => {
    it("trying to post a valid Recommendation ", async () => {
      const recommendation = validReccomendationData();
      const response = await postRecommendation(recommendation);
      expect(response.statusCode).toBe(201);
    });
  });
}

export default function postReccomendationsTests() {
  invalidPostReccomendationsTests(),
  validPostReccomendationsTests()
}
