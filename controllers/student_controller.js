const Student = require("../models/student");

// render page to add new student
module.exports.addStudentPage = function(req, res ){
    res.render('create_new_student',{
        title: 'Add'
    });
}

// create new student and store in db
module.exports.createStudent = function(req, res ){
    console.log(req.body);
    Student.create(req.body,(err,student)=>{ //creates new student in database
        if(err){ // throws error if email alredy exists in database
            console.log('error occured while creating new Student');
            req.flash('error',`${req.body.email} already exists`);
            return res.redirect('back');
        }
        // console.log(student);      
        req.flash('success',`Student ${student.name} created Successfully`);
        return res.redirect('back');
    });
   
}
