
const stringify = (diff) => (
  Object.entries(diff).reduce((acc, [key, value]) => {
    if (typeof value === 'object') {
      const newAcc = stringify(value);
      const newStr = `${key}: { ${newAcc.join(', ')} }`;
      acc.push(newStr);
      return acc;
    }
    acc.push(`${key}: ${value}`);
    return acc;
  }, [])
);
export default (data) => stringify(data).join(', ');
