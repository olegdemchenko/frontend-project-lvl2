import stringify from './stringify';
import plain from './plain';


export default (typeFormatting, diff) => {
  switch (typeFormatting) {
    case 'stringify':
      return stringify(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`Format ${typeFormatting} is not supported`);
  }
};
