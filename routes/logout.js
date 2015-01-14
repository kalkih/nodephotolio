var models  = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    req.flash('info', 'Logged out!');
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;
