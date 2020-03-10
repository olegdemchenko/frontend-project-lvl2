import analyzeData from './analyzeData';
import findDifferences from './findDifferences';
import parse from './parsers';
import stringify from './stringify';

const genDiff = (firstPath, secondPath) => {
  const {
    firstFile,
    firstFileType,
    secondFile,
    secondFileType,
  } = analyzeData(firstPath, secondPath);
  const parcedFirstFile = parse(firstFileType, firstFile);
  const parcedSecondFile = parse(secondFileType, secondFile);
  const diff = findDifferences(parcedFirstFile, parcedSecondFile);
  return stringify(diff);
};
export default genDiff;
