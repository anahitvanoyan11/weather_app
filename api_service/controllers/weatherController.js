import WeatherService from '../services/weatherService.js';

class WeatherController {
  static async getWeatherHistoryRow(req, res) {
    try {
      const weather = await WeatherService.getWeatherHistoryRow(req.query);
      res.json(weather);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static async getWeatherHistoryAverage(req, res) {
    try {
      const weather = await WeatherService.getWeatherHistoryAverage(req.query);
      res.json(weather);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default WeatherController; 