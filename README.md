# Weather App API

A weather application that provides weather data for cities. The application consists of two services: an API service and a Worker service.

## Architecture

- **API Service**: Handles HTTP requests and manages data
- **Worker Service**: Processes weather data updates in the background using Redis queues
- **Database**: MySQL for storing cities and weather data
- **Queue**: Redis for managing background jobs

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- Redis

## Environment Setup

### Database Setup
1. Create a new MySQL database:
```sql
CREATE DATABASE weather_app;
```

2. Initialize the database using the provided migration file:
```bash
mysql -u root -p weather_app < api_service/db/migrations/init.sql
```

### API Service (.env)
```
# Database Configuration
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=weather_app
MYSQL_USER=root
MYSQL_PASSWORD=your_password

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Server Configuration
PORT=3000
```

### Worker Service (.env)
```
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=weather_app

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Weather API Configuration
WEATHER_API_URL=https://api.open-meteo.com/v1/forecast
```

## Getting Started

1. Start Redis server
2. Start MySQL server
3. Initialize the database using the steps in "Database Setup" above
4. Start the API service:
```bash
cd api_service
npm install
npm start
```
5. Start the Worker service:
```bash
cd worker_service
npm install
npm start
```

6. Create your first city:
```bash
curl -X POST http://localhost:3000/cities \
-H "Content-Type: application/json" \
-d '{"name": "paris"}'
```

The system will:
- Automatically fetch the city's coordinates
- Get the current weather data
- Start collecting weather history for this city
- You can view the weather history after a few minutes

## API Endpoints

### Cities
- `POST /cities` - Create a new city
  ```json
  {
    "name": "paris"  // Use Latin letters for best results
  }
  ```
  Response:
  ```json
  {
    "id": 1,
    "name": "paris",
    "city_name": "Paris",
    "latitude": 48.8566,
    "longitude": 2.3522
  }
  ```

### Weather
- `GET /weather/history/:cityId` - Get weather history for a specific city
  Response:
  ```json
  [
    {
      "id": 1,
      "city_id": 1,
      "temperature": 20.5,
      "humidity": 65.0,
      "windspeed": 12.3,
      "fetched_at": "2024-03-20T10:00:00Z",
      "name": "paris",
      "city_name": "Paris"
    }
  ]