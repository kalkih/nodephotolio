var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Index', messages: req.flash('info') });
});

router.get('/about', function(req, res) {
  res.render('default', { title: 'About', messages: req.flash('info') });
});

module.exports = router;
