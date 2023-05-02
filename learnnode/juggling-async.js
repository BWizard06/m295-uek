const http = require("http");
const concat = require("concat-stream");

const urls = process.argv.slice(2);
let count = 0;
let responses = [];

const readRespone = (i) => {
    http.get(urls[i], (response) => {
        response.pipe(
            concat((data) => {
                responses[i] = data.toString();
                count++;

                if (count == 3) {
                    responses.forEach((response) => {
                        console.log(response);
                    });
                }
            })
        );
    });
};

urls.forEach((url, i) => {
    readRespone(i);
});