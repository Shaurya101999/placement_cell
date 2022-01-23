const Company = require('../models/companies');
const Student = require('../models/student');

module.exports.home = function(req, res){
    Student.find({}, function(err, students){
        Company.find({}, function(err, companies){
            res.render('companies' ,{
                title: 'Companies',
                students : students,
                companies : companies
            })
        })
    }) 
}
module.exports.addCompany = function(req, res){
    Company.create(req.body, function(err, company){
        if(err){ 
            req.flash('error','Error in creating Company')
            console.log('Error in creating company ', err); 
            return res.redirect('back');
        }
    
        for ( students of company.studentsApplied){
            Student.findById(students, function(err, student){
                if(err){ console.log('ERROR : ', err); return; }
                const dummy = {
                    company : company._id,
                    result : 'On-Hold'
                }
                student.interviews.push(dummy );
                student.save();
            })
        }
        req.flash('success',`Interview for ${company.name} created`)
        return res.redirect('back');
    })
}
module.exports.results = function( req, res){
    Company.findById(req.params.id)
    .populate('studentsApplied')
    .exec((err, company)=>{
        res.render('results',{
            title: 'Result',
            company: company

        });
    });
}
module.exports.addResults = function( req, res){
    for( const[key, value] of Object.entries(req.body)){
        console.log(`${key} : ${value}`);
        Student.findById(key, function(err, student){
            if(err){
                console.log(`Error ${student.name} not found `);
                res.redirect(back);
                return ;
            }

            for(students of student.interviews){
                if(students.company.toString() === req.params.id){
                    if(value === 'Pass'){
                        student.status = 'Placed'
                    }
                    else{
                        let count = 0 ;
                        for(ifPassed of student.interviews){
                            if(ifPassed.company.toString() != req.params.id && ifPassed.result=='Pass'){
                                count++;
                                break;
                            }
                        }
                        if ( count == 0 ) {
                            student.status = 'Not Placed'
                        }
                    }
                    students.result = value ;
                    student.save();
                }
            }
        })
    }    
    req.flash('success','Results updated')
    return res.redirect('/user/user-home');

    // return res.render('user_home',{
    //     title : 'User Home'
    // })
}
