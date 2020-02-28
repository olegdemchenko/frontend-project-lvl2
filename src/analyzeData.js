import determineDifference from './determineDifference';

const fs = require('fs');

const analyzeData = (firstPath, secondPath) => {
  const realFirstPath = fs.realpathSync(firstPath);
  const realSecondPath = fs.realpathSync(secondPath);
  const firstFileData = JSON.parse(fs.readFileSync(realFirstPath).toString());
  const secondFileData = JSON.parse(fs.readFileSync(realSecondPath).toString());
  console.log(determineDifference(firstFileData, secondFileData));
};
export default analyzeData;
