const express = require("express");
const bookData = require("../data/books.json");
const {check, validationResult} =require("express-validator");
const save = require("../services/save.services")

const router = express.Router();

router.get('/', (req, res)=>{
    res.json(bookData)
});

router.post('/', [
    check('name', 'Book name is required.').not().isEmpty(),
    check('author', 'Book author is required.').not().isEmpty(),

    ] , (req, res)=>{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const {name, author} = req.body;

        bookData.push({
            name,
            author,
            id: Math.random()
        })

        const isSaved = save(bookData);

        if(!isSaved){
            return res.status(500).json({
                error: true,
                message: "Could not save book"
            })
        }

        res.json([{
            message: "Success"
        }])


})

router.put('/:bookid' , (req, res)=>{
    const {bookid} = req.params;
    const {name, author} = req.body;

    const foundBook = bookData.find((book) => book.id == bookid)

    if(!foundBook){
        return res.status(404).send({
            errors: true,
            message: "Book not found"
        })
    }

    let updatedBook = null;
    const updatedBooks = bookData.map((book)=>{
        if(bookid == book.id){
            updatedBook= {
                ...book,
                name,
                author
            }
            return updatedBook
        }
        return book
    });

    const isSaved = save(updatedBooks);

        if(!isSaved){
            return res.status(500).json({
                error: true,
                message: "Could not update book"
            })
        }

        // res.json(updatedBook)

    res.status(201).send(updatedBook);

})

module.exports = router;