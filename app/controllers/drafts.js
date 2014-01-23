'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Draft = mongoose.model('Draft'),
    _ = require('lodash');


/**
 * Find draft by id
 */
exports.draft = function(req, res, next, id) {
    Draft.load(id, function(err, draft) {
        if (err) return next(err);
        if (!draft) return next(new Error('Failed to load draft ' + id));
        req.draft = draft;
        next();
    });
};

/**
 * Create a draft
 */
exports.create = function(req, res) {
    var draft = new Draft(req.body);
    draft.user = req.user;

    draft.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                draft: draft
            });
        } else {
            res.jsonp(draft);
        }
    });
};

/**
 * Update a draft
 */
exports.update = function(req, res) {
    var draft = req.draft;

    draft = _.extend(draft, req.body);

    draft.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                draft: draft
            });
        } else {
            res.jsonp(draft);
        }
    });
};

/**
 * Delete an draft
 */
exports.destroy = function(req, res) {
    var draft = req.draft;

    draft.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                draft: draft
            });
        } else {
            res.jsonp(draft);
        }
    });
};

/**
 * Show an draft
 */
exports.show = function(req, res) {
    console.log('show');
    res.jsonp(req.draft);
};

/**
 * List of Drafts
 */
exports.all = function(req, res) {
    Draft.find().sort('-created').populate('user', 'name username').exec(function(err, drafts) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(drafts);
        }
    });
};
