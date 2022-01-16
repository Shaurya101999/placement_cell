const mongoose = require('mongoose');

const resultSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    result: {
        type: String
    }
})

const Result = mongoose.model('Result', resultSchema );
module.exports = Result ;