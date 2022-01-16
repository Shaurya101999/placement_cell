const { urlencoded } = require('express');
const express = require('express');
const app = express();
const port = 5000 ;

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

// for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// const MongoStore = require('connect-mongodb-session')(session);//
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());

app.use(express.static('./assets'));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

// using mongo store to store the session cookie in db
app.use( session ({
    name: 'placement-cell' ,
    secret: 'HelloPlacementHelloCell',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 *100 )
    },
    store: new MongoStore({
            mongooseConnection: db,
            autoRemove: 'disabled'
        }, 
        function(err ){
            console.log(err || 'connect mongo setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }
    console.log(`Server is running on port ${port}`)
})