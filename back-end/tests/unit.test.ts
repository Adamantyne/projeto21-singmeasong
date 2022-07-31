import { jest } from "@jest/globals";

import getTest from "./unitTests/getTest.js";
import insertTest from "./unitTests/insertTest.js"
import getByIdTest from "./unitTests/getByIdTest.js";
import upvoteTest from "./unitTests/upvoteTest.js";
import downvoteTest from "./unitTests/downvoteTest.js";
import getTopTest from "./unitTests/getTopTest.js";
import getRandomTest from "./unitTests/getRandomTest.js";

beforeEach(async () => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

getTest();
insertTest();
getByIdTest();
upvoteTest();
downvoteTest();
getTopTest();
getRandomTest();
