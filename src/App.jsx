import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import useWeather from "./hooks/useweather";

function App()
{
  const [city, setCity] = useState("");
  const {weather, loading, error, searchWeather} = useWeather();

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