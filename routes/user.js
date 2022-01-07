const express = require('express');

const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.get('/user-home', userController.home);

router.post('/create-user',userController.createUser);
router.post('/create-session',userController.createSession);


module.exports = router ; 