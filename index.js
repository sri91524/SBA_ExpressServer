const express = require('express');
const bodyParser = require('body-parser');

const users = require('./routes/users');
const books = require('./routes/books');
const reviews = require('./routes/reviews')

const app = express();
const PORT =3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

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

app.use((req, res, next) =>{
    let dateTime = new Date();

    //adjust 0 before single digit date
    let date =("0" + dateTime.getDate()).slice(-2);
    //get current month
    let month = ("0" + (dateTime.getMonth()+1)).slice(-2);
    
    //get current year
    let year = dateTime.getFullYear();

    //get current hours
    let hours = dateTime.getHours();

    //get current minutes
    let minutes = dateTime.getMinutes();

    //get current seconds
    let seconds = dateTime.getSeconds();

    let reqDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    console.log(`====================================================`);
    console.log(`Request made to ${req.url} at ${reqDate}`);
    console.log(`Request method- ${req.method}`);
    console.log(`=====================================================`)
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

app.use("/users", users);
app.use("/books", books);
app.use("/reviews", reviews)

app.get('/',(req,res) =>{
    res.send("Welcome to my webpage!!!");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

