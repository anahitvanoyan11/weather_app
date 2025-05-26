-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(3) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_country_name (name),
    UNIQUE KEY unique_country_code (code)
);

-- Create cities table
CREATE TABLE IF NOT EXISTS cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    country_id INT NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    current_weather_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON DELETE CASCADE,
    UNIQUE KEY unique_city_country (name, country_id)
);

-- Create weather_history table
CREATE TABLE IF NOT EXISTS weather_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    city_id INT NOT NULL,
    temperature DECIMAL(5,2) NOT NULL,
    wind_speed DECIMAL(5,2) NOT NULL,
    fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

-- Add foreign key for current_weather_id in cities table
ALTER TABLE cities
ADD CONSTRAINT fk_current_weather
FOREIGN KEY (current_weather_id) REFERENCES weather_history(id) ON DELETE SET NULL; 