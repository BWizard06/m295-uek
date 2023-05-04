import express from "express";
import session from "express-session";

import lendsRouter from "./routes/lends.js";
import booksRouter from "./routes/books.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: "supersecret",
        resave: false,
        saveUninitialized: false,
        cookie: {},
    })
);

const authenticate = (req, res, next) => {
    if (req.session.email) {
        next();
    } else {
        res.status(401).json({ error: "You are not logged in" });
    }
};

app.use("/lends", authenticate, lendsRouter);
app.use("/books", booksRouter);

app.get("/", (req, res) => {
    res.send("Hello world");
});

const secretAdminCredentials = {
    email: "test@gmail.com",
    password: "123",
};

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const lower_email = email?.toLowerCase();

    if (
        lower_email == secretAdminCredentials.email &&
        password == secretAdminCredentials.password
    ) {
        req.session.email = lower_email;

        res.status(200).json({ email: req.session.email });
    } else {
        res.status(401).json({ email: "invalid credentials" });
    }
});

app.get("/verify", (req, res) => {
    if (req.session.email) {
        res.status(200).json({ email: req.session.email });
    } else {
        res.status(401).json({ error: "You are not logged in" });
    }
});

app.delete("/logout", (req, res) => {
    if (req.session.email) {
        req.session.email = null;
        res.status(204).send();
    }
    res.status(401).json({ error: "Not logged in" });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
