import express from 'express';
import CountryController from '../controllers/countryController.js';

const router = express.Router();

router.post('/', CountryController.createCountry);
router.get('/', CountryController.getAllCountries);
router.get('/:id', CountryController.getCountryById);

export default router; 