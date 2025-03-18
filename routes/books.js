const books = require("../data/books")
const express = require('express')
const router = express.Router() 

router
    .route('/')
    .get((req, res) => {
        res.json(books)
    })
    .post((req,res) =>{
        if(req.body.title && req.body.author && req.body.publication_date && req.body.genre ){
            const book = {
                bookid: books[books.length -1].bookid + 1,
                title: req.body.title,
                author: req.body.author,
                publication_date: req.body.publication_date,
                genre: req.body.genre                
            }
            books.push(book)
            res.status(201).json(books[books.length -1]) //created successfully
        }
        else res.status(400).json({error: "Insufficient Data"}) //bad request
    })

    router
    .route('/:bookID(\\d+)')
    .get((req,res) =>{
        const book = books.find((book) => book.bookid == parseInt(req.params.bookID,10))
        if(book){res.json(book)}
        else{res.status(404).send("Book not found")}
    })
    .patch((req,res) => {
        const book = books.find((book,i) =>{
            if(book.bookid == req.params.bookID)
            {
                for(const key in req.body){
                    books[i][key] = req.body[key]
                }
                return true
            }
        })
        if(book) res.status(200).json(book)  //status ok
        else {res.status(404).send}("Book not found")
    })
    .delete((req, res) =>{
        const book = books.find((book, i) =>{
            if(book.bookid == req.params.bookID)
            {
                books.splice(i,1);
                return true
            }
        })
        if(book) res.json(book)
        else{res.status(404).send("Book not found")}
    })


        module.exports = router
       