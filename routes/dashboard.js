var models  = require('../models');
var express = require('express');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var path = require('path');
var fs = require('fs-extra');
var gm = require('gm').subClass({ imageMagick: true });
var router = express.Router();

router.get('/', function(req, res) {

    if (!req.session.user) {
        req.flash('error', 'Login required');
        res.redirect('/login');
        return;
    }

    models.Gallery.findAll({
        limit: 4,
        order: 'createdAt DESC'
    }).then(function(galleries) {
        galleries.forEach(function(gallery, index){
            models.Photo.find({
                where : {
                    GalleryId : gallery['dataValues']['id']
                }
            }).then(function(photo) {

                gallery['dataValues']['img'] = '/thumb' + photo['dataValues']['url'];

                if (gallery['dataValues']['city']) {
                    gallery['dataValues']['name'] = gallery['dataValues']['city'] + ' ' + gallery['dataValues']['month'] + ' ' + gallery['dataValues']['year'];
                    gallery['dataValues']['url'] = '/gallery/' + gallery['dataValues']['country'] + '/' + gallery['dataValues']['city'] + '/' + gallery['dataValues']['year'] + '/' + gallery['dataValues']['month'];
                } else{
                    gallery['dataValues']['name'] = gallery['dataValues']['country'] + ' ' + gallery['dataValues']['month'] + ' ' + gallery['dataValues']['year'];
                    gallery['dataValues']['url'] = '/gallery/' + gallery['dataValues']['country'] + '/' + gallery['dataValues']['year'] + '/' + gallery['dataValues']['month'];
                }
                console.log('length: ' + galleries.length + 'index: ' + index);
                if (index == galleries.length -1) {
                    res.render('dashboard/dashboard', { title: 'Dashboard', messages: req.flash(), latestGalleries: galleries });
                };
            });

        });

    });




});

router.get('/upload', function(req, res) {

    /*
    if (!req.session.user) {
        req.flash('error', 'Login required');
        res.redirect('/login');
        return;
    }*/

    res.render('dashboard/upload', { title: 'Upload', messages: req.flash() });
});

router.post('/upload', function(req, res) {
    /*
    if (!req.session.user) {
        req.flash('error', 'Login required');
        res.redirect('/login');
        return;
    }*/

    var photos = [];
    var fields = [];
    var oldpath = [];
    var upload_dir;
    var galleryId;
    var url;
    var thumb;

    // Upload
    var form = new formidable.IncomingForm();

    form.on('field', function(field, value) {
        fields.push(value)
    });

    // parse a file upload
    form.on('file', function(field, file) {
        var
            old_path = file.path,
            ext = file.name.split('.').pop(),
            index = old_path.lastIndexOf('/') + 1,
            filename = old_path.substr(index);
            oldpath.push(old_path);

            if (fields[1] == 'undefined') {
                upload_dir = path.join(process.env.PWD, '/public/photos/' + fields[0] + '/' + fields[2] + '/' + fields[3]);
                url = '/photos/' + fields[0] + '/' + fields[2] + '/' + fields[3];
                thumb = path.join(process.env.PWD, '/public/thumb/photos' + fields[0] + '/' + fields[2] + '/' + fields[3]);
            } else {
                upload_dir = path.join(process.env.PWD, '/public/photos/' + fields[0] + '/' + fields[1] + '/' + fields[2] + '/' + fields[3]);
                url = '/photos/' + fields[0] + '/' + fields[1] + '/' + fields[2] + '/' + fields[3];
                thumb = path.join(process.env.PWD, '/public/thumb/photos/' + fields[0] + '/' + fields[1] + '/' + fields[2] + '/' + fields[3]);
            };

            if (!fs.exists(upload_dir)){
                fs.mkdirpSync(upload_dir);
                console.log('New folder created');
            }
            if (!fs.exists(thumb)){
                fs.mkdirpSync(thumb);
                console.log('New folder created');
            }

        photos.push(filename + '.' + ext);
    })
    .on('end', function() {

        models.Gallery.find({
            where : {
                country : fields[0],
                city : fields[1],
                year : fields[2],
                month : fields[3],
            }
        }).then(function(Gallery) {
            if (Gallery) {
                galleryId = Gallery.id;
                req.flash('info', 'Added ' + photos.length + ' photos to existing gallery');
            } else {
                models.Gallery.create({
                    country : fields[0],
                    city : fields[1],
                    year : fields[2],
                    month : fields[3],
                }).then (function(Gallery) {
                    galleryId = Gallery.id;
                });
                req.flash('info', 'Added ' + photos.length + ' photos to new gallery');
            }

            var new_path;
            photos.forEach(function(element, index){

                resize_path = path.join(thumb, element);
                new_path = path.join(upload_dir, element);

                fs.renameSync(oldpath[index], new_path, function (err) {
                    if (err) throw err;

                });


                gm(new_path)
                .resize('800', '600', '^')
                .gravity('Center')
                .crop('800', '600')
                .write(resize_path, function (err) {
                    if (!err) console.log(' hooray! ');
                });


                models.Photo.create({
                    url : url + '/' + element,
                    GalleryId : galleryId
                });
            });

            res.redirect('/dashboard/upload');

        });


    });
    form.parse(req, function() {

    });

});

module.exports = router;
