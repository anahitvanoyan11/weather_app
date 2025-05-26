import CountryService from '../services/countryService.js';

class CountryController {
  static async createCountry(req, res) {
    try {
      console.log('Creating country', req.body);
      const countryId = await CountryService.createCountry(req.body);
      res.status(201).json({ id: countryId, ...req.body });
    } catch (error) {
      console.log('Error creating country', error);
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllCountries(req, res) {
    try {
      const countries = await CountryService.getAllCountries();
      res.json(countries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCountryById(req, res) {
    try {
      const country = await CountryService.getCountryById(req.params.id);
      res.json(country);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

export default CountryController; 