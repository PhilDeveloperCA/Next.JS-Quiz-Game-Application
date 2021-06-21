const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    user_id : {
        type: Schema.Types.ObjectId,
        required:true,
        ref : 'User'
    },
    quiz_id : {
        type : Schema.Types.ObjectId,
        required:true,
        ref : 'Quiz', 
    }
})


mongoose.models = {};

export default Score = mongoose.model('Score', ScoreSchema);
