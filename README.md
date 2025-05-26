# Weather App

A weather application that tracks weather conditions for cities across different countries. The application consists of two main services: an API service and a Worker service.

## Project Structure

```
weather_app/
├── api_service/          # API Service
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   └── cron/           # Scheduled tasks
└── worker_service/      # Worker Service
    └── processors/     # Queue processors
```

## Features

- Country and city management
- Weather data tracking
- Real-time weather updates
- Historical weather data
- Queue-based processing for weather updates

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- Redis
- npm or yarn

## Environment Variables

Create `.env` files in both `api_service` and `worker_service` directories based on the provided `example.env` files.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/anahitvanoyan11/weather_app.git
   cd weather_app
   ```

2. Install dependencies for both services:
   ```bash
   # Install API service dependencies
   cd api_service
   npm install

   # Install Worker service dependencies
   cd ../worker_service
   npm install
   ```

3. Set up the database:
   - Create a MySQL database
   - Update the database configuration in `.env` files
   - Run the database migrations (if any)

4. Start Redis server:
   ```bash
   redis-server
   ```

5. Start the application:
   ```bash
   # From the root directory
   ./start.sh
   ```

## API Endpoints

### Countries
- `GET /countries` - Get all countries
- `POST /countries` - Create a new country
- `GET /countries/:id` - Get country by ID

### Cities
- `GET /cities` - Get all cities
- `POST /cities` - Create a new city
- `GET /cities/:id` - Get city by ID
- `GET /cities/country/:countryId` - Get cities by country

### Weather
- `GET /weather/city/:cityId` - Get weather history for a city
- `GET /weather/city/:cityId/current` - Get current weather for a city

## Development

- API Service runs on port 3000 by default
- Worker Service processes weather update queues
- Weather data is updated periodically via cron jobs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 