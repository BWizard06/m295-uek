const directory = process.argv[2];
const extension = process.argv[3];

const fs = require('fs');

fs.readdir(directory, (err, list) => {
    if (err) throw err;
    list.forEach((file) => {
        if (file.split('.')[1] === extension) {
            console.log(file);
        }
    });
});