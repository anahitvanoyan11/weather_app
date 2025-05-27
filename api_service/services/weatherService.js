import Weather from '../models/Weather.js';
import City from '../models/City.js';

class WeatherService {
  static async getWeatherHistoryRow(query) {
    // Verify city exist
    const cityName = query.city ? query.city.toLowerCase() : 'yerevan';
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
    const cityName = query.city ? query.city.toLowerCase() : 'yerevan';
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