function WeatherCard({weather})
{
    return(
        <div className="weather-card">
            <h2>{weather.city}</h2>
            <p>🌡 Temperature: {weather.temp}°C</p>
            <p>💧 Humidity: {weather.humidity}%</p>
            <p>🌬 Wind: {weather.wind} m/s</p>
            <p>☁ {weather.description}</p>
        </div>
    );
}
export default WeatherCard;