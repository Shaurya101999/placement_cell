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
    Student.create(req.body , function(err, student){
        console.log(student);
        if(err){ 
            console.log('Error occured while adding Student : ',err); 
            req.flash('error', 'Email already exists');
            // return;
        
        }
        
        console.log(student);
        req.flash('success', `Student created`)
        
       
    });
    return res.redirect('/user/user-home');
}
