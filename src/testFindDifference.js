import _ from 'lodash';

const comparatorObj = ([beforeKey, beforeValue], [afterKey, afterValue]) => {
  const result = beforeKey === afterKey && _.isObject(beforeValue) && _.isObject(afterValue);
  return result;
};
const comparatorSame = ([beforeKey, beforeValue], [afterKey, afterValue]) => {
  const result = beforeKey === afterKey && beforeValue === afterValue;
  return result;
};
const comparatorDifference = ([beforeKey, beforeValue], [afterKey, afterValue]) => {
  const result = beforeKey === afterKey && beforeValue !== afterValue;
  return result;
};
const findDifference = (before, after) => {
  const beforeEntries = Object.entries(before);
  const afterEntries = Object.entries(after);
  const intersectionsWithComplexValue = _.intersectionWith(beforeEntries, afterEntries, comparatorObj);
  const intersectionsWithSameValue = _.intersectionWith(beforeEntries, afterEntries, comparatorSame);
  const intersectionWithDifferenceBefore = _.intersectionWith(beforeEntries, afterEntries, comparatorDifference);
  const intersectionWithDifferenceAfter = _.intersectionWith(afterEntries, beforeEntries, comparatorDifference);
  console.log(_.unionWith(beforeEntries, afterEntries, comparatorObj));
};
export default findDifference;
