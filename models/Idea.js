const { model, Schema } = require('mongoose')

module.exports = model('idea', new Schema({
    idea: String,
    tech: String, 
    name: String,
    time: {
        type: Date,
        default: Date.now
    }
}))