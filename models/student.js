const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    email:{
        type: String, 
        unique: true,
        required: true
    },
    batch:{
        type: String, 
        required: true
    },
    college:{
        type: String, 
        required: true
    },
    status:{
        type: String 
    },
    dsaScore:{
        type: Number
    },
    webDevScore:{
        type: Number
    },
    reactScore:{
        type: Number
    },
    interviews:[{
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true
        },
        result: {
            type: String
        }
    }]
})

const Student = mongoose.model('Student', studentSchema);
module.exports = Student ;
