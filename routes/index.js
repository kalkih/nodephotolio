var models  = require('../models');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    models.Photo.findAll({
        limit: 4,
        order: 'createdAt DESC'
    }).then(function(photos) {
        if (!photos[0]) {
            photos[0] = ['dataValues'];
            photos[0]['dataValues'] = ['url'];
            photos[0]['dataValues']['url'] = '/images/placeholder/placeholder-black.png';
        };
        res.render('index', { title: 'Index', messages: req.flash(), link: '/gallery', photos : photos, session: req.session});
    });

});

router.get('/about', function(req, res) {
    models.Photo.findAll({
        limit: 4,
        order: 'createdAt DESC'
    }).then(function(photos) {
        if (!photos[0]) {
            console.log('here');
            photos[0] = ['dataValues'];
            photos[0]['dataValues'] = ['url'];
            photos[0]['dataValues']['url'] = '/images/placeholder/placeholder-black.png';
        };
        console.log('lol');
        res.render('about', { title: 'About', messages: req.flash(), link: '/gallery', photos : photos, session: req.session});
    });
});

module.exports = router;
