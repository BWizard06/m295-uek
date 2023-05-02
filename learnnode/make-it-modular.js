const mymodule = require('./mymodule.js');
const dir = process.argv[2];
const ext = process.argv[3];

mymodule(dir, ext, (err, list ) => {
    if (err) throw err;
    list.forEach((file) => {
        console.log(file);
    });
})