import City from '../models/City.js';
import Country from '../models/Country.js';

class CityService {
  static async createCity(cityData) {
    const existingCity = await City.findByNameAndCountry(cityData.name, cityData.countryId);
    if (existingCity) {
      throw new Error('City already exists in this country');
    }
    // Verify country exists
    const country = await Country.findById(cityData.countryId);
    if (!country) {
      throw new Error('Country not found');
    }

    return await City.create(cityData);
  }

  static async getAllCities() {
    return await City.findAll();
  }

  static async getCityById(id) {
    const city = await City.findById(id);
    if (!city) {
      throw new Error('City not found');
    }
    return city;
  }

  static async getCitiesByCountry(countryId) {
    // Verify country exists
    const country = await Country.findById(countryId);
    if (!country) {
      throw new Error('Country not found');
    }
    return await City.findByCountry(countryId);
  }

  static async getWeatherHistory(cityId) {
    return await City.getWeatherHistory(cityId);
  }
}

export default CityService; 