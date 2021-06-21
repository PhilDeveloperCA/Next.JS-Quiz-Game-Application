const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },

    username : {
        type: String,
        required: true,
        unique : true
    },

    password : {
        type : String,
        required : true,
    },
    
});

//Hooks to our Model -> What do we want happening
//refactor of promise chaining..
userSchema.pre('save', next => {
    const user = this;
    bcrypt.getSalt(10)
    .then( 
        (salt) => {
            bcrypt.hash(user.password, salt, null)
            .then(
                hash => {
                    user.password = hash;
                    next();
                }
            )
            .catch(err => {return next(err)})
        }
    )
    .catch(err => {return next(err)})
})

userSchema.methods.comparePassword = (candidatePassword, callback) => {
    bcrypt.compare(candidatePassword, this.password, (err,isMatch) => {
        if(err) return callback(err);

        callback(null, isMatch);
    })
}

/*userSchema.pre('save', (next) => {
    const user = this;

    bcrypt.getSalt(10, (err,salt) => {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, null, (err,hash) => {
            if(err) return next(err);
            user.password = hash;
            next();
        })
    });
})*/
//Model Class
mongoose.models = {};

const User = mongoose.model('User', userSchema);

module.exports = User;