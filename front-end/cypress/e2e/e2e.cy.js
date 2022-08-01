/// <reference types="cypress" />

import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
dotenv.config();

const URL = "http://localhost:3000";

describe("navegation test", () => {
  const standardRecommendation = {
    name: faker.name.findName(),
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
  }

  it("Should browse the pages", () => {

    
    cy.intercept("GET", "/recommendations").as("getRecommendations");
    cy.visit(`${URL}/`);
    cy.wait("@getRecommendations");

    cy.get(".name").type(standardRecommendation.name);
    cy.get(".link").type(standardRecommendation.youtubeLink);

    cy.intercept("POST", "/recommendations").as("postRecommendations");
    cy.get(".post").click();
    cy.wait("@postRecommendations");

    cy.intercept("GET", "/recommendations").as("getRecommendations");
    cy.wait("@getRecommendations");

    cy.get(".recommendation").should("exist");

    cy.intercept("GET", "/recommendations/random").as("random");
    cy.get(".random").click();
    cy.url().should("equal", `${URL}/random`);
    cy.wait("@random");

    cy.intercept("GET", "/recommendations/top/10").as("top");
    cy.get(".top").click();
    cy.url().should("equal", `${URL}/top`);
    cy.wait("@top");

    cy.visit(`${URL}/`);
    cy.get(".home").click();
    cy.intercept("GET", "/recommendations").as("getRecommendations");
    cy.wait("@getRecommendations");
    cy.get(".recommendation").should("exist");

    cy.intercept("POST", "/recommendations/1/upvote").as("upvoteRecommendations");
    cy.get(".upvote").click({ multiple: true });
    cy.wait("@upvoteRecommendations");

    cy.intercept("POST", "/recommendations/1/downvote").as("downvoteRecommendations");
    cy.get(".downvote").click({ multiple: true });
    cy.wait("@downvoteRecommendations");
  });
});