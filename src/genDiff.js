import path from 'path';
import fs from 'fs';
import findDifference from './findDifference';
import parse from './parsers';
import format from './formatters';


const genDiff = (firstPath, secondPath, typeFormatting = 'string') => {
  const firstFileData = fs.readFileSync(fs.realpathSync(firstPath), 'utf8');
  const firstFileExtension = path.extname(firstPath);
  const parsedFirstFileData = parse(firstFileExtension, firstFileData);
  const secondFileData = fs.readFileSync(fs.realpathSync(secondPath), 'utf8');
  const secondFileExtension = path.extname(secondPath);
  const parsedSecondFileData = parse(secondFileExtension, secondFileData);
  const diff = findDifference(parsedFirstFileData, parsedSecondFileData);
  return format(typeFormatting, diff);
};
export default genDiff;
