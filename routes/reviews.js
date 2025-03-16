const express = require('express')
const router = express.Router()

const reviews = require('../data/reviews')

router
    .route('/')
    .get((req, res) =>{
        const {userId, bookId} = req.query
        let filteredReviews = reviews
        if(userId){
            filteredReviews = filteredReviews.filter(review => review.userid == userId)
        }
        if(bookId){
            filteredReviews = filteredReviews.filter(review => review.bookid == bookId)
        }
        res.json(filteredReviews)
    })
    .post((req, res) =>{
        if(req.body.userid && req.body.bookId && req.body.rating && req.body.review)
        {
            const newReview ={
                reviewid: reviews[reviews.length -1 ].reviewid +1,
                 bookid : req.body.bookId,
                 userid : req.body.userid,
                 rating: req.body.rating,
                 review : req.body.review
            }
            reviews.push(newReview)
            res.status(201).json(newReview)
        }
        else res.status(400).json({error: "Insufficient Data"})
    })

    router
        .route('/:reviewID')
        .get((req, res) =>{
            const review = reviews.find(review => review.reviewid == req.params.reviewID)
            res.json(review)
        })
        .patch((req, res) =>{
            const review = reviews.find((review,i) =>{
                if(review.reviewid == req.params.reviewID){
                    for(const key in req.body){
                        reviews[i][key] = req.body[key]
                    }
                    return true
                    }
                })
                if(review) res.status(200).json(review)
                else{res.status(404).send("Review not found")}
            
        })
        .delete((req, res) =>{
            const review = reviews.find((review, i) =>{
                if(review.reviewid == req.params.reviewID){
                    reviews.splice(i,1)
                    return true
                }
            })
            if(review) res.json(review)
            else {res.status(404).send("Review not found")}
        })

    module.exports =router