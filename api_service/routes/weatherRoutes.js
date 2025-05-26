import express from 'express';
import WeatherController from '../controllers/weatherController.js';

const router = express.Router();

router.get('/city/:cityId/history', WeatherController.getWeatherHistory);
router.get('/city/:cityId/current', WeatherController.getCurrentWeather);

export default router; 