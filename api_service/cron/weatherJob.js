import cron from 'node-cron';
import db from '../config/database.js';
import weatherQueue from '../queues/weatherQueue.js';

//every 10 minutes, we need to add the city to the weather queue
cron.schedule('*/10 * * * *', async () => {
  const [cities] = await db.execute('SELECT id FROM cities');
  console.log('cities', cities);
  for (const city of cities) {
    await weatherQueue.add('update-weather', { cityId: city.id });
  }
});