import Country from '../models/Country.js';

class CountryService {
  static async createCountry(countryData) {
    return await Country.create(countryData);
  }

  static async getAllCountries() {
    return await Country.findAll();
  }

  static async getCountryById(id) {
    const country = await Country.findById(id);
    if (!country) {
      throw new Error('Country not found');
    }
    return country;
  }
}

export default CountryService; 