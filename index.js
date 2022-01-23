const express = require('express');
const env = require('./config/enviroment');
console.log(`Name: ${env.name} assets: ${env.asset_path} Session cookie: ${env.session_cookie_key} db: ${env.db}`)
// if(process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');
const app = express();
const port = process.env.PORT || 5000 ;

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

// for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const { cookie } = require('express/lib/response');
// const MongoStore = require('connect-mongodb-session')(session);//
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
app.use(express.urlencoded());

app.use(express.static(__dirname+'/'+ env.asset_path));

app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

console.log(`Seesion cookie key : ${env.session_cookie_key}`);
app.use(cookieParser());
// using mongo store to store the session cookie in db
app.use( session ({
    name: 'placement-cell' ,
    secret: env.session_cookie_key ,
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

// Setting up middleware for flash messages
app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }
    console.log(`Server is running on port ${port}`)
})