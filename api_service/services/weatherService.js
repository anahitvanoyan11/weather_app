import Weather from '../models/Weather.js';
import City from '../models/City.js';

class WeatherService {
  static async createWeatherRecord(weatherData) {
    // Verify city exists
    const city = await City.findById(weatherData.cityId);
    if (!city) {
      throw new Error('City not found');
    }

    // Validate required fields
    if (!weatherData.temperature || !weatherData.condition || !weatherData.windSpeed) {
      throw new Error('Temperature, condition, and wind speed are required');
    }

    return await Weather.create(weatherData);
  }

  static async getWeatherHistory(cityId) {
    // Verify city exists
    const city = await City.findById(cityId);
    if (!city) {
      throw new Error('City not found');
    }
    return await Weather.findByCity(cityId);
  }

  static async getCurrentWeather(cityId) {
    // Verify city exists
    const city = await City.findById(cityId);
    if (!city) {
      throw new Error('City not found');
    }
    const weather = await Weather.getCurrentWeather(cityId);
    if (!weather) {
      throw new Error('No weather data available for this city');
    }
    return weather;
  }
}

export default WeatherService; 