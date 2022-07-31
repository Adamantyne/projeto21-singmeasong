import { recommendationService } from "../../src/services/recommendationsService.js";
import {
  returnRecommendationData,
  mockRepository,
} from "./../factories/contexts.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";

export default function upvoteTest() {
  return describe("upvote recommendations", () => {
    it("trying to upvote non-existent recommendation", async () => {
      const invalidId = 1;
      mockRepository("find");
      const result = recommendationService.upvote(invalidId);
      expect(result).rejects.toEqual({
        message: "",
        type: "not_found",
      });
    });

    it("trying to upvote existent recommendation", async () => {
      const recommendationData = returnRecommendationData();
      mockRepository("find", recommendationData);
      mockRepository("updateScore");
      await recommendationService.upvote(recommendationData.id);
      expect(recommendationRepository.updateScore).toHaveBeenCalledTimes(1);
    });
  });
}
