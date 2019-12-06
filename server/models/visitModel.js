const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const visitSchema = new Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    created_at: { type: Date, default: Date.now}
})

visitSchema.plugin(AutoIncrement, {inc_field: 'visitId'})
const Visit = mongoose.model('visit', visitSchema)



module.exports = Visit;