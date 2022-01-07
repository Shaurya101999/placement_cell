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
            return done(null, user);
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

module.exports = passport ;