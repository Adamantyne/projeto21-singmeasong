import { faker } from "@faker-js/faker";
import { Recommendation } from "@prisma/client";
import { prisma } from "../../src/database.js";
import { jest } from "@jest/globals";

import {
  postRecommendation,
  getLastTenRecommendations,
} from "./recommendationFactory.js";
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js";

export function validRecommendationData() {
  return {
    name: faker.internet.userName(),
    youtubeLink: `www.youtube.com/${faker.image.animals()}`,
  };
}

export function returnRecommendationsData(amount: number) {
  const fakeRecommendations = [];
  for (let i = 0; i < amount; i++) {
    fakeRecommendations.push({
      id: i + 1,
      name: faker.internet.userName(),
      youtubeLink: `www.youtube.com/${faker.image.animals()}`,
      score: i,
    });
  }
  return fakeRecommendations;
}

export function returnRecommendationData() {
  const fakeRecommendations = {
    id: 1,
    name: faker.internet.userName(),
    youtubeLink: `www.youtube.com/${faker.image.animals()}`,
    score: 0,
  };
  return fakeRecommendations;
}

export async function createRecommendations(amount: number) {
  for (let i = 0; i <= amount; i++) {
    const recommendationData = validRecommendationData();
    await prisma.recommendation.create({ data: recommendationData });
  }
}

export async function createRecommendationsAndUpvote(amount: number) {
  for (let i = 0; i <= amount; i++) {
    const recommendationData = validRecommendationData();
    await prisma.recommendation.create({ data: recommendationData });
  }
  const recommendations = await prisma.recommendation.findMany({});
  for (let j = 0; j < recommendations.length; j++) {
    await prisma.recommendation.update({
      where: {
        id: recommendations[j].id,
      },
      data: {
        score: j,
      },
    });
  }
}

export async function validRecommendationId() {
  const recommendationData = validRecommendationData();
  await postRecommendation(recommendationData);
  const response = await getLastTenRecommendations();
  const validId: number = response.body[0].id;
  return validId;
}

export function isRecommendation(object: any): object is Recommendation {
  return (
    Object.prototype.hasOwnProperty.call(object, "id") &&
    Object.prototype.hasOwnProperty.call(object, "name") &&
    Object.prototype.hasOwnProperty.call(object, "youtubeLink") &&
    Object.prototype.hasOwnProperty.call(object, "score")
  );
}

export function isAllRecommendation(recommendations: any[]) {
  for (let i = 0; i < recommendations.length; i++) {
    if (isRecommendation(recommendations[i]) === false) return false;
  }
  return true;
}

export function checkTop(recommendations: Recommendation[]) {
  for (let i = 0; i < recommendations.length; i++) {
    for (let j = i + 1; j < recommendations.length; j++) {
      if (recommendations[j].score > recommendations[i].score) {
        return false;
      }
    }
  }
  return true;
}

export function mockRepository(
  repositoryFunction:
    | "find"
    | "create"
    | "findAll"
    | "getAmountByScore"
    | "findByName"
    | "updateScore"
    | "getAmountByScore"
    | "remove",
  returnValue?: any
) {
  return jest
    .spyOn(recommendationRepository, repositoryFunction)
    .mockImplementationOnce((): any => {
      return returnValue;
    });
}

export function mockMath(mathFunction: any, returnValue?: any) {
  return jest
    .spyOn(Math, mathFunction)
    .mockImplementationOnce((): any => {
      return returnValue;
    });
}
