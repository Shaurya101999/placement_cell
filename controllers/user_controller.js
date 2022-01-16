const User = require('../models/user');
const Student = require('../models/student');

module.exports.home= function(req,res){
    // console.log(req.cookies);    
    Student.find({}, function(err, student){
        if(err){ console.log('Error in fetching students : ',err); return;}
        return res.render('user_home', {
            title:'User Home',
            student: student
        });
    })
    // return res.render('user_home', {
    //     title:'User Home',
    //     // user: user
    // });
    // user can only access this page if he/she is signed in 
    //if(req.cookies.user_id){
        // User.findById(req.cookies.user_id, function(err, user){
        //     if(user){
        //         return res.render('user_home', {
        //             title:'User Home',
        //             user: user
        //         });
        //     }
        //     return res.redirect('/user/sign-in')
        // });
    // }else{
    //     return res.redirect('/user/sign-in');
    // }
    
}

module.exports.signIn = function(req, res ){
    // if user is already logged in 
    if(req.isAuthenticated()){
        return res.redirect('/user/user-home');
    }
    return res.render( 'user_sign_in' , {
        title: 'Sign In'
    });
   

}
module.exports.signUp = function(req, res ){
    // if user is already logged in 
    if(req.isAuthenticated()){
        return res.redirect('/user/user-home');
    }
    return res.render( 'user_sign_up' , {
        title: 'Sign up'
    });
}
module.exports.createUser = function(req, res ){
    // console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email }, function(err, user ){
        if(err){ console.log('Error in finding user/ signing up'); return; }

        if(!user){
            User.create(req.body, function(err, user){
                if(err){ console.log('Error in creating user '); return; }
                return res.redirect('/user/sign-in');
            })
        } else{
            return res.redirect('back');
        }
    })
}
module.exports.createSession = function(req, res ){
    // steps to authenticate
    // find the user
    // User.findOne({email: req.body.email }, function(err, user){
    //     if(err){ console.log('Error in finding user in signing in'); return; }
    
    //     // handle user found
    //     if( user ){
    //         // handle password which doesn't match
    //         if(user.password != req.body.password){
    //             return res.redirect('back');    
    //         }
    //         // handle session creation
    //         res.cookie('user_id', user.id);
    //         return res.redirect('/');
    //     }else{
    //         // handle user not found
    //         return res.redirect('/user/sign-in');
    //     }
    // });
    return res.redirect('/user/user-home');    

}
module.exports.destroySession = function(req, res ){
    req.logout(); // function from passport
    return res.redirect('/');
}