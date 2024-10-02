const express = require("express");
const router = express.Router({mergeParams: true});
const warpAsync = require("../utils/warpAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controller/review.js");


router.post("/", isLoggedIn, validateReview, 
    warpAsync(reviewController.createReview));

router.delete("/:reviewId", isLoggedIn, isReviewAuthor, 
    warpAsync(reviewController.destoryReview));

module.exports = router;