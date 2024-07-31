import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './WeatherDetails.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const WeatherDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const weather = location.state?.weather || {};

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        backgroundImage: `url('/images/weather2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <div className="weather-details-container">
        <header>
          <h1>Weather Details</h1>
        </header>
        <main>
          {Object.entries(weather).map(([city, data]) => (
            <div key={city} className="weather-card">
              <h2>{city}</h2>
              <div className="weather-info">
                <div className="info-box">
                  <i className="fas fa-thermometer-half info-icon"></i>
                  <p className="info-label">Temperature:</p>
                  <p className="info-value">{data.temp}°C</p>
                </div>
                <div className="info-box">
                  <i className="fas fa-tint info-icon"></i>
                  <p className="info-label">Dew Point:</p>
                  <p className="info-value">{data.dew_point}°C</p>
                </div>
                <div className="info-box">
                  <i className="fas fa-water info-icon"></i>
                  <p className="info-label">Relative Humidity:</p>
                  <p className="info-value">{data.humidity}%</p>
                </div>
                <div className="info-box">
                  <i className="fas fa-wind info-icon"></i>
                  <p className="info-label">Wind Speed:</p>
                  <p className="info-value">{data.wind_speed} km/h</p>
                </div>
                <div className="info-box">
                  <i className="fas fa-cloud info-icon"></i>
                  <p className="info-label">Cloud Cover:</p>
                  <p className="info-value">{data.cloud_cover}%</p>
                </div>
                <div className="info-box">
                  <i className="fas fa-sun info-icon"></i>
                  <p className="info-label">Solar Radiation:</p>
                  <p className="info-value">{data.solar_radiation} W/m²</p>
                </div>
                <div className="info-box">
                  <i className="fas fa-cloud-showers-heavy info-icon"></i>
                  <p className="info-label">Precipitation:</p>
                  <p className="info-value">{data.precipitation} mm</p>
                </div>
                <div className="info-box">
                  <i className="fas fa-snowflake info-icon"></i>
                  <p className="info-label">Snowfall:</p>
                  <p className="info-value">{data.snowfall} mm</p>
                </div>
                <div className="info-box">
                  <i className="fas fa-cloud-sun info-icon"></i>
                  <p className="info-label">Condition:</p>
                  <p className="info-value">{data.condition}</p>
                </div>
              </div>
            </div>
          ))}
        </main>
        <footer>
          <p>&copy; 2024 Weather App. All rights reserved.</p>
        </footer>
        <div className="back-button-container">
          <button onClick={handleBackClick}>Back to Search</button>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
