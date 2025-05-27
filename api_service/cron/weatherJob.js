import cron from 'node-cron';
import db from '../config/database.js';
import weatherQueue from '../queues/weatherQueue.js';

//every 10 minutes, we need to add the city to the weather queue
cron.schedule('*/10 * * * *', async () => {
  const [cities] = await db.execute('SELECT * FROM cities');

  // TODO: Decide whether to enqueue full city data or just cityId.
  // Enqueuing only cityId keeps the queue lightweight and ensures fresh DB reads in the worker. 
  // Enqueuing full city data avoids extra DB calls but risks stale info if city data changes before processing.
  for (const city of cities) {
    await weatherQueue.add('update-weather', { cityId: city.id });
  }
});