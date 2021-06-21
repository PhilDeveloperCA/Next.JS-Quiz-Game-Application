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

const quizSchema = new Schema({
    title : {type: String, required: true}, 
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required:true},
    categories : [{type: Schema.Types.ObjectId, ref : 'Category'}],
    password : {type:String, required:false}
});

mongoose.models = {};

module.exports = mongoose.model('Quiz', quizSchema);