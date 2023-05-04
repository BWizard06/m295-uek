import express from "express";
import lendsRouter from "./routes/lends.js";
import booksRouter from "./routes/books.js";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/lends", lendsRouter);
app.use("/books", booksRouter);

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
