import express from "express";
import fetch from "node-fetch";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import multer from "multer";


const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.get("/now", (req, res) => {
    const timezone = req.query.tz;
    const time = new Date().toLocaleDateString("de-CH", { timeZone: timezone });
    res.send(time);
});

const names = ["Josh", "Ben", "Sombi", "Ok"];

app.get("/form", (req, res) => {
    res.sendFile(__dirname + "/views/form.html");
});

app.post("/name", (req, res) => {
    const name = req.body.name;
    names.push(name);
    console.log(names);
    res.send(names);
});

app.delete("/name", (req, res) => {
    const {name} = req.body;
    const index = names.indexOf(name);
    console.log(name)
    if (index > -1) {
        names.splice(index, 1);
        console.log(names)
        res.sendStatus(204);
    } else {
        console.log("Name not found")
        res.send("Name not found");
    }
});

app.get("/secret2", (req, res) => {
    const auth = req.headers.authorization;
    if (auth == "ok") {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

app.get("/chuck", (req, res) => {
    const name = req.query.name;
    console.log(name);
    fetch("https://api.chucknorris.io/jokes/random")
        .then((response) => response.json())
        .then((json) => {
            if (name) {
                return json.value.replace("Chuck Norris", name);
            } else {
                return json.value;
            }
        })
        .then((namedJoke) => res.send(namedJoke));
});

const me = {
    name: "Ben",
    age: 16,
};

app.get('/me', (req, res) => {
    res.send(me)
})

app.patch("/me", (req, res) => {
    for (const key in req.body) {
        if (key in me) {
            me[key] = req.body[key];
        }
    }
    res.send(me)
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
