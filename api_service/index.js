import 'dotenv/config';
import express from 'express';
import countryRoutes from './routes/countryRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import './cron/weatherJob.js'; // your cron job

const app = express();

app.use(express.json());

// Routes
app.use('/countries', countryRoutes);
app.use('/cities', cityRoutes);
app.use('/weather', weatherRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Service running on port ${PORT}`));