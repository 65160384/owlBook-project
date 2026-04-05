module.exports = {
  testEnvironment: "node",

  testMatch: [
    "**/tests/unit/**/*.test.js",
    "**/tests/integration/**/*.test.js"
  ],
   

  testPathIgnorePatterns: ["/node_modules/"],

  collectCoverageFrom: [
    // Focus coverage on backend models/routes and app entry (tests exercise controllers via integration)
    "backend/src/models/**/*.js",
    "backend/src/routes/**/*.js",
    "backend/src/index.js",
    "backend/src/config/database.js",
    "!**/node_modules/**"
  ],

  verbose: true,
};