import express from "express";
import session from "express-session";

const app = express();
const port = 3000;

app.use(express.json());
app.use(
    session({
        secret: "supersecret",
        resave: false,
        saveUninitialized: true,
        cookie: {},
    })
);

//const secretAdminCredentials = { email: "desk@library.example", password: "m295" }

app.get("/", (req, res, _) => {
    req.session.views = (req.session.views || 0) + 1;
    console.log(req.session);

    res.end(req.session.views + "views");
});

app.post("/name", (req, res) => {
    const name = req.query?.name;
    req.session.name = name;
    res.send(`Name ${name} erfolgreich gespeichert!`);
});

app.get("/name", (req, res) => {
    const name = req.session?.name;
    if (!name) {
        res.status(404).send("No name found in session.");
        return;
    }
    res.send(`Name in session: ${name}`);
});

app.delete("/name", (req, res) => {
    const name = req.session?.name;
    if (!name) {
        res.status(404).send("No name found in session.");
    } else {
        req.session.name = null;
        res.send("Name wurde gelöscht");
    }
});
/*
app.post("/login", (req, res) => {
    const {email: password} = req.body

    if(email ?. toLowerCase() = secretAdminCredentials.email && password == secretAdminCredentials.password){
        req.session.email = email
        return res.status(200).json({email: req.session.email })
    }
    return res.status(401).json({error: "Invalid credentials" })
})

app.get("/verify", (req, res) => {
    const {email: password} = req.body

    if(req.session.email){
        req.session.email = email
        return res.status(200).json({email: req.session.email })
    }
    return res.status(401).json({error: "Not logged in" })
})

app.delete("/logout", (req, res) => {
    if (request.session.email) {
        request.session.email = null
        return response.status(204).send()
    }
  return response.status(401).json({ error: "Not logged in" })
})
*/

app.listen(port, () => {
    console.log("Server ist gestartet.");
});
