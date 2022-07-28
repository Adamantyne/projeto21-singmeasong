import { getAllRecommendations } from "./factories/recommendationFactory.js";

export async function getAllRecommendationsTests() {
  return describe("get recommendations router", () => {
    it("should answer with status 200 when trying to get recommendations", async () => {
      const response = await getAllRecommendations();
      expect(response.statusCode).toEqual(200);
      expect(Array.isArray(response.body)).toEqual(true);
    });
  });
}
