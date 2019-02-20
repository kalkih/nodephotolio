var models  = require('../models');
var express = require('express');
var passwordHash = require('password-hash');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

    if (req.session.user) {
        res.redirect('/dashboard');
        return;
    }

    models.Photo.findAll({limit : 1}).then(function(photo) {
        if (!photo[0]) {
            photo[0] = ['dataValues'];
            photo[0]['dataValues'] = ['url'];
            photo[0]['dataValues']['url'] = '/images/placeholder/placeholder-black.png';
        }
        var slideshow = [photo[0]];
        res.render('login', { title: 'Login', slideshow : slideshow, messages: req.flash(), session: req.session });
    });


});

router.post('/', function(req, res) {
    models.User.find({
        where : {
            username : req.body.username
        }
    }).then(function(user) {
        if (user) {
            if (passwordHash.verify(req.body.password, user.password)) {
                req.session.user = user.username;

                req.flash('success', 'Logged in!')
                res.redirect('/dashboard');
            } else {
                req.flash('error', 'Wrong password!')
                res.redirect('/login');
            }
        } else {
            req.flash('error', 'Wrong username!')
            res.redirect('/login');
        }
    });
    //res.send('ok');
});

module.exports = router;
