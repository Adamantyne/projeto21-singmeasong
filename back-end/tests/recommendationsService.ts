import { jest } from "@jest/globals";

import { recommendationService } from "../src/services/recommendationsService.js";
import { fakeReturnReccomendationsData } from "./factories/contexts.js";

export function getTest() {
  return describe("get recommendations tests", () => {
    it("return not found", async () => {
      const mock = jest
        .spyOn(recommendationService, "get")
        .mockImplementationOnce(async () => {
          return fakeReturnReccomendationsData();
        });
      const recommendations = mock.mock.calls;
      expect(Array.isArray(recommendations)).toBe(true);
    });
  });
}

export function insertTest() {
  return describe(" ", () => {
  });
}
