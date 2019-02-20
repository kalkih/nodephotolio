var models  = require('../models');
var express = require('express');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var path = require('path');
var fs = require('fs-extra');
var gm = require('gm').subClass({ imageMagick: true });
var router = express.Router();
var methodOverride = require('method-override')

router.get('/', function(req, res) {

    if (!req.session.user) {
        req.flash('error', 'Login required');
        res.redirect('/login');
        return;
    }
    console.log(req.session.user)

    models.Gallery.findAll({
        limit: 8,
        order: [['createdAt', 'DESC']]
    }).then(function(galleries) {

        if (!galleries[0]) {
            res.render('dashboard/dashboard', { title: 'Dashboard', messages: req.flash(), latestGalleries: galleries, session: req.session });
        };

        var current = 0;
        galleries.forEach(function(gallery, index){
            models.Photo.find({
                where : {
                    GalleryId : gallery['dataValues']['id']
                }
            }).then(function(photo) {

                if (photo) {
                    gallery['dataValues']['thumb'] = "/thumb" + photo['dataValues']['url'];
                    gallery['dataValues']['cover'] = photo['dataValues']['url'];
                } else {
                    gallery['dataValues']['thumb'] = '/images/placeholder/placeholder-thumb-grey.png';
                }
                gallery['dataValues']['url'] = '/gallery/' + gallery['dataValues']['name'] + '/' + gallery['dataValues']['year'] + '/' + gallery['dataValues']['month'];

                var slideshow = [photo];
                if (current == galleries.length -1) {
                    res.render('dashboard/dashboard', { title: 'Dashboard', messages: req.flash(), latestGalleries: galleries, slideshow: slideshow, session: req.session });
                };
                current++;
            });

        });

    });




});

router.get('/upload', function(req, res) {

    if (!req.session.user) {
        req.flash('error', 'Login required');
        res.redirect('/login');
        return;
    }

    res.render('dashboard/upload', { title: 'Upload', messages: req.flash(), session: req.session });
});

router.delete('/:name/:year/:month', function(req, res) {

    if (!req.session.user) {
        req.flash('error', 'Login required');
        res.redirect('/login');
        return;
    }

    models.Gallery.destroy({
        where : {
            name : req.params['name'],
            year : req.params['year'],
            month : req.params['month']
        }
    }).then(function(gallery) {
        models.Photo.destroy({
            where : {
                GalleryId : gallery.id
            }
        }).then(function(photo) {
            req.flash('success', 'Gallery deleted');
            res.redirect('/gallery');
        });
    });

});

router.post('/gallery/new', function(req, res) {

    if (!req.session.user) {
        req.flash('error', 'Login required');
        res.redirect('/login');
        return;
    }

    req.body.name = req.body.name.split(' ').join('-');
    req.body.name = req.body.name.charAt(0).toUpperCase() + req.body.name.slice(1);

    models.Gallery.findOrCreate({
        where : {
            name : req.body.name,
            year : req.body.year,
            month : req.body.month
        }
    }).then(function(gallery, created) {
        gallery = gallery[0].dataValues;
        if (created) {
            req.flash('success', 'New gallery created!');
        } else {
            req.flash('info', 'Gallery already exists!');
        };

        res.redirect('/gallery/' + gallery.name + '/' + gallery.year + '/' + gallery.month);
    });

});

router.post('/:name/:year/:month', function(req, res) {

    if (!req.session.user) {
        req.flash('error', 'Login required');
        res.redirect('/login');
        return;
    }

    var photos = [];
    var fields = [];
    var oldpath = [];
    var upload_dir;
    var galleryId;
    var url;
    var thumb;

    // Upload
    var form = new formidable.IncomingForm();

    form.on('file', function(field, file) {
        var
            old_path = file.path,
            ext = file.name.split('.').pop(),
            index = old_path.lastIndexOf('/') + 1,
            filename = old_path.substr(index);
            oldpath.push(old_path);

            upload_dir = path.join(process.env.PWD, '/public/photos/' + req.params['name'] + '/' + req.params['year'] + '/' + req.params['month']);
            url = '/photos/' + req.params['name'] + '/' + req.params['year'] + '/' + req.params['month'];
            thumb = path.join(process.env.PWD, '/public/thumb/photos/' + req.params['name'] + '/' + req.params['year'] + '/' + req.params['month']);

            if (!fs.exists(upload_dir)){
                fs.mkdirpSync(upload_dir);
            }
            if (!fs.exists(thumb)){
                fs.mkdirpSync(thumb);
            }

        photos.push(filename + '.' + ext);
    })
    .on('end', function() {

        models.Gallery.find({
            where : {
                name : req.params['name'],
                year : req.params['year'],
                month : req.params['month'],
            }
        }).then(function(Gallery) {
            if (Gallery) {
                galleryId = Gallery.id;
                req.flash('success', 'Added ' + photos.length + ' photo(s) to existing gallery');
                var new_path;
                photos.forEach(function(element, index){

                    resize_path = path.join(thumb, element);
                    new_path = path.join(upload_dir, element);

                    fs.renameSync(oldpath[index], new_path, function (err) {
                        if (err) throw err;
                    });

                    gm(new_path)
                    .resize('400', '300', '^')
                    .gravity('Center')
                    .crop('400', '300')
                    .write(resize_path, function (err) {
                        if (!err) console.log('Thumbnail created');
                    });

                    models.Photo.create({
                        url : url + '/' + element,
                        GalleryId : galleryId
                    });
                });
            };

            res.redirect('/gallery/' + req.params['name'] + '/' + req.params['year'] + '/' + req.params['month']);

        });


    });
    form.parse(req, function() {

    });

});

router.put('/order', function(req, res) {
    if (!req.session.user) {
        return res.send({
            'msg': 'Permission denied!',
            'type': 'fail'
        });
    }

    req.body['data[]'].forEach(function(photo, index) {
        console.log(photo);
        index = index +1;
        models.Photo.update({ rank: index }, { where: { id: photo } }).then(function(result){
            if (result.length !== 1) {
                res.send({
                    'msg': 'Failed to update!',
                    'type': 'fail'
                });
            }
        });
        if (index === req.body['data[]'].length) {
            return res.send({
                'msg': 'Saved changes!',
                'type': 'success'
            });
        };
    });

});

router.delete('/image/:id', function(req, res) {
    if (!req.session.user) {
        return;
    }

    var id = req.params['id'];

    models.Photo.destroy({
        where: {
            id: id
        }
    });
});

module.exports = router;
