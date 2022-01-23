const User = require('../models/user');
const Student = require('../models/student');


// home page for signed in users
module.exports.home= function(req,res){
    // console.log(req.cookies);
    // display list of all students    
    Student.find({}, function(err, student){
        if(err){ console.log('Error in fetching students : ',err); return;}
        return res.render('user_home', {
            title:'User Home',
            student: student
        });
    })    
}

// display sign in page
module.exports.signIn = function(req, res ){
    // if user is already logged in 
    if(req.isAuthenticated()){
        return res.redirect('/user/user-home');
    }
    return res.render( 'user_sign_in' , {
        title: 'Sign In'
    });
   

}

// display sign up page
module.exports.signUp = function(req, res ){
    // if user is already logged in 
    if(req.isAuthenticated()){
        return res.redirect('/user/user-home');
    }
    return res.render( 'user_sign_up' , {
        title: 'Sign up'
    });
}
 // creating user and storing in db
module.exports.createUser = function(req, res ){
    // console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email }, function(err, user ){
        if(err){ console.log('Error in finding user/ signing up'); return; }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){ 
                    console.log('Error in creating user '); 
                    return res.redirect('back'); 
                }
                req.flash('success','Signed Up Successfully');
                return res.redirect('/user/sign-in');
            })
        } else{
            req.flash('error',' User already exists ');
                    
            return res.redirect('back');
        }
    })
}

// create session for user by using passport for authentication
module.exports.createSession = function(req, res ){
    return res.redirect('/user/user-home');    

}

// for signing out user
module.exports.destroySession = function(req, res ){
    req.logout(); // function from passport to delete cookies
    req.flash('success', 'Signed Out successfully')
    return res.redirect('/');
}