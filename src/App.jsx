import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Chittoor");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "7e201dfc7b756f19415ccd90022de7f3";

  const fetchWeatherData = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
      );
      if (!response.ok) {
        throw new Error("invalid city");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData(city);
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clear":
        return "/sun.jpg";
      case "Rain":
        return "/rainy.jpg";
      case "Snow":
        return "/snowy.jpg";
      case "Haze":
        return "/sun1.jpg";
      default:
        return "/sun.jpg";
    }
  };

  const currentDate = new Date();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return (
    <div className="App">
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Get</button>
        </form>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        {!loading && weatherData && (
          <div className="weather_data">
            <h1 className="container_date">{formattedDate}</h1>
            <h2 className="container_city">{weatherData.name}</h2>
            <img
              className="container_img"
              src={getWeatherIconUrl(weatherData.weather?.[0]?.main)}
              width="180px"
              alt="Weather Icon"
            />
            <h2 className="container_degree">
              {Math.round(weatherData.main?.temp)}°C
            </h2>
            <h2 className="country_per">
              {weatherData.weather?.[0]?.main}
              <span className="degree_icon"></span>
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

