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

  static async getWeatherHistoryRow(query) {
    // Verify city exists
    const cityName = query.city ? query.city : 'Yerevan';
    const city = await City.findByName(cityName);

    if (!city) {
      throw new Error('City not found');
    }

    const now = new Date();
    const toDate = query.to ? query.to : now;
    const fromDate = query.from 
      ? new Date(query.from) 
      : new Date(now.getTime() - 30 * 60 * 1000); // 30 minutes earlier

    return await Weather.findByCity(city.id, fromDate, toDate);
  }

  static async getWeatherHistoryAverage(query) {
    // Verify city exists
    const cityName = query.city ? query.city : 'Yerevan';
    const city = await City.findByName(cityName);

    if (!city) {
      throw new Error('City not found');
    }

    const now = new Date();
    const toDate = query.to ? query.to : now;
    const fromDate = query.from 
      ? new Date(query.from) 
      : new Date(now.getTime() - 30 * 60 * 1000); // 30 minutes earlier

    return await Weather.findAverage(city.id, fromDate, toDate);
  }

}

export default WeatherService; 