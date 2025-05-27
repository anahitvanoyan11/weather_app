import City from '../models/City.js';
import axios from 'axios';

class CityService {
  static async createCity(cityName) {
    console.log('cityInfo => ', cityName);

    const existingCity = await City.findByName(cityName);
    if (existingCity) {
      throw new Error('City already exists');
    }

    //try to gether city info
    const cityInfo = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json`
    );
    
    return await City.create({
      name: cityName,
      city_name: cityInfo.data[0].name,
      latitude: cityInfo.data[0].lat,
      longitude: cityInfo.data[0].lon
    });
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

  static async getWeatherHistory(cityId) {
    return await City.getWeatherHistory(cityId);
  }
}

export default CityService; 