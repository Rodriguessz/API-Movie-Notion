module.exports = {
  bail: true,
  coverageProvider: 'v8',


  //Where jest must seatch for test files.
  //Regex - <Root dir>/src/**/*.spec.js
  //Explanation - From root dir/ on source folder/ anywhere on source folder/ whatever the name.scpec.js
  testMatch: ["<rootDir>/src/**/*.spec.js"]


}