const url = process.argv[2];

const http = require("http");
http.get(url, (response) => {
    response.on("data", (data) => {
        console.log(data.toString());
    });
});
