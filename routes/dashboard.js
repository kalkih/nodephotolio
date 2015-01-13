var models  = require('../models');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('dashboard/dashboard', { title: 'Dashboard' });
});

router.get('/upload', function(req, res) {
    res.render('dashboard/upload', { title: 'Upload' });
});

router.post('/upload', function(req, res) {
    if (!req.body.photos) {
        res.redirect('/dashboard/upload');
        return;
    };
    if (!req.body.city) {
        req.body.city = null;
    };
    var files = 0;

    if (req.body.photos instanceof Array) {
        var photos = req.body.photos;
    } else {
        var photos = [req.body.photos];
    };
    photos.forEach(function(element, index){
        if (req.body.featured != 'true') {
            req.body.featured = 'false';
        };
        models.Photo.create({
            url : element,
            thumb : element,
            country : req.body.country,
            city : req.body.country,
            year : req.body.year,
            month : req.body.month,
            featured : req.body.featured
        }).then(function() {
            console.log("Photo saved.")
        });

        files++;
    });
    console.log(files + " photos saved.")
});

module.exports = router;
