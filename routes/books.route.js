const express = require("express");
const bookData = require("../data/books.json")

const router = express.Router();

router.get('/', (req, res)=>{
    res.json(bookData)
})

module.exports = router;