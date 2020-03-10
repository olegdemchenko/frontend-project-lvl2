const stringify = (obj) => {
  const iter = (arg) => (
    Object.entries(arg).reduce((acc, [key, value]) => {
      if (typeof value === 'object') {
        return `${acc} ${key}: {${iter(value)} }`;
      }
      return `${acc} ${key}: ${value}`;
    }, '')
  );
  return `{${iter(obj)} }`;
};
export default stringify;
