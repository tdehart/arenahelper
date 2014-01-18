'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Card Schema
 */
var CardSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    rarity: {
        type: String,
        default: '',
        trim: true
    },
    type: {
        type: String,
        default: '',
        trim: true
    },
    race: {
        type: String,
        default: '',
        trim: true
    },
    heroClass: {
        type: String,
        default: '',
        trim: true
    },
    mana: {
        type: Number,
        default: 0
    },
    attack: {
        type: Number,
        default: 0
    },
    health: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    image: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Validations
 */
CardSchema.path('name').validate(function(name) {
    return name.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
CardSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Card', CardSchema);
