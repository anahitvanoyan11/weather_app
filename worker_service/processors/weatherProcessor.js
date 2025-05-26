import { Worker } from 'bullmq';
import axios from 'axios';
import db from '../db/connection.js';

const worker = new Worker('weather-queue', async (job) => {
  console.log('Processing job:', job.id);
  const { cityId } = job.data;

  const [rows] = await db.execute('SELECT name, country FROM cities WHERE id = ?', [cityId]);
  if (!rows.length) return;

  const city = rows[0];

  const weatherRes = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=40.18&longitude=44.52&current_weather=true`);
  const { temperature, weathercode } = weatherRes.data.current_weather;

  const [result] = await db.execute(
    `INSERT INTO weather_history (city_id, temperature, condition) VALUES (?, ?, ?)`,
    [cityId, temperature, weathercode.toString()]
  );

  const weatherId = result.insertId;
  await db.execute(`UPDATE cities SET current_weather_id = ? WHERE id = ?`, [weatherId, cityId]);
}, {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  }
});

worker.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err);
});