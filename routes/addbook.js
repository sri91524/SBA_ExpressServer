const express = require('express')
const router = express.Router()
const bookList = require('../data/books')

router.get('/',(req, res) =>{
    res.render('addbook',{title:'Add Book'})
})

router.post('/add-book',(req, res) =>{
    const {title, author, publication_date, genre} = req.body;
    if(title || author || publication_date || genre)
    {
        const book = {
            bookid: bookList.length + 1,
            title: title,
            author: author,
            publication_date: publication_date,
            genre: genre                
        }
        bookList.push(book)
        res.redirect('/') //created successfully
    }
    else res.status(400).render({error: "All fields are required"}) //bad request
    
})

module.exports = router;