const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    gDisplayName: {
        type:String,
        required:true
    },
    gEmails: {
        type:String,
        required:true
    }
});

mongoose.model('users',userSchema);