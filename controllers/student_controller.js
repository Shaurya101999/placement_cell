const Student = require("../models/student");

module.exports.addStudentPage = function(req, res ){
    res.render('create_new_student',{
        title: 'Add'
    });
}
module.exports.createStudent = function(req, res ){
    console.log(req.body);
    Student.create(req.body , function(err, student){
        if(err){ console.log('Error occured while adding Student : ',err); return res.redirect('back');}
        return res.render('user-home', {
            title: 'User-home'
        });
       
    });
    return res.redirect('/user/user-home');
}