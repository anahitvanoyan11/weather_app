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
}

export default CityController; 