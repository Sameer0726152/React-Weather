function SearchBar({city, setCity, searchWeather})
{
    return(
        <>
        <input placeholder="Search City" value={city} onChange={(e) => setCity(e.target.value)}/>
        <button onClick={() => searchWeather(city)}>Search</button>
        </>
    );
}

export default SearchBar;