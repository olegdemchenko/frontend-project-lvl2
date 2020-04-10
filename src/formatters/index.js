import convertToTap from './convertToTap';
import convertToPlain from './convertToPlain';

export default (typeFormatting, diff) => {
  switch (typeFormatting) {
    case 'tap':
      return convertToTap(diff);
    case 'plain':
      return convertToPlain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Format ${typeFormatting} is not supported`);
  }
};
