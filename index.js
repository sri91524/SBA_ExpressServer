const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const users = require('./routes/users');
const books = require('./routes/books');
const reviews = require('./routes/reviews');
const addbookRoute  = require('./routes/addbook')

const bookList = require('./data/books')

const app = express();
const PORT =3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(morgan('dev'));

//setting the view engine as ejs
app.set('view engine','ejs');

app.use(express.static('public'));


//Todo---Req 002 -- Create and use error-handling middleware.
//Triggered error before middleware and captured after middleware
//! In order to get Req 001 to get executed, below block of code need to be commented

// app.use((req, res, next) =>{
//     const error = new Error("Could not access API");
//     error.status = 500;
//     next(error);
// })

// Todo---Req 001 -- Create and use at least two pieces of custom middleware
/** Middleware logging --
 * requested url with date/time
 * requested method
 */
//date-fns
const {format , differenceInMilliseconds} = require('date-fns');
app.use((req, res, next) =>{
    let startTime = new Date();
    let dateTime = new Date();

    let reqDate = format(dateTime, 'MMMM dd, yyyy HH:mm:ss');
    
    console.log(`====================================================`);
    console.log(`Request made to ${req.url} at ${reqDate}`);
    console.log(`Request method- ${req.method}`);
   

    res.on('finish', () => {
        let endTime = new Date();
        const diff = differenceInMilliseconds(endTime, startTime);   
        console.log(`Response sent. Time taken: ${diff} milliseconds`);
        console.log(`=====================================================`);
    })
    next();
})

// Todo---Req 001 -- Create and use at least two pieces of custom middleware
/** Middleware logging --
 * requested ip
 * requested hostname, httpversion, headers
 */

app.use((req, res, next) =>{
    console.log(`====================================================`);
    console.log(`Request made to IP: ${req.ip}`);
    console.log(`Request hostname - ${req.hostname}`); 
    console.log(`Request httpVersion- ${req.httpVersion}`);    
    console.log(`Request headers - ${JSON.stringify(req.headers, null, 2)}`);
    console.log(`=====================================================`);
    next();
})


//Todo---Req 002 -- Create and use error-handling middleware.
//error handling middleware should be placed before routes and after middleware
//! In order to get executed, ensure error triggering is uncommented which is placed before middleware
//! Error can be found in terminal, browser and console 

app.use((err, req, res, next) =>{
    console.error(err.stack); //to display in console
    res.status(500).send("Error in handling API"); // to display in browser
})

// app.use(/^\/users?$/, users);
// app.use(/^\/books?$/, books);
// app.use(/^\/reviews?$/, reviews)

app.use('/users', users);
app.use('/books', books);
app.use('/reviews', reviews)

app.use('/addbook',addbookRoute)

app.get('/',(req, res) =>{
    res.render('viewbook',{title: "Book List", books: bookList})
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

