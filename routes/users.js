const express = require('express');
const router = express.Router();
const users = require("../data/users")

/**
 * CREATE /RETRIEVE USERS
 * Method: GET / POST
 */
router
    .route("/")
    .get((req, res) =>{
        res.json(users);
    })

    .post((req, res) =>{
        if(req.body.name && req.body.username && req.body.email){
            if(users.find((user) => user.username == req.body.username)){
                res.status(409).json({error:"Username already exists"}); //coflict
                return;
            }
            const user = {
                userid: users[users.length -1].userid + 1,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email
            }
            users.push(user)
            res.status(201).json(users[users.length - 1]);
        }
        else res.status(400).send("Insufficient data") //bad request        
    })

/**
 * GET User by ID/ UPDATE/ DELETE USER
 */
router
    .route('/:userID(\\d+)')
    .get((req,res) =>{
        // res.send(`UserId: ${req.params.userID}`);                        
        const user = users.find((user)=> user.userid == parseInt(req.params.userID,10))
        if(user) {res.json(user)}
        else {res.status(404).send("User not found")}
    }) 
    .patch((req,res) =>{
        const user = users.find((user, i) =>{
            if(user.userid == req.params.userID){
                for(const key in req.body){
                    users[i][key] = req.body[key]
                }
                return true
            }
        })
        if(user) res.status(200).json(user) //status ok
        else {res.status(404).send("User not found")} 
    })
    .delete((req,res) => {
        const user = users.find((user,i) =>{
            if(user.userid == req.params.userID){
                users.splice(i,1)
                return true
            }
        })
        if(user) res.json(user)
        else{res.status(404).send("User not found")}
    })
              
module.exports = router