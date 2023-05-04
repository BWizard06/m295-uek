import express from "express";
const router = express.Router();
import { v4 as uuidv4 } from "uuid";

let lends = [
    {
        id: 1,
        customer_id: 2,
        isbn: 123,
        borrowed_at: new Date(),
        returned_at: null,
    },
    {
        id: 2,
        customer_id: 1,
        isbn: 130,
        borrowed_at: new Date(),
        returned_at: null,
    },
];

router.get("/", (req, res) => {
    res.send(lends);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const lend = lends.find((lend) => lend.id === Number(id));
    lend ? res.send(lend) : res.status(404).send("Lend not found");
});

router.post("/", (req, res) => {
    const { customer_id, isbn } = req.body;
    let currentState = false;
    let newLend;
    if (customer_id && isbn) {
        newLend = {
            id: uuidv4(),
            customer_id,
            isbn,
            borrowed_at: new Date(),
            returned_at: null,
        };
    } else {
        res.status(422);
        currentState = false;
    }
    const borrowed_books = lends.filter(
        (lend) => lend.isbn === newLend.isbn && lend.returned_at == null
    );
    if (borrowed_books.length > 0) {
        res.send("Book could not be lend")
    } else {
        res.send("Book can be lend");
        lends.push(newLend);
    }

   /*  let customer_count = {};

    for (let lend of lends) {
        if (customer_count[lend.customer_id]) {
            customer_count[lend.customer_id]++;
        } else {
            customer_count[lend.customer_id] = 1;
        }
    }

    for (const [id, count] of Object.entries(customer_count)) {
        if (count > 3) {
            currentState = false;
        } else {
            currentState = true;
        }
    }

    if (currentState) {
        lends.push(newLend);
        res.send("Book has been lend");
    } else {
        res.send("Book can not be lend");
    } */
});

export default router;
