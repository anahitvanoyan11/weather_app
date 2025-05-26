import db from '../config/database.js';

class Weather {
  static async create({ cityId, recorded_at, temperature, humidity, windspeed }) {
    const [result] = await db.execute(
      'INSERT INTO weather_history (city_id, recorded_at, temperature, humidity, windspeed) VALUES (?, ?, ?, ?, ?)',
      [cityId, recorded_at, temperature, humidity, windspeed]
    );
    return result.insertId;
  }

  static async findByCity(cityId, from, to) {
    console.log({cityId, from, to});
    const [rows] = await db.execute(`
      SELECT w.*, c.name as city_name 
      FROM weather_history w 
      JOIN cities c ON w.city_id = c.id 
      WHERE w.city_id = ? 
      AND w.recorded_at > ? 
      AND w.recorded_at < ? 
      ORDER BY w.recorded_at DESC
    `, [cityId, from, to]);
    return rows;
  }

  static async findAverage(cityId, from, to) {
    const [row] = await db.execute(`
      SELECT 
        c.name AS city_name,
        AVG(w.temperature) AS avg_temperature,
        AVG(w.humidity) AS avg_humidity,
        AVG(w.windspeed) AS avg_windspeed
      FROM weather_history w
      JOIN cities c ON w.city_id = c.id
      WHERE w.city_id = ?
        AND w.recorded_at > ?
        AND w.recorded_at < ?
      GROUP BY c.name
    `, [cityId, from, to]);    
    return row; 
  }
}

export default Weather; 