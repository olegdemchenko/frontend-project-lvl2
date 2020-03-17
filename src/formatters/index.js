import stringify from './stringify';
import plain from './plain';


export default (typeFormatting, obj) => {
  switch (typeFormatting) {
    case 'stringify':
      return stringify(obj);
    case 'plain':
      return plain(obj);
    case 'json':
      return JSON.stringify(obj);
    default:
      throw new Error('This format is not supported');
  }
};
