import 'dotenv/config';
import './processors/weatherProcessor.js'; // your BullMQ worker
console.log('Worker Service listening to queues');