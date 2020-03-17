import analyzeData from './analyzeData';
import findDifferences from './findDifferences';
import parse from './parsers';
import format from './formatters';

const genDiff = (firstPath, secondPath, typeFormatting = 'stringify') => {
  const {
    firstFile,
    firstFileType,
    secondFile,
    secondFileType,
  } = analyzeData(firstPath, secondPath);
  const parcedFirstFile = parse(firstFileType, firstFile);
  const parcedSecondFile = parse(secondFileType, secondFile);
  const diff = findDifferences(parcedFirstFile, parcedSecondFile);
  return format(typeFormatting, diff);
};
export default genDiff;
