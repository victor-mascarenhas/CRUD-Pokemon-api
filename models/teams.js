const mongoose = require('mongoose')
const { Schema } = mongoose;

const TeamsSchema = new Schema({
    name: {
        type : String,
        required : true,
        unique: true
    },    
    pokemons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pokemons'
    }],
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }]
    
});

module.exports = mongoose.model('teams', TeamsSchema)