import express from 'express';
import WeatherController from '../controllers/weatherController.js';

const router = express.Router();

router.get('/row', WeatherController.getWeatherHistoryRow);
router.get('/average', WeatherController.getWeatherHistoryAverage);

export default router; 