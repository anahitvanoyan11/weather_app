import CityService from '../services/cityService.js';
import weatherQueue from '../queues/weatherQueue.js';

class CityController {
  static async createCity(req, res) {
    try {
      const cityId = await CityService.createCity(req.body);

      // add the city to the weather queue
      await weatherQueue.add('update-weather', { cityId: cityId });

      res.status(201).json({ id: cityId, ...req.body });
    } catch (error) {
      console.log('Error creating city', error);
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllCities(req, res) {
    try {
      const cities = await CityService.getAllCities();
      res.json(cities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCityById(req, res) {
    try {
      const city = await CityService.getCityById(req.params.id);
      res.json(city);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getWeatherHistory(req, res) {
    try {
      const weatherHistory = await CityService.getWeatherHistory(req.params.id);
      res.json(weatherHistory);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getCitiesByCountry(req, res) {
    try {
      const cities = await CityService.getCitiesByCountry(req.params.countryId);
      res.json(cities);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default CityController; 