import db from '../config/database.js';

class City {
  static async create({ name, countryId, latitude, longitude }) {
    const [result] = await db.execute(
      'INSERT INTO cities (name, country_id, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, countryId, latitude, longitude]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute(`
      SELECT c.*, co.name as country_name, co.code as country_code 
      FROM cities c 
      JOIN countries co ON c.country_id = co.id
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute(`
      SELECT c.*, co.name as country_name, co.code as country_code 
      FROM cities c 
      JOIN countries co ON c.country_id = co.id 
      WHERE c.id = ?
    `, [id]);
    return rows[0];
  }

  static async findByNameAndCountry(name, countryId) {
    const [rows] = await db.execute(
      'SELECT * FROM cities WHERE name = ? AND country_id = ?',
      [name, countryId]
    );
    return rows[0];
  }

  static async findByCountry(countryId) {
    const [rows] = await db.execute(`
      SELECT c.*, co.name as country_name, co.code as country_code 
      FROM cities c 
      JOIN countries co ON c.country_id = co.id 
      WHERE c.country_id = ?
    `, [countryId]);
    return rows;
  }

  static async getWeatherHistory(cityId) {
    const [rows] = await db.execute(`
      SELECT w.*, c.name as city_name, co.name as country_name, co.code as country_code 
      FROM weather_history w 
      JOIN cities c ON w.city_id = c.id 
      JOIN countries co ON c.country_id = co.id 
      ORDER BY w.fetched_at DESC
    `, [cityId]); 
    return rows;
  }
}

export default City; 