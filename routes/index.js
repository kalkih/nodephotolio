var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    models.Photo.findAll({
        limit: 4,
        order: 'createdAt DESC'
    }).then(function(photos) {
        res.render('index', { title: 'Index', messages: req.flash(), link: '/gallery', photos : photos, session: req.session});
    });

});

router.get('/about', function(req, res) {
    models.Photo.findAll({
        limit: 4,
        order: 'createdAt DESC'
    }).then(function(photos) {
        res.render('about', { title: 'About', messages: req.flash(), link: '/gallery', photos : photos, session: req.session});
    });
});

module.exports = router;
