const url = process.argv[2];

const http = require("http");
const concat = require("concat-stream");

http.get(url, (response) => {
    response.pipe(concat((data) => {
        data = data.toString();
        console.log(data.length);
        console.log(data);
    }
    ));
})
