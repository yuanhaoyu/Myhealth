var express = require('express');
var router = express.Router();
var session = require('express-session');

/* url */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.get('/home', function(req, res, next) {
    if(req.session.loginFlag) res.render('home');
    else res.redirect('/personalhealth/login');
});

router.get('/other', function(req, res, next) {
    if(req.session.loginFlag) res.render('other');
    else res.redirect('/personalhealth/login');
});

router.get('/settings', function(req, res, next) {
    if(req.session.loginFlag) res.render('settings');
    else res.redirect('/personalhealth/login');
});

router.get('/step', function(req, res, next) {
    if(req.session.loginFlag) res.render('step');
    else res.redirect('/personalhealth/login');
});

router.get('/task', function(req, res, next) {
    if(req.session.loginFlag) res.render('task');
    else res.redirect('/personalhealth/login');
});

router.get('/edweight', function(req, res, next) {
    if(req.session.loginFlag) res.render('edweight');
    else res.redirect('/personalhealth/login');
});

router.get('/connectUs', function(req, res, next) {
    if(req.session.loginFlag) res.render('connectUs');
    else res.redirect('/personalhealth/login');
});

router.get('/toBuild', function(req, res, next) {
    if(req.session.loginFlag) res.render('toBuild');
    else res.redirect('/personalhealth/login');
});

router.get('/aboutScore', function(req, res, next) {
    if(req.session.loginFlag) res.render('aboutScore');
    else res.redirect('/personalhealth/login');
});

router.get('/sleep', function(req, res, next) {
    if(req.session.loginFlag) res.render('sleep');
    else res.redirect('/personalhealth/login');
});

router.get('/health', function(req, res, next) {
    if(req.session.loginFlag) res.render('health');
    else res.redirect('/personalhealth/login');
});

router.get('/updateBody', function(req, res, next) {
    if(req.session.loginFlag) res.render('updateBody');
    else res.redirect('/personalhealth/login');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

module.exports = router;
