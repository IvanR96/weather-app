import { useState } from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { NavBar } from './NavBar';
import axios from 'axios';
import "./index.css"




function App() {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error , setError] = useState("")
  const [loading, setLoading] = useState(false);
  
  const getBackgroundClass = () => {
  if (!weatherData) return "default-bg";
  const type = weatherData.weather[0].main.toLowerCase();
  const allowed = ["clear", "clouds", "rain", "snow"];
  return allowed.includes(type) ? type : "default-bg";
};

  

  const fetchWeather = async () =>{

    // eslint-disable-next-line no-undef
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    
    setLoading(true);   // start loading
    setError("");

    try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    const response = await axios.get(url);
    setWeatherData(response.data);
  } catch (error) {
    console.error(error);
    // Optionally set an error state to show a message in the UI
    setError("City not found");
    setWeatherData(null);
  }
  finally {
    setLoading(false); // stop loading
  }

  }

  return (
    <div className={`app ${getBackgroundClass()}`}>
    <NavBar/>
    
   <div className="search-card mx-auto p-4 mb-4 shadow rounded">
  <div className="d-flex flex-column flex-md-row gap-2">
    <Form.Control
      type="text"
      placeholder="Enter a city"
      value={city}
      onChange={e => setCity(e.target.value)}
      className="mb-2 mb-md-0"
    />
    <Button
      variant="primary"
      className="w-100 w-md-auto"
      onClick={fetchWeather}
      disabled={loading}
    >
      {loading ? "Searching..." : "Search"}
    </Button>
  </div>
</div>

    {loading && (
    <div className="text-center my-3">
      <div className="spinner-border text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )}

   {weatherData && (
  <div className="weather-card">
    <h2 className="fw-bold">{weatherData.name}</h2>
    <img
      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
      alt="icon"
    />
    <h1 className="display-4">
      {Math.round(weatherData.main.temp)}°F
    </h1>
    <p className="text-capitalize">
      {weatherData.weather[0].description}
    </p>
  </div>
)}

  {error && <div className="alert mx-auto w-50 alert-danger mt-3">{error}</div>}
  </div>
  )
}

export default App
