const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String, 
    email: String,
    password: {
        type: String,
        select : false
    },
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teams'
    }],
    admin: Boolean
    
});

module.exports = mongoose.model('user', UserSchema)