const express= require('express');
const router = express.Router();
const passport = require('passport');
const homeController = require('../controllers/home_controller');
console.log(`Router Loaded `);
router.get('/', homeController.home);

router.use('/user', require('./user'));
router.use('/student', passport.checkAuthentication ,require('./student'));
router.use('/companies', passport.checkAuthentication ,require('./companies'));
router.use('/info-download', passport.checkAuthentication ,require('./info_download'));


module.exports = router ;