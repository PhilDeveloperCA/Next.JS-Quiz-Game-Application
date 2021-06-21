const mongoose = require('mongoose');

const Schema  = mongoose.Schema;

const rankSchema = new Schema({
    name: String,
    lower_bound : Number,
})

const categorySchema = new Schema({
    name : String,
    ranks : [rankSchema],
});

mongoose.models = {};

module.exports.Categories = mongoose.model('Category', categorySchema);
module.exports.Ranks = mongoose.model('Ranks', rankSchema);