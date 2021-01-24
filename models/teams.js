const mongoose = require('mongoose')
const { Schema } = mongoose;

const TeamsSchema = new Schema({
    name: {
        type : String,
        required : true,
        unique: true
    },    
    pokemon1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pokemons'
    },
    pokemon2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pokemons'
    },
    pokemon3: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pokemons'
    },
    pokemon4: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pokemons'
    },
    pokemon5: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pokemons'
    },
    pokemon6: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pokemons'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
    
});

module.exports = mongoose.model('teams', TeamsSchema)