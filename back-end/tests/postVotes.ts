import { postVote } from "./factories/recommendationFactory.js";
import { validReccomendationId } from "./factories/contexts.js";

export async function postValidVotesTests() {
  return describe("valid votes route", () => {
    it("should answer with status 200 when trying to post upvote/downvote to a existing recommendation ", async () => {
      const validId = await validReccomendationId();
      const upvoteResponse = await postVote("up", validId);
      const downvoteResponse = await postVote("down", validId);
      expect(upvoteResponse.statusCode).toEqual(200);
      expect(downvoteResponse.statusCode).toEqual(200);
    });
  });
}

export async function postInvalidVotesTests() {
  return describe("invalid votes route", () => {
    it("should answer with status 404 when trying to post upvote/downvote to a not existing recommendation ", async () => {
      const nonexistentId = 1;
      const upvoteResponse = await postVote("up", nonexistentId);
      const downvoteResponse = await postVote("down", nonexistentId);
      expect(upvoteResponse.statusCode).toEqual(404);
      expect(downvoteResponse.statusCode).toEqual(404);
    });
  });
}
