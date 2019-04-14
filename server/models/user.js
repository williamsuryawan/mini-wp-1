const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hashPassword = require('../helpers/hashPassword')

const userSchema = new Schema ({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "email can't be empty"],
        validate: [{
            validator: function (value) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(value); // Assuming email has a text attribute
            },
            message: props => 'Email in wrong format'
        },{
            isAsync: true,
            validator: function (value, cb) {
                User.find({email: value}, function (err, users) {
                    // console.log("masuk validator email", value, members)
                    if(users.length > 0) {
                        cb(false)
                    } else {
                        cb(true)
                    }
                })
            },
            message: props => 'Email already exists'
        }]
    },
    password: {
        type: String,
        required: [true, "password can't be empty"],
        minlength: [3, "password can't be less than 3 characters"],
        maxlength: [5, "password can't be more than 5 characters"]
    },
    listArticle: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]
});

userSchema.pre('save', function(next) {
    console.log("masuk hook hash password")
    if(this.password) { 
        this.password = hashPassword(this.password)
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;