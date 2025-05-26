import db from '../config/database.js';

class Country {
  static async create({ name, code }) {
    const [result] = await db.execute(
      'INSERT INTO countries (name, code) VALUES (?, ?)',
      [name, code]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM countries');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM countries WHERE id = ?', [id]);
    return rows[0];
  }
}

export default Country; 