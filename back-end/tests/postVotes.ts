import { postVote } from "./factories/recommendationFactory.js";
import { validReccomendationId } from "./factories/contexts.js";

async function postValidVotesTests() {
  return describe("valid votes route", () => {
    it("trying to post upvote/downvote to a existing recommendation ", async () => {
      const validId = await validReccomendationId();
      const upvoteResponse = await postVote("up", validId);
      const downvoteResponse = await postVote("down", validId);
      expect(upvoteResponse.statusCode).toBe(200);
      expect(downvoteResponse.statusCode).toBe(200);
    });
  });
}

export function postInvalidVotesTests() {
  return describe("invalid votes route", () => {
    it("trying to post upvote/downvote to a not existing recommendation ", async () => {
      const nonExistentId = 1;
      const upvoteResponse = await postVote("up", nonExistentId);
      const downvoteResponse = await postVote("down", nonExistentId);
      expect(upvoteResponse.statusCode).toBe(404);
      expect(downvoteResponse.statusCode).toBe(404);
    });

    it("trying to pass a not-numeric value as id ", async () => {
      const nonNumericId = "nun numeric value";
      const upvoteResponse = await postVote("up", nonNumericId);
      const downvoteResponse = await postVote("down", nonNumericId);
      expect(upvoteResponse.statusCode).toBe(500);
      expect(downvoteResponse.statusCode).toBe(500);
    });
  });
}

export default function postVotesTests(){
  postValidVotesTests();
  postInvalidVotesTests();
}
