import { Worker } from 'bullmq';
import axios from 'axios';
import db from '../db/connection.js';
import 'dotenv/config';

const worker = new Worker('weather_queue', async (job) => {
  const [result] = await db.execute(
    'SELECT * FROM cities WHERE id = ?',
    [job.data.cityId]
  );

  const city = result[0];
  try {
    const weatherRes = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=relative_humidity_2m,temperature_2m,wind_speed_10m,wind_direction_10m,direct_radiation`
    );
  
    //add weather_history
    const [weather_history] = await db.execute(
      'INSERT INTO weather_history (city_id, temperature, humidity, windspeed, fetched_at) VALUES (?, ?, ?, ?, ?)',
      [
        city.id,
        weatherRes.data.current.temperature_2m,
        weatherRes.data.current.relative_humidity_2m,
        weatherRes.data.current.wind_speed_10m,
        new Date()
      ]
    );

    await db.execute(
      'UPDATE cities SET current_weather_id = ? WHERE id = ?',
      [weather_history.insertId, city.id]
    );
  } catch (error) {
    console.error('Error in weather Process job:', error.message);
  }
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