import { recommendationService } from "../src/services/recommendationsService.js";

export function getTest() {
  return describe("generic tests", () => {
    it("return not found", async () => {
      const recommendations = await recommendationService.get();
      console.log(recommendations);
      expect(Array.isArray(recommendations)).toBe(true);
    });
  });
}
