const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const wrapAsync = require('../utilities/wrapAsync');
const users = require('../controllers/users');

router.get('/register', users.registerForm);

router.post('/register', wrapAsync(users.createUser));

router.get('/login', users.loginForm);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout);

module.exports = router;