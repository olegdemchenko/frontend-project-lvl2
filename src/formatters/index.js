import convertToString from './convertToString';
import convertToPlainString from './convertToPlainString';

export default (typeFormatting, diff) => {
  switch (typeFormatting) {
    case 'string':
      return convertToString(diff);
    case 'plain':
      return convertToPlainString(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Format ${typeFormatting} is not supported`);
  }
};
