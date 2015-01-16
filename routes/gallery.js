var models  = require('../models');
var express = require('express');
var qt = require('quickthumb');
var router = express.Router();

router.get('/', function(req, res) {

    models.Gallery.findAll().then(function(galleries) {
        if (!galleries[0]) {
            galleries[0] = ['dataValues'];
            galleries[0]['dataValues'] = ['cover'];
            galleries[0]['dataValues']['cover'] = '/images/placeholder/placeholder-black.png';
        res.render('gallery/gallery', { title: 'Gallery', header: '/images/placeholder/placeholder.jpg', galleries: galleries, messages: req.flash(), session: req.session });
        };

        galleries.forEach(function(gallery, index){
            if (gallery['dataValues']['city']) {
                gallery['dataValues']['url'] = '/gallery/' + gallery['dataValues']['country'] + '/' + gallery['dataValues']['city'] + '/' + gallery['dataValues']['year'] + '/' + gallery['dataValues']['month'];
            } else {
                gallery['dataValues']['url'] = '/gallery/' + gallery['dataValues']['country'] + '/' + gallery['dataValues']['year'] + '/' + gallery['dataValues']['month'];
            }

            models.Photo.find({
                where : {
                    GalleryId : gallery.id
                }
            }).then(function(photo) {
                if (photo) {
                    gallery['dataValues']['thumb'] = "/thumb" + photo['dataValues']['url'];
                    gallery['dataValues']['cover'] = photo['dataValues']['url'];
                } else {
                    gallery['dataValues']['thumb'] = '/images/placeholder/placeholder-thumb-grey.png';
                }

                if (index == galleries.length -1) {
                    res.render('gallery/gallery', { title: 'Gallery', header: galleries[0]['dataValues']['cover'], galleries: galleries, messages: req.flash(), session: req.session });
                };
            });

        });

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
                res.render('gallery/specGallery', { title: title , gallery: gallery, photos: photos, messages: req.flash(), slideshow: photos, session: req.session });
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
                res.render('gallery/specGallery', { title: title , gallery: gallery, photos: photos, messages: req.flash(), slideshow: photos, session: req.session });
            });
        };

    });

});

module.exports = router;
