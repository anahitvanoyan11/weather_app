import { Queue } from 'bullmq';    
const weatherQueue = new Queue('weatherQueue', {
  connection: { host: 'localhost', port: 6379 },
});

export default weatherQueue;