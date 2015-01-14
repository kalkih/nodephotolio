var models  = require('../models');
var express = require('express');
var passwordHash = require('password-hash');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('login', { title: 'Login', messages: req.flash() });
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

                req.flash('info', 'Logged in!')
                console.log("Success");
                res.redirect('/dashboard');
            } else {
                req.flash('info', 'Wrong password!')
                res.redirect('/login');
            }
        } else {
            req.flash('info', 'Wrong username!')
            res.redirect('/login');
        }
    });
    //res.send('ok');
});

module.exports = router;
