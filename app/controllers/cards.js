'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Card = mongoose.model('Card'),
    _ = require('lodash');


/**
 * Find card by id
 */
exports.card = function(req, res, next, id) {
    Card.load(id, function(err, card) {
        if (err) return next(err);
        if (!card) return next(new Error('Failed to load card ' + id));
        req.card = card;
        next();
    });
};

/**
 * Create a card
 */
exports.create = function(req, res) {
    var card = new Card(req.body);

    card.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                card: card
            });
        } else {
            res.jsonp(card);
        }
    });
};

/**
 * Update a card
 */
exports.update = function(req, res) {
    var card = req.card;

    card = _.extend(card, req.body);

    card.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                card: card
            });
        } else {
            res.jsonp(card);
        }
    });
};

/**
 * Delete an card
 */
exports.destroy = function(req, res) {
    var card = req.card;

    card.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                card: card
            });
        } else {
            res.jsonp(card);
        }
    });
};

/**
 * Show an card
 */
exports.show = function(req, res) {
    res.jsonp(req.card);
};

/**
 * List of Cards
 */
exports.all = function(req, res) {
    Card.find().sort('-created').exec(function(err, cards) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(cards);
        }
    });
};
