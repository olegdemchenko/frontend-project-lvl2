import findDifference from './findDifference';
import parse from './parsers';
import format from './formatters';

const fs = require('fs');
const path = require('path');

const genDiff = (firstPath, secondPath, typeFormatting = 'stringify') => {
  const firstFile = fs.readFileSync(fs.realpathSync(firstPath), 'utf8');
  const firstFileType = path.extname(firstPath);
  const parcedFirstFile = parse(firstFileType, firstFile);
  const secondFile = fs.readFileSync(fs.realpathSync(secondPath), 'utf8');
  const secondFileType = path.extname(secondPath);
  const parcedSecondFile = parse(secondFileType, secondFile);
  const diff = findDifference(parcedFirstFile, parcedSecondFile);
  return format(typeFormatting, diff);
};
export default genDiff;
