var models  = require('../models');
var express = require('express');
var qt = require('quickthumb');
var router = express.Router();

router.get('/', function(req, res) {

    models.Gallery.findAll().then(function(galleries) {

        galleries.forEach(function(gallery, index){
            if (gallery['dataValues']['city']) {
                gallery['dataValues']['url'] = '/gallery/' + gallery['dataValues']['country'] + '/' + gallery['dataValues']['city'] + '/' + gallery['dataValues']['year'] + '/' + gallery['dataValues']['month'];
            } else {
                gallery['dataValues']['url'] = '/gallery/' + gallery['dataValues']['country'] + '/' + gallery['dataValues']['year'] + '/' + gallery['dataValues']['month'];
            }

        });

        res.render('gallery/gallery', { title: 'Gallery', galleries: galleries, messages: req.flash() });

    });
});

router.get('/:country/:city/:year/:month', function(req, res) {
    models.Gallery.find({
        where : {
            country : req.params['country'],
            city : req.params['city'],
            year : req.params['year'],
            month : req.params['month']
        }
    }).then(function(gallery) {
        if (gallery) {
            models.Photo.findAll({
                where : {
                    GalleryId : gallery.id
                }
            }).then(function(photos) {
                var title = gallery['dataValues']['city'] + ' ' + gallery['dataValues']['month'] + ' ' + gallery['dataValues']['year'];
                res.render('gallery/specGallery', { title: title , gallery: gallery, photos: photos, messages: req.flash() });
            });
        };

    });

});

router.get('/:country/:year/:month', function(req, res) {
    models.Gallery.find({
        where : {
            country : req.params['country'],
            city : "",
            year : req.params['year'],
            month : req.params['month']
        }
    }).then(function(gallery) {
        if (gallery) {
            models.Photo.findAll({
                where : {
                    GalleryId : gallery.id
                }
            }).then(function(photos) {
                var title = gallery['dataValues']['country'] + ' ' + gallery['dataValues']['month'] + ' ' + gallery['dataValues']['year'];
                res.render('gallery/specGallery', { title: title , gallery: gallery, photos: photos, messages: req.flash() });
            });
        };

    });

});

module.exports = router;
