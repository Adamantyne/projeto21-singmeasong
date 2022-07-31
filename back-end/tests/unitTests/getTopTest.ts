import { recommendationService } from "../../src/services/recommendationsService.js";
import {
  returnRecommendationsData,
  isAllRecommendation,
  mockRepository,
} from ".././factories/contexts.js";

export default function getTopTest() {
  return describe("get top recommendations tests", () => {
    it("trying to get top recommendations", async () => {
      const amount = 10;
      const recommendations = returnRecommendationsData(amount);
      mockRepository("getAmountByScore", recommendations);
      const result = await recommendationService.getTop(amount);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(amount);
      expect(isAllRecommendation(result)).toBe(true);
    });
  });
}
