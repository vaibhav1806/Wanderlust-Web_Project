const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrap.js");
const { isLoggedIn } = require("../middleware.js");
const {isowener,validateListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });



router.route("/")
.get( wrapAsync(listingController.index))
.post(
    isLoggedIn,
    upload.single('listing[image]'), 
    validateListing,
    wrapAsync(listingController.createListing));

// New route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListings))
.put( 
    isLoggedIn,
    isowener,
    upload.single('listing[image]'), 
    validateListing,
    wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isowener, wrapAsync(listingController.destroyListing ));

//EDIT ROUT 
router.get("/:id/edit", isLoggedIn,isowener,
    wrapAsync(listingController.renderEditForm));


module.exports = router;