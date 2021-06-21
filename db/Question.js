const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question = {type:String, required:true},
    quiz_id = {type:Schema.Types.ObjectId, required:true, ref: 'Quiz'},
    category_id = {type:Schema.Types.ObjectId, required:true, ref:'Category'},
    points = {type:Number, required:true}
});

mongoose.models = {};

module.exports = mongoose.model('Question', QuestionSchema);