import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import WeatherDetails from './WeatherDetails';

const App = () => {
  const [cities, setCities] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const handleInputChange = (event) => {
    setCities(event.target.value);
  };

  const fetchWeather = async (cityArray) => {
    try {
      if (!apiKey) {
        setError('API key is missing.');
        return;
      }

      const responses = await Promise.all(
        cityArray.map(city =>
          axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`)
        )
      );

      const weatherResults = responses.map(response => {
        const data = response.data.data[0];
        return {
          [data.city_name]: {
            temp: data.temp,
            dew_point: data.dewpt,
            humidity: data.rh,
            wind_speed: data.wind_spd,
            cloud_cover: data.clouds,
            solar_radiation: data.solar_rad,
            precipitation: data.precip,
            snowfall: data.snow,
            condition: data.weather.description,
          }
        };
      });

      const weather = Object.assign({}, ...weatherResults);
      navigate('/weather-details', { state: { weather } });
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data');
    }
  };

  const getWeather = async () => {
    const cityArray = cities.split(',').map(city => city.trim());
    await fetchWeather(cityArray);
  };

  return (
    <div
      style={{
        backgroundImage: `url('/images/weather-background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div className="container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <header>
          <h1>Real-Time Weather Report</h1>
        </header>
        <main>
          <div className="search-section">
            <label htmlFor="cityInput">Enter cities:</label>
            <input
              type="text"
              id="cityInput"
              placeholder="mumbai, london, bidar"
              value={cities}
              onChange={handleInputChange}
            />
            <button onClick={getWeather}>Get Weather</button>
            {error && <p>{error}</p>}
          </div>
        </main>
        <footer>
          <p>&copy; 2024 Weather App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/weather-details" element={<WeatherDetails />} />
    </Routes>
  </Router>
);

export default AppWrapper;
