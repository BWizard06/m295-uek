const fs = require("fs");

const leseDateiInhalt = (filepath) => {
    return new Promise((resolve, reject) => {
        resolve(fs.readFileSync(filepath, "utf8"));
    });
};

leseDateiInhalt("promises.js")
    .then((inhalt) => {
        console.log(`Länge des Inhalts: ${inhalt.length} Zeichen`);
    })
    .catch((error) => {
        console.error(error);
    });
