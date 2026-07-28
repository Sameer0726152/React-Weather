import { useState } from "react";

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
    catch(error)
    {
      setError(error.message);  
      setWeather(null);
    }
    finally
    {
      setLoading(false);
    }
  }
  return(
    <>
    <h1>Weather App</h1>
    <input placeholder="Search city" value = {city} onChange={
      (event) => {setCity(event.target.value);}
    }></input>
    <button onClick={searchWeather}>Search</button>
    {loading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {weather && (
      <div>
        <h2>{weather.city}</h2>
        <p>🌡 Temperature: {weather.temp}°C</p>
        <p>💧 Humidity: {weather.humidity}%</p>
        <p>🌬 Wind: {weather.wind} m/s</p>
        <p>☁ {weather.description}</p>
      </div>
    )}
    </>
  );
}
export default App;