import db from '../config/database.js';

class Weather {
  static async create({ cityId, temperature, condition, windSpeed }) {
    const [result] = await db.execute(
      'INSERT INTO weather_history (city_id, temperature, condition, wind_speed) VALUES (?, ?, ?, ?)',
      [cityId, temperature, condition, windSpeed]
    );
    return result.insertId;
  }

  static async findByCity(cityId) {
    const [rows] = await db.execute(`
      SELECT w.*, c.name as city_name 
      FROM weather_history w 
      JOIN cities c ON w.city_id = c.id 
      WHERE w.city_id = ? 
      ORDER BY w.created_at DESC
    `, [cityId]);
    return rows;
  }

  static async getCurrentWeather(cityId) {
    const [rows] = await db.execute(`
      SELECT w.*, c.name as city_name 
      FROM weather_history w 
      JOIN cities c ON w.city_id = c.id 
      WHERE w.city_id = ? 
      ORDER BY w.created_at DESC 
      LIMIT 1
    `, [cityId]);
    return rows[0];
  }
}

export default Weather; 