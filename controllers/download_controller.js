const Company = require('../models/companies');
const Student = require('../models/student');
const fs = require('fs');
const objectToCsv = require('objects-to-csv');

module.exports.home = function(req, res){
    Student.find({})
    .populate({
        path: 'interviews',
        populate: {
            path : 'company'
        }
    })
    .exec((err, student)=>{
        res.render('download_info', {
            title : 'Information',
            student: student});
    })
}
module.exports.download = function(req, res){
    Student.find({})
    .populate({
        path: 'interviews',
        populate:{
            path: 'company'
        }
    })
    .exec(async function(err, student){
        const final = [];
        for(i of student){
            const dummy = {
                name: i.name,
                email: i.email,
                batch: i.batch,
                college: i.college,
                dsa_marks: i.dsaScore,
                web_dev_marks: i.webDevScore,
                react_marks: i.reactScore,
                placement_status: i.status,
                // name: i.name,
            };
            let comp = 'company' ;
            let count = 1 ;

            for(students of i.interviews){
                dummy[comp+count]= students.company.name;
                dummy[comp+count+'result']= i.result;
                count++ ;
            }
            final.push(dummy);
        }
        const csv = new objectToCsv(final);
        await csv.toDisk('./result.csv');
        return res.download('./result.csv', function(){
            fs.unlinkSync('./result.csv');
        });
    })
}
