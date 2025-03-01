export default {
    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: true,

    // The directory where Jest should output its coverage files
    coverageDirectory: "coverage",

    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",

    // A list of paths to directories that Jest should use to search for tests
    testMatch: ["**/tests/**/*.test.js", "**/tests/**/*.test.mjs"],

    // The test environment that will be used for testing
    testEnvironment: "node",

    // Transform files with babel-jest
    transform: {
        "^.+\\.(js|mjs)$": "babel-jest",
    },

    // Automatically clear mock calls, instances, contexts and results before every test
    clearMocks: true,

    // Indicates whether each individual test should be reported during the run
    verbose: true,

    // Needed for ES modules support
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
}; 