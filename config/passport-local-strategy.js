const passport= require('passport') ;

const LocalStrategy= require('passport-local').Strategy ;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done){
        // find user and establish identity
        User.findOne({email: email}, function(err, user){
            if(err){ console.log('Error in finding user passport'); return done(err); }
            if(!user || user.password != password ){
                console.log('Invalid username/password');
                return done(null, false);
            }
            if(user && user.password == password){
                // req.flash('success',`LogIn Successfully`);
                return done(null,user);
            }
            return done(null,false);
        });
    }
));

// serialize - put user id on cookie and not rest information
// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
})

// deserialize - cookie sent back to server us to establish id of user
// deserializing the user from the key in the cookies
passport.deserializeUser( function(id, done ){
    User.findById(id, function(err, user){
        if(err){ console.log('Error in finding user passport'); return done(err); }
        return done(null, user);
    });
});

// check if user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if user is signed in pass him on next page 
    if(req.isAuthenticated()){
        return next();
    }

    // if user is not signed in 
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next ){
    if(req.isAuthenticated()){
        // req.user contains current signed in user from session cookie
        res.locals.user = req.user ;
    }
    next();
}


module.exports = passport ;