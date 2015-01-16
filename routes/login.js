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

    res.render('login', { title: 'Login', messages: req.flash(), session: req.session });
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

                console.log(req.session.user);

                req.flash('success', 'Logged in!')
                console.log("Success");
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
