const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/user_controller');

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.get('/user-home',passport.checkAuthentication, userController.home);
router.get('/sign-out', userController.destroySession);

router.post('/create-user',userController.createUser);

// use passport as midlleware to authenticate 
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: 'user/sign-in'}
) , userController.createSession);



module.exports = router ; 