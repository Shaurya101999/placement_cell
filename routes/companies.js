const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companies_controller');

router.get('/', companiesController.home);
router.post('/add-company', companiesController.addCompany);
router.get('/result/:id', companiesController.results);
router.post('/add-result/:id', companiesController.addResults);

module.exports = router ;