import WeatherService from '../services/weatherService.js';

class WeatherController {
  static async getWeatherHistory(req, res) {
    try {
      const weather = await WeatherService.getWeatherHistory(req.params.cityId);
      res.json(weather);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getCurrentWeather(req, res) {
    try {
      const weather = await WeatherService.getCurrentWeather(req.params.cityId);
      res.json(weather);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default WeatherController; 