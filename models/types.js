const mongoose = require('mongoose')
const { Schema } = mongoose;

const TypesSchema = new Schema({
    name: {
        type : String,
        required: true,
        unique: true
    },
    color: String
    
});

module.exports = mongoose.model('types', TypesSchema)