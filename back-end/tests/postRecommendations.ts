import { postRecommendation } from "./factories/recommendationFactory.js";
import { validReccomendationData } from "./factories/contexts.js";

export async function invalidPostReccomendationsTests() {
  return describe("invalid post recommendations route", () => {
    it("should answer with status 422 when trying to post a invalid Recommendation ", async () => {
      const response = await postRecommendation();
      expect(response.statusCode).toEqual(422);
    });

    it("should answer with status 409 when trying to post a already existing recommendation name ", async () => {
      const recommendation = validReccomendationData();
      await postRecommendation(recommendation);
      const response = await postRecommendation(recommendation);
      expect(response.statusCode).toEqual(409);
    });
  });
}

export async function validPostReccomendationsTests() {
  return describe("valid post recommendations route", () => {
    it("should answer with status 201 when trying to post a valid Recommendation ", async () => {
      const recommendation = validReccomendationData();
      const response = await postRecommendation(recommendation);
      console.log(response.body);
      expect(response.statusCode).toEqual(201);
    });
  });
}
