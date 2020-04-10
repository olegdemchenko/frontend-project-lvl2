import path from 'path';
import fs from 'fs';
import findDifference from './findDifference';
import convert from './converters';
import format from './formatters';


const genDiff = (firstPath, secondPath, typeFormatting = 'tap') => {
  const firstFileData = fs.readFileSync(fs.realpathSync(firstPath), 'utf8');
  const firstFileFormat = path.extname(firstPath).slice(1);
  const convertedFirstFileData = convert(firstFileFormat, firstFileData);
  const secondFileData = fs.readFileSync(fs.realpathSync(secondPath), 'utf8');
  const secondFileFormat = path.extname(secondPath).slice(1);
  const convertedSecondFileData = convert(secondFileFormat, secondFileData);
  const diff = findDifference(convertedFirstFileData, convertedSecondFileData);
  return format(typeFormatting, diff);
};
export default genDiff;
