import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      setWeather(null);
      return;
    }

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      setError('');
      const response = await axios.get(apiUrl);
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      if (err.response && err.response.status === 404) {
        setError('City not found. Please check the spelling.');
      } else {
        setError('Failed to fetch weather data. Please try again later.');
      }
    }
  };

  return (
    <section className="weather-app">
      <header>
        <h1>Weather Report</h1>
      </header>

      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
          aria-label="City Name"
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity} %</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </section>
  );
};

export default Weather;
