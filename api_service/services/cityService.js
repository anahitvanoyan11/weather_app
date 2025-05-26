import City from '../models/City.js';
import Country from '../models/Country.js';

class CityService {
  static async createCity(cityData) {
    const existingCity = await this.findByNameAndCountry(cityData.name, cityData.countryId);
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

  static async findByNameOrCode(name, code) {
    const [rows] = await db.execute(
      'SELECT * FROM countries WHERE name = ? OR code = ?',
      [name, code]
    );
    return rows[0];
  }

  static async createCountry(countryData) {
    const existingCountry = await this.findByNameOrCode(countryData.name, countryData.code);
    if (existingCountry) {
      throw new Error('Country already exists');
    }
    return await Country.create(countryData);
  }

  static async findByNameAndCountry(name, countryId) {
    const [rows] = await db.execute(
      'SELECT * FROM cities WHERE name = ? AND country_id = ?',
      [name, countryId]
    );
    return rows[0];
  }
}

export default CityService; 