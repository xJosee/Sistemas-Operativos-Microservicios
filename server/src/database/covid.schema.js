const { Schema, model } = require('mongoose');

const CovidSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    age: { type: Number, required: true },
    state: { type: String, required: true },
    infectedtype: { type: String, required: true },
    way: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = model('Covid', CovidSchema);