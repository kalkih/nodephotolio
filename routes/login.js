var models  = require('../models');
var express = require('express');
var passwordHash = require('password-hash');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('login', { title: 'Login' });
});

router.post('/', function(req, res) {
    models.User.find({
        where : {
            username : req.body.username
        }
    }).then(function(user) {
        if (user) {
            if (passwordHash.verify(req.body.password, user.password)) {
                console.log("Success");
                res.redirect('/dashboard');
            } else {
                console.log("Wrong password");
                res.redirect('/login');
            }
        } else {
            console.log("Wrong username");
            res.redirect('/login');
        }
    });
    //res.send('ok');
});

module.exports = router;
