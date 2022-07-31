import { recommendationService } from "../../src/services/recommendationsService.js";
import {
  returnRecommendationsData,
  isRecommendation,
  mockRepository,
  mockMath,
} from ".././factories/contexts.js";

export default function getRandomTest() {
  return describe("get random recommendation tests", () => {
    it("trying to get non-existing random recommendation", async () => {
      mockMath("random", 1);
      mockRepository("findAll", []);
      mockRepository("findAll", []);
      const result = recommendationService.getRandom();
      expect(result).rejects.toEqual({
        message: "",
        type: "not_found",
      });
    });

    it("trying to get a 'gt' random recommendation", async () => {
      const recommendations = returnRecommendationsData(30);
      const greaterScore = recommendations.filter((recommendation) => {
        return recommendation.score > 10;
      });
      mockMath("random", 0.6);
      mockRepository("findAll", greaterScore);
      mockMath("floor", greaterScore[0].id);
      const result = await recommendationService.getRandom();
      expect(isRecommendation(result)).toBe(true);
      expect(result.score > 10).toBe(true);
    });
  });
}
