import React, { useEffect, useState } from 'react';
import Search from "../SearchBar/SearchBar";

const WeatherComponent = () => {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

    const handleSearch = () => {
        fetchWeatherData(search);
    };

    const getCurrentDate = () => new Date().toLocaleDateString('en-us', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const fetchWeatherData = async (search) => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`);

            const data = await response.json();
            if (data) {
                setWeatherData(data);
                setLoading(false);
            }
        }
        catch (err) {
            setLoading(false);
            console.log(err);
        }
    };

    const kelvinToCelcius = (temperature) => temperature - 273.15;
    
    useEffect(() => {
        fetchWeatherData("vadodara");
    }, []);

    return (
        <div>
            <Search
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {
                loading ? (<div className='loading'>Loading...</div>
                ) : (
                    <div>
                        <div className='city-name'>
                            <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
                        </div>
                        <div className='date'>
                            <span>{getCurrentDate()}</span>
                        </div>
                        <div className='temperature'>{kelvinToCelcius(weatherData?.main?.temp)}°C</div>
                        <p className='description'>
                            {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}
                        </p>
                        <div className='weather-info'>
                            <div className='column'>
                                <div>
                                    <p className='wind'>{weatherData?.wind?.speed}</p>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                            <div className='column'>
                                <div>
                                    <p className='humidity'>{weatherData?.main?.humidity}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default WeatherComponent