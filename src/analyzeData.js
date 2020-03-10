const fs = require('fs');
const path = require('path');

const analyzeData = (firstPath, secondPath) => {
  const firstFile = fs.readFileSync(fs.realpathSync(firstPath), 'utf8');
  const secondFile = fs.readFileSync(fs.realpathSync(secondPath), 'utf8');
  const firstFileType = path.extname(firstPath);
  const secondFileType = path.extname(secondPath);
  return {
    firstFile,
    firstFileType,
    secondFile,
    secondFileType,
  };
};

export default analyzeData;
