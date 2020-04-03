import path from 'path';
import fs from 'fs';
import findDifference from './findDifference';
import convert from './converters';
import format from './formatters';


const genDiff = (firstPath, secondPath, typeFormatting = 'tap') => {
  const firstFileData = fs.readFileSync(fs.realpathSync(firstPath), 'utf8');
  const firstFileExtension = path.extname(firstPath);
  const convertedFirstFileData = convert(firstFileExtension, firstFileData);
  const secondFileData = fs.readFileSync(fs.realpathSync(secondPath), 'utf8');
  const secondFileExtension = path.extname(secondPath);
  const convertedSecondFileData = convert(secondFileExtension, secondFileData);
  const diff = findDifference(convertedFirstFileData, convertedSecondFileData);
  return format(typeFormatting, diff);
};
export default genDiff;
