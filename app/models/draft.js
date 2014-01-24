'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Draft Schema
 */
var DraftSchema = new Schema({
    turns: {
      type: Object,
      default: {}
    },
    heroClass: {
      type: String,
      default: ""
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    created: {
      type: Date,
      default: Date.now
    },
});

/**
 * Validations
 */
// DraftSchema.path('title').validate(function(title) {
//     return title.length;
// }, 'Title cannot be blank');

/**
 * Statics
 */
DraftSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Draft', DraftSchema);
