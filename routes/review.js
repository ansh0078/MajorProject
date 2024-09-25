const express = require("express");
const router = express.Router({mergeParams: true});
const warpAsync = require("../utils/warpAsync.js");
const ExpressError = require("../utils/expressError.js");
const {reviewSchema} = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}; 

router.post("/", validateReview, warpAsync(async(req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "New, Review Created!");
    res.redirect(`/listings/${listing._id}`);
}));
router.delete("/:reviewId", warpAsync( async(req, res) => {
    let{id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findById(reviewId);
    req.flash("success", "Reviw Deleted!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;