const file = process.argv[2];
let lines = 0;

const fs = require('fs');
fs.readFile(file, (err, data) => {
    if (err) throw err;
    lines = data.toString().split('\n').length - 1;
    console.log(lines);
});