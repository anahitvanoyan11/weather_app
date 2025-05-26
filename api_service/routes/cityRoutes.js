import express from 'express';
import CityController from '../controllers/cityController.js';

const router = express.Router();

router.post('/', CityController.createCity);

export default router; 