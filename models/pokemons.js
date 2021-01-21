const mongoose = require('mongoose')
const { Schema } = mongoose;

const PokemonsSchema = new Schema({
    name: {
        type : String,
        required : true,
        unique: true
    },    
    type1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'types'
    },
    type2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'types'
    },
    pokedex: String
    
});

module.exports = mongoose.model('pokemons', PokemonsSchema)