import cron from 'node-cron';
import db from '../config/database.js';
import weatherQueue from '../queues/weatherQueue.js';
import axios from 'axios'; 

//every 10 minutes, we need to add the city to the weather queue
cron.schedule('*/10 * * * *', async () => {
  const [cities] = await db.execute('SELECT * FROM cities');
  for (const city of cities) {
    await weatherQueue.add('update-weather', { cityId: city.id });

    try {
      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=relative_humidity_2m,temperature_2m,wind_speed_10m,wind_direction_10m,direct_radiation`
      );
    
      //add weather_history
      const [weather_history] = await db.execute(
        'INSERT INTO weather_history (city_id, recorded_at, temperature, humidity, windspeed) VALUES (?, ?, ?, ?, ?)',
        [city.id, new Date(), weatherRes.data.current.temperature_2m, weatherRes.data.current.relative_humidity_2m, weatherRes.data.current.wind_speed_10m]
      );

      await db.execute(
        'UPDATE cities SET current_weather_id = ? WHERE id = ?',
        [weather_history.insertId, city.id]
      );
    } catch (error) {
      console.error('Error in cron job:', error.message);
    }
  }
});