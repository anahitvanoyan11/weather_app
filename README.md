# Weather App API

A weather application that provides weather data for cities across different countries. The application consists of two services: an API service and a Worker service.

## Architecture

- **API Service**: Handles HTTP requests and manages data
- **Worker Service**: Processes weather data updates in the background using Redis queues
- **Database**: MySQL for storing countries, cities, and weather data
- **Queue**: Redis for managing background jobs

## Prerequisites

- Node.js (v14 or higher)
- MySQL
- Redis

## Environment Setup

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

## API Endpoints

### Countries
- `GET /countries` - Get all countries
- `POST /countries` - Create a new country
- `GET /countries/:id` - Get country by ID

### Cities
- `POST /cities` - Create a new city

### Weather
- `GET /weather/row` - Get weather history in row format
- `GET /weather/average` - Get weather history with average values

## Running the Application

1. Start Redis server
2. Start MySQL server
3. Start the API service:
```bash
cd api_service
npm install
npm start
```
4. Start the Worker service:
```bash
cd worker_service
npm install
npm start
```

## Database Schema

### Countries Table
```sql
CREATE TABLE countries (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_country_code (code)
);
```

### Cities Table
```sql
CREATE TABLE cities (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  country_id INT NOT NULL,
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  current_weather_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (country_id) REFERENCES countries(id),
  UNIQUE KEY unique_city_country (name, country_id)
);
```

### Weather History Table
```sql
CREATE TABLE weather_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  city_id INT NOT NULL,
  temperature DECIMAL(5,2) NOT NULL,
  wind_speed DECIMAL(5,2) NOT NULL,
  condition VARCHAR(50) NOT NULL,
  fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (city_id) REFERENCES cities(id)
);
```

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error message description"
}
``` 