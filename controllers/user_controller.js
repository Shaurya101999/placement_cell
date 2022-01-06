const User = require('../models/user');
module.exports.signIn = function(req, res ){
    res.render( 'user_sign_in' , {
        title: 'Sign In'
    });
}
module.exports.signUp = function(req, res ){
    res.render( 'user_sign_up' , {
        title: 'Sign up'
    });
}
module.exports.createUser = function(req, res ){
    console.log(req.body);
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
    res.end('<h1>Creating Session</h1>');
}
