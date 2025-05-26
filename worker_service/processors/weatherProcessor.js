import { Worker } from 'bullmq';
import axios from 'axios';
import db from '../db/connection.js';

const worker = new Worker('weather-queue', async (job) => {
  console.log('Processing job:', job.id);
  const { cityId } = job.data;

  // Get city with its coordinates
  const [rows] = await db.execute(`
    SELECT c.*, co.name as country_name 
    FROM cities c 
    JOIN countries co ON c.country_id = co.id 
    WHERE c.id = ?
  `, [cityId]);
  
  if (!rows.length) {
    console.error(`City with id ${cityId} not found`);
    return;
  }

  const city = rows[0];
  if (!city.latitude || !city.longitude) {
    console.error(`City ${city.name} is missing coordinates`);
    return;
  }

  try {
    const weatherRes = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`
    );

    console.log(`Weather data for ${city.name}:`, weatherRes.data);
    const { temperature, weathercode, windspeed } = weatherRes.data.current_weather;

    const [result] = await db.execute(
      `INSERT INTO weather_history (city_id, temperature, wind_speed, condition) VALUES (?, ?, ?, ?)`,
      [cityId, temperature, windspeed, weathercode.toString()]
    );

    const weatherId = result.insertId;
    await db.execute(`UPDATE cities SET current_weather_id = ? WHERE id = ?`, [weatherId, cityId]);
    
    console.log(`Updated weather for ${city.name} (${city.country_name})`);
  } catch (error) {
    console.error(`Error fetching weather for ${city.name}:`, error.message);
    throw error;
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