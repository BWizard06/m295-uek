const file = process.argv[2];
let lines = 0;
// how many newlines in the file, same as cat file | wc -l
const fs = require('fs');
fs.readFileSync(file).toString().split('\n').forEach(function (line) {
    lines++;
});
console.log(lines - 1);