import db from '../config/database.js';

class City {
  static async create({ name, city_name, latitude, longitude }) {
    const [result] = await db.execute(
      'INSERT INTO cities (name, city_name, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, city_name, latitude, longitude]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM cities');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM cities WHERE id = ?', [id]);
    return rows[0];
  }

  static async findByName(name) {
    const [rows] = await db.execute(
      'SELECT * FROM cities WHERE name = ? OR city_name = ?',
      [name, name]
    );
    return rows[0];
  }

  static async getWeatherHistory(cityId) {
    const [rows] = await db.execute(`
      SELECT w.*, c.name, c.city_name
      FROM weather_history w 
      JOIN cities c ON w.city_id = c.id 
      ORDER BY w.fetched_at DESC
    `, [cityId]); 
    return rows;
  }
}

export default City; 