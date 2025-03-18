const express = require('express')
const router = express.Router()
const bookList = require('../data/books')

// Create GET routes for all data that should be exposed to the client.
// Create and render at least one view using a view template and template engine. This can be a custom template engine or a third-party engine.
// Use simple CSS to style the rendered views.

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