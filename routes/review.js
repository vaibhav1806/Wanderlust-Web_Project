
const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrap.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview,isLoggedIn,isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controller/reviews.js")

// Reviews 

router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.createReview));

// Reviews delete
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview))

module.exports= router;