const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/campground');
const wrapAsync = require('../utilities/wrapAsync');
const expressError = require('../utilities/expressError');
const Review = require('../models/review');
const {reviewSchema} = require('../schemas.js')
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews');

router.delete('/:reviewId',isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReview));

router.post('/',isLoggedIn, validateReview, wrapAsync(reviews.createReview));

module.exports = router;