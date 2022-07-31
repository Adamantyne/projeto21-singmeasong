import { recommendationService } from "../../src/services/recommendationsService.js";
import {
  returnRecommendationData,
  mockRepository,
} from ".././factories/contexts.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";

export default function downvoteTest() {
  return describe("downvote recommendations", () => {
    it("trying to downvote non-existent recommendation", async () => {
      const invalidId = 1;
      mockRepository("find");
      const result = recommendationService.downvote(invalidId);
      expect(result).rejects.toEqual({
        message: "",
        type: "not_found",
      });
    });

    it("trying to downvote a recommendation", async () => {
      const recommendation = returnRecommendationData();
      mockRepository("find", recommendation);
      mockRepository("updateScore", {
        ...recommendation,
        score: recommendation.score - 1,
      });
      mockRepository("remove");
      await recommendationService.downvote(recommendation.id);
      expect(recommendationRepository.remove).toHaveBeenCalledTimes(0);
      expect(recommendationRepository.updateScore).toHaveBeenCalledTimes(1);
    });

    it("trying to downvote and delete a recommendation", async () => {
      const recommendation = returnRecommendationData();
      mockRepository("find", recommendation);
      mockRepository("updateScore", { ...recommendation, score: -6 });
      mockRepository("remove");
      await recommendationService.downvote(recommendation.id);
      expect(recommendationRepository.remove).toHaveBeenCalledTimes(1);
      expect(recommendationRepository.updateScore).toHaveBeenCalledTimes(1);
    });
  });
}
