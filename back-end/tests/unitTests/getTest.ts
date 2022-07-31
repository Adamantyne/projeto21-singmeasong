import { recommendationService } from "../../src/services/recommendationsService.js";
import {
  returnRecommendationsData,
  isAllRecommendation,
  mockRepository,
} from "../factories/contexts.js";

export default async function getTest() {
  return describe("get recommendations tests", () => {
    it("trying to get all recommendations", async () => {
      const amount = 5;
      const recommendations = returnRecommendationsData(amount);
      mockRepository("findAll", recommendations);
      const result = await recommendationService.get();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(amount);
      expect(isAllRecommendation(result)).toBe(true);
    });
  });
}
