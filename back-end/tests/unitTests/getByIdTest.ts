import { recommendationService } from "../../src/services/recommendationsService.js";
import {
  returnRecommendationData,
  mockRepository,
} from "./../factories/contexts.js";

export default function getByIdTest() {
  return describe("get recommendations by id tests", () => {
    it("trying to get non-existent recommendation", async () => {
      const invalidId = 1;
      mockRepository("find");
      const result = recommendationService.getById(invalidId);
      expect(result).rejects.toEqual({
        message: "",
        type: "not_found",
      });
    });

    it("trying to get existent recommendation", async () => {
      const recommendationData = returnRecommendationData();
      const validId = recommendationData.id;
      mockRepository("find", recommendationData);
      const result = await recommendationService.getById(validId);
      expect(result).toEqual(recommendationData);
    });
  });
}
