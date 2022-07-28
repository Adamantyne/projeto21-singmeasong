import { faker } from "@faker-js/faker";

import { postRecommendation,getAllRecommendations } from "./recommendationFactory.js";

export function validReccomendationData() {
  return {
    name: faker.internet.userName(),
    youtubeLink: `www.youtube.com/${faker.image.animals()}`,
  };
}

export async function validReccomendationId() {
  const recommendationData = validReccomendationData();
  await postRecommendation(recommendationData);
  const response = await getAllRecommendations();
  const validId:number = response.body[0].id;
  return validId;
}
