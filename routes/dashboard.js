var models  = require('../models');
var express = require('express');
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var path = require('path');
var fs = require('fs-extra');
var router = express.Router();

router.get('/', function(req, res) {

    if (!req.session.user) {
        req.flash('error', 'Login required');
        res.redirect('/login');
        return;
    }

    res.render('dashboard/dashboard', { title: 'Dashboard', messages: req.flash() });
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
    }
    */

    var photos = [];
    var fields = [];
    var oldpath = [];
    var upload_dir;
    var galleryId;

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
            upload_dir = path.join(process.env.PWD, '/public/photos/' + fields[0] + '/' + fields[2]);
            } else {
                upload_dir = path.join(process.env.PWD, '/public/photos/' + fields[0] + '/' + fields[1] + '/' + fields[2]);
            };

            if (!fs.exists(upload_dir)){
                fs.mkdirpSync(upload_dir);
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
                console.log(fields[1]);
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

            console.log(Gallery);

            var new_path;
            photos.forEach(function(element, index){

                new_path = path.join(upload_dir, element);

                fs.rename(oldpath[index], new_path, function (err) {
                    if (err) throw err;
                });

                models.Photo.create({
                    url : upload_dir + '/' + element,
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
