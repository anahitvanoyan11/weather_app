import express from 'express';
import CityController from '../controllers/cityController.js';

const router = express.Router();

router.post('/', CityController.createCity);
router.get('/', CityController.getAllCities);
router.get('/:id', CityController.getCityById);
router.get('/:id/history', CityController.getWeatherHistory);
router.get('/country/:countryId', CityController.getCitiesByCountry);

export default router; 