const fs = require('fs');

console.log('before');
fs.readFile('./testfile.js', 'utf8', (err, data) => console.log(data));
console.log('after');
console.log('after');
console.log('after');
console.log('after');
console.log('after');
console.log('after');
console.log('after');
