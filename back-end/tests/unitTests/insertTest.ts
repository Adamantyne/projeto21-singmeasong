import { recommendationService } from "../../src/services/recommendationsService.js";
import {
  returnRecommendationData,
  mockRepository,
} from "./../factories/contexts.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";

export default function insertTest() {
  return describe("insert recommendation tests", () => {
    it("trying to insert a duplicated recommendation", async () => {
      const recommendationData = returnRecommendationData();
      mockRepository("findByName", recommendationData);
      const result = recommendationService.insert(recommendationData);
      expect(result).rejects.toEqual({
        message: "Recommendations names must be unique",
        type: "conflict",
      });
    });

    it("trying to insert a valid recommendation", async () => {
      const recommendationData = returnRecommendationData();
      mockRepository("findByName");
      mockRepository("create");
      await recommendationService.insert(recommendationData);
      expect(recommendationRepository.create).toHaveBeenCalledTimes(1);
    });
  });
}
