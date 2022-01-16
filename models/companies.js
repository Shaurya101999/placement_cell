const mongoose = require('mongoose');

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        required: true
    },
    studentsApplied: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }]
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company ;