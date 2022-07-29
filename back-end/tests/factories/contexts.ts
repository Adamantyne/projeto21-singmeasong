import { faker } from "@faker-js/faker";
import { Recommendation } from "@prisma/client";
import { prisma } from "../../src/database.js";

import {
  postRecommendation,
  getLastTenRecommendations,
  postVote,
} from "./recommendationFactory.js";

export function validReccomendationData() {
  return {
    name: faker.internet.userName(),
    youtubeLink: `www.youtube.com/${faker.image.animals()}`,
  };
}

export function fakeReturnReccomendationsData() {
  return [
    {
      id: 1,
      name: faker.internet.userName(),
      youtubeLink: `www.youtube.com/${faker.image.animals()}`,
      score: 3,
    },
  ];
}

export async function createRecomendations(amount: number) {
  for (let i = 0; i <= amount; i++) {
    const recommendationData = validReccomendationData();
    await prisma.recommendation.create({ data: recommendationData });
  }
}

export async function createRecomendationsAndUpvote(amount: number) {
  for (let i = 0; i <= amount; i++) {
    const recommendationData = validReccomendationData();
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

export async function validReccomendationId() {
  const recommendationData = validReccomendationData();
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
