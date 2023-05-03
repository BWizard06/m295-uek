import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/now", (req, res) => {
    const date = new Date();
    const time =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    res.send(time);
});

app.get("/zli", (req, res) => {
    res.redirect("https://www.zli.ch");
});

// make an array with 20 people names
const names = [
    "Alessandro",
    "Andreas",
    "Andrin",
    "Benjamin",
    "Cedric",
    "Cyrill",
    "Dario",
    "David",
    "Dominik",
    "Fabian",
    "Florian",
    "Jan",
    "Johannes",
    "Jonas",
    "Lars",
    "Lukas",
    "Marco",
    "Matthias",
    "Niklas",
    "Noah",
];

app.get("/name", (req, res) => {
    const random = Math.floor(Math.random() * names.length);
    res.send(names[random]);
});

app.get("/html", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/image", (req, res) => {
    res.sendFile(__dirname + "/public/image.jpg");
});

app.get("/teapot", (req, res) => {
    res.sendStatus(418);
});

app.get("/user-agent", (req, res) => {
    const user_agent = req.get("User-Agent");
    res.send(user_agent);
});

app.get("/secret", (req, res) => {
    res.sendStatus(403);
});

app.get("/xml", (req, res) => {
    res.sendFile(__dirname + "/views/index.xml");
});

app.get("/json", (req, res) => {
    const ben = {
        name: "Ben",
        age: 16,
        city: "Zürich",
        eyecolor: "blue"
    }
    res.json(ben);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
