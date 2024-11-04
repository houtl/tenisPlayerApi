module.exports = {
  testMatch: ["**/__tests__/**/*spec.js", "**/?(*.)+(spec|test).js"],
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  collectCoverageFrom: [
    "build/**/*.js",
    "!**/node_modules",
    "!**/__tests__/**",
    "!**/__mocks__/**",
  ],
  preset: "@shelf/jest-mongodb",
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 60,
    },
  },
};
