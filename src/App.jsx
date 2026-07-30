import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App()
{
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function searchWeather()
  {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
    try
    {

      if(city.trim() === "")
      {
        setError("Please enter a city");
        return;
      }

      setLoading(true);
      setError("");
      setWeather(null);
      const response = await fetch(url);

      if(!response.ok)
      {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather({
        city: data.name,
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        description: data.weather[0].description
      });
    }
    catch(err)
    {
      setError(err.message);  
      setWeather(null);
    }
    finally
    {
      setLoading(false);
    }
  }
  return(
    <div className="app">
      <h1>Weather App</h1>
      <SearchBar city={city} setCity={setCity} searchWeather={searchWeather}/>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && <WeatherCard weather={weather}/>}
    </div>);
}
export default App;