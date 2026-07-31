import { useState } from "react";
function useWeather(){
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(""); 
    async function searchWeather(city)
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
    
    return {weather, loading, error, searchWeather};
}

export default useWeather;