const fixNumbers = (obj) => (
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (typeof value === 'object') {
      return { ...acc, [key]: fixNumbers(value) };
    }
    if (typeof value === 'string' && !Number.isNaN(Number(value))) {
      return { ...acc, [key]: Number(value) };
    }
    return { ...acc, [key]: value };
  }, {})
);
export default fixNumbers;
