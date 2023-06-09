import express from "express";
const router = express.Router();

let books = [
    {
        isbn: 123,
        title: "Sekiro",
        year: 2009,
        author: "Ben",
    },
    {
        isbn: 124,
        title: "The Witcher 3: Wild Hunt",
        year: 2015,
        author: "Andrzej Sapkowski",
    },
    {
        isbn: 125,
        title: "Red Dead Redemption 2",
        year: 2018,
        author: "Rockstar Games",
    },
    {
        isbn: 126,
        title: "Fallout 4",
        year: 2015,
        author: "Bethesda Game Studios",
    },
    {
        isbn: 127,
        title: "The Elder Scrolls V: Skyrim",
        year: 2011,
        author: "Bethesda Game Studios",
    },
    {
        isbn: 128,
        title: "Dark Souls III",
        year: 2016,
        author: "FromSoftware",
    },
    {
        isbn: 129,
        title: "Bloodborne",
        year: 2015,
        author: "FromSoftware",
    },
    {
        isbn: 130,
        title: "Bioshock Infinite",
        year: 2013,
        author: "Irrational Games",
    },
    {
        isbn: 131,
        title: "Deus Ex: Mankind Divided",
        year: 2016,
        author: "Eidos Montreal",
    },
    {
        isbn: 132,
        title: "Dishonored 2",
        year: 2016,
        author: "Arkane Studios",
    },
];

router.get("/", (req, res) => {
    res.send(books);
});

router.get("/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let foundbook = null;
    for (const book of books) {
        if (book.isbn === Number(isbn)) {
            foundbook = book;
            break;
        }
    }
    if (foundbook) {
        res.send(foundbook);
    } else {
        res.send("Book not found");
    }
});

router.post("/", (req, res) => {
    let newBook = {};
    for (const key in req.body) {
        newBook[key] = req.body[key];
    }
    books.push(newBook);
    res.send(newBook);
});

router.put("/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let newBook = {};
    for (const key in req.body) {
        newBook[key] = req.body[key];
    }
    const updatedBooks = books.map((book) => {
        return book.isbn === Number(isbn) ? newBook : book;
    });
    books = updatedBooks;
    res.send(newBook);
});

router.delete("/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const index = books.findIndex((book) => book.isbn === Number(isbn));
    if (index > -1) {
        books.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.send("Book not found");
    }
});

export default router;
