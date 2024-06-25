import React, { useState } from "react";
import Img1 from '/Cloudy-Sun--Streamline-Ux.svg'

import { FaWind } from "react-icons/fa";
import { FaWater } from "react-icons/fa";
import { WiDayCloudyGusts } from "react-icons/wi";
// Define the API configuration interface
interface ApiWeather {
    key: string;
    base: string;
}

const api: ApiWeather = {
    key: 'accc3b5ec756372de4a2d02a13952039',
    base: 'https://api.openweathermap.org/data/2.5/',
}

// Define the structure of the API response
interface weatherRes {
    cod: string;
    message: string;
    name: string;
    main: {
        temp: number;
        humidity: number;
        pressure: number;
        sea_level: number;
    };
    weather: {
        description: string;
    }[];
    wind: {
        speed: number;
        gust: number;
    };
}

// Make a type for the state that allows partial values
type weatherState = Partial<weatherRes>;

const Weather: React.FC = () => {
    const [isSearch, setSearch] = useState<string>('');
    const [isWeather, setWeather] = useState<weatherState>({});

    const search = () => {
        fetch(`${api.base}weather?q=${isSearch}&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then((result: weatherRes) => {
                setWeather(result);
                console.log(result)
                console.log('working');
            })
            .catch(error => {
                console.error('error data fetching', error);
            });
    }

    const convertToFahrenheit = (celsius: number): number => {
        return (celsius * 9 / 5) + 32;
    }

    return (
        <>
            <div className='main-container'>
                <div className='weather-container'>
                    <div className='card'>
                        <div className='title'><span>W</span>eather <span>A</span>pp</div><br />
                        <div className='search-box'>
                            <input
                                type='text'
                                placeholder="Search city/town"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button onClick={search}>Search</button>
                        </div><br />
                        <div className='img'>
                            <img src={Img1} />
                        </div><br />
                        <div className='location'>
                            <h1>{isWeather.name}</h1>
                        </div>
                        <div className='temperature'>
                            {isWeather.main && (
                                <>
                                    <p className='celsius'>{isWeather.main.temp.toFixed(2)} °C</p>
                                    <p className='fahrenheit'>{convertToFahrenheit(isWeather.main.temp).toFixed(2)} °F</p>
                                </>
                            )}
                        </div>
                        <div className='condition'>
                            <h2>{isWeather.weather ? isWeather.weather[0].description : ''}</h2>
                        </div><br />
                        <div className="card-footer">
                            <div className='card1'><FaWind className='Icon1' /><p>Wind Speed</p>{isWeather.wind && (isWeather.wind.speed)}</div>
                            <div className='card2'><WiDayCloudyGusts className='Icon2' /><p>Gust</p>{isWeather.wind && (isWeather.wind.gust)}</div>
                            <div className='card3'><FaWater /><p>Sea level</p>{isWeather.main && (isWeather.main.sea_level)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Weather;
