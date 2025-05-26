import 'dotenv/config';
import express from 'express';
import countryRoutes from './routes/countryRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import './cron/weatherJob.js'; // your cron job
import pool from './config/database.js';

// Debug environment variables
console.log('Environment Variables:', {
  MYSQL_HOST: process.env.MYSQL_HOST,
  MYSQL_PORT: process.env.MYSQL_PORT,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_USER: process.env.MYSQL_USER,
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD ? '****' : undefined
});

const app = express();

// Test database connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Database connection successful');
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit if database connection fails
  }
};

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

// Start server only after database connection is established
testConnection().then(() => {
  app.listen(PORT, () => console.log(`API Service running on port ${PORT}`));
});