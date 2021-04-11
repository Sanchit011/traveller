const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const wrapAsync = require('../utilities/wrapAsync');
const {isLoggedIn, validateCampground, isAuthor} = require('../middleware')
const campgrounds = require('../controllers/campgrounds');
const multer  = require('multer');
const {storage} = require('../cloudinary/index');
const upload = multer({storage});

router.get('/new', isLoggedIn, campgrounds.newForm);

router.get('/', wrapAsync(campgrounds.index));

router.post('/', isLoggedIn, upload.array('image'), validateCampground, wrapAsync(campgrounds.createCampground));

router.get('/:id', wrapAsync(campgrounds.showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgrounds.editForm));

router.put('/:id', isLoggedIn,isAuthor, upload.array('image'), validateCampground, wrapAsync(campgrounds.updateCampground));

router.delete('/:id', isLoggedIn,isAuthor, wrapAsync(campgrounds.deleteCampground));

module.exports = router;