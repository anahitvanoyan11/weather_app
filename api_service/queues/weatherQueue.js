import { Queue } from 'bullmq';    
const weatherQueue = new Queue('weather_queue', {
  connection: { host: 'localhost', port: 6379 },
});

export default weatherQueue;