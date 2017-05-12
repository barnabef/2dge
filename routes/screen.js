var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');
var Screens = require('../model/Screen');

router.get('/', function(req, res, next) {
    Screens.findById("59126ffe7bcef215e7c87e23", function (err, post) {
        if (err) return next(err);
        res.json(post);
    });

});

module.exports = router;
