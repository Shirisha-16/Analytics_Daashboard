'use client';

import React, { useState, useEffect } from 'react';
import {DashboardLayout} from '@/components/dashboard-layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from "@/lib/utils";

// Weather animation components
const SunnyAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-10 right-10 md:top-20 md:right-20 w-24 h-24 md:w-32 md:h-32 rounded-full bg-yellow-300 animate-pulse shadow-lg shadow-yellow-500/50">
      {/* Sun rays */}
      <div className="absolute inset-0 animate-spin-slow">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-2 md:w-3 h-12 md:h-16 bg-yellow-200 rounded-full left-1/2 top-1/2 -ml-1 origin-bottom" 
            style={{ transform: `rotate(${i * 45}deg) translateY(-32px)` }}
          ></div>
        ))}
      </div>
    </div>
  </div>
);

const CloudyAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Multiple clouds moving at different speeds */}
    <div className="absolute top-10 left-10 animate-float-slow">
      <div className="relative w-20 h-8 bg-white/70 rounded-full shadow-lg"></div>
      <div className="absolute w-10 h-10 bg-white/70 rounded-full -top-4 left-3"></div>
      <div className="absolute w-10 h-10 bg-white/70 rounded-full -top-2 left-10"></div>
    </div>
    <div className="absolute top-20 right-20 animate-float">
      <div className="relative w-32 h-10 bg-white/80 rounded-full shadow-lg"></div>
      <div className="absolute w-16 h-16 bg-white/80 rounded-full -top-6 left-6"></div>
      <div className="absolute w-16 h-16 bg-white/80 rounded-full -top-3 right-6"></div>
    </div>
    <div className="absolute top-40 left-1/4 animate-float-delay">
      <div className="relative w-24 h-8 bg-white/60 rounded-full shadow-lg"></div>
      <div className="absolute w-12 h-12 bg-white/60 rounded-full -top-5 left-4"></div>
      <div className="absolute w-12 h-12 bg-white/60 rounded-full -top-2 left-12"></div>
    </div>
  </div>
);

const RainyAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Cloud */}
    <div className="absolute top-10 left-1/4 right-1/4">
      <div className="relative w-full h-12 bg-gray-400/90 rounded-full shadow-lg"></div>
      <div className="absolute w-16 h-16 bg-gray-400/90 rounded-full -top-8 left-8"></div>
      <div className="absolute w-20 h-20 bg-gray-400/90 rounded-full -top-6 left-1/4"></div>
      <div className="absolute w-16 h-16 bg-gray-400/90 rounded-full -top-8 right-8"></div>
    </div>
    
    {/* Raindrops */}
    {[...Array(20)].map((_, i) => (
      <div 
        key={i} 
        className="absolute w-1 h-6 bg-blue-300/70 rounded-full animate-rainfall"
        style={{
          left: `${5 + (i * 5)}%`, 
          animationDelay: `${(i % 5) * 0.3}s`,
          animationDuration: `${0.8 + Math.random() * 0.6}s`
        }}
      ></div>
    ))}
  </div>
);

const ThunderstormAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Cloud */}
    <div className="absolute top-10 left-1/4 right-1/4">
      <div className="relative w-full h-12 bg-gray-600/90 rounded-full shadow-lg"></div>
      <div className="absolute w-16 h-16 bg-gray-600/90 rounded-full -top-8 left-8"></div>
      <div className="absolute w-20 h-20 bg-gray-600/90 rounded-full -top-6 left-1/4"></div>
      <div className="absolute w-16 h-16 bg-gray-600/90 rounded-full -top-8 right-8"></div>
    </div>
    
    {/* Lightning */}
    <div className="absolute top-24 left-1/2 -ml-4 w-8 h-20 animate-lightning">
      <div className="w-full h-full bg-yellow-300" 
        style={{
          clipPath: "polygon(50% 0%, 0% 50%, 50% 50%, 30% 100%, 100% 40%, 50% 40%, 70% 0%)"
        }}
      ></div>
    </div>
    
    {/* Raindrops */}
    {[...Array(15)].map((_, i) => (
      <div 
        key={i} 
        className="absolute w-1 h-6 bg-blue-300/70 rounded-full animate-rainfall"
        style={{
          left: `${5 + (i * 6)}%`, 
          animationDelay: `${(i % 5) * 0.3}s`,
          animationDuration: `${0.8 + Math.random() * 0.6}s`
        }}
      ></div>
    ))}
  </div>
);

const SnowyAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Snowflakes */}
    {[...Array(30)].map((_, i) => (
      <div 
        key={i} 
        className="absolute bg-white rounded-full animate-snowfall"
        style={{
          width: `${3 + Math.random() * 5}px`,
          height: `${3 + Math.random() * 5}px`,
          left: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 5}s`
        }}
      ></div>
    ))}
  </div>
);

const FogAnimation = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Fog layers */}
    <div className="absolute inset-x-0 h-12 bg-gray-400/30 blur-md animate-fog" style={{ top: '20%' }}></div>
    <div className="absolute inset-x-0 h-16 bg-gray-400/40 blur-md animate-fog-slow" style={{ top: '35%' }}></div>
    <div className="absolute inset-x-0 h-12 bg-gray-400/30 blur-md animate-fog-reverse" style={{ top: '50%' }}></div>
    <div className="absolute inset-x-0 h-20 bg-gray-400/20 blur-md animate-fog-slow-reverse" style={{ top: '65%' }}></div>
  </div>
);

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  name: string;
}

const WeatherPage = () => {
  const [city, setCity] = useState<string>('Hyderabad');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [backgroundClass, setBackgroundClass] = useState<string>('bg-gray-100 text-gray-800');
  const [weatherAnimation, setWeatherAnimation] = useState<React.ReactNode | null>(null);

  // Access the API key from environment variables
  const API_KEY = process.env.NEXT_PUBLIC_OWM_API_KEY;

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setBackgroundClass('bg-gray-100 text-gray-800');
    setWeatherAnimation(null);

    if (!API_KEY) {
      setError("Weather API Key is not configured. Please set NEXT_PUBLIC_OWM_API_KEY in your .env.local file.");
      setLoading(false);
      return;
    }

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        const errorData = await response.json();
        setError(`Failed to fetch weather data: ${errorData.message || response.statusText}`);
        return;
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err: any) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    // Update background and animation based on weather data
    if (weatherData) {
      const mainWeather = weatherData.weather[0]?.main.toLowerCase();
      
      // Set background classes
      switch (mainWeather) {
        case 'clear':
          setBackgroundClass('bg-gradient-to-br from-blue-400 via-sky-300 to-yellow-200 text-white');
          setWeatherAnimation(<SunnyAnimation />);
          break;
        case 'clouds':
          setBackgroundClass('bg-gradient-to-br from-gray-500 via-gray-600 to-gray-800 text-white');
          setWeatherAnimation(<CloudyAnimation />);
          break;
        case 'rain':
        case 'drizzle':
          setBackgroundClass('bg-gradient-to-br from-blue-700 via-blue-900 to-gray-900 text-white');
          setWeatherAnimation(<RainyAnimation />);
          break;
        case 'thunderstorm':
          setBackgroundClass('bg-gradient-to-br from-purple-900 via-gray-950 to-black text-white');
          setWeatherAnimation(<ThunderstormAnimation />);
          break;
        case 'snow':
          setBackgroundClass('bg-gradient-to-br from-blue-50 via-blue-100 to-gray-200 text-gray-800');
          setWeatherAnimation(<SnowyAnimation />);
          break;
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'fog':
          setBackgroundClass('bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-gray-800');
          setWeatherAnimation(<FogAnimation />);
          break;
        default:
          setBackgroundClass('bg-gray-100 text-gray-800');
          setWeatherAnimation(null);
      }
    } else {
      setBackgroundClass('bg-gray-100 text-gray-800');
      setWeatherAnimation(null);
    }
  }, [weatherData]);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather();
    }
  };
  
  return (
    <DashboardLayout>
      {/* Apply dynamic background class to the main content div */}
      <div className={cn("p-4 min-h-screen transition-colors duration-500 relative", backgroundClass)}>
        {/* Weather Animation Layer */}
        {weatherAnimation}
        
        <Card className="w-full max-w-md mx-auto mb-4 bg-white/70 backdrop-blur-md shadow-xl rounded-xl border border-gray-200 relative z-10">
          <CardHeader>
            <CardTitle className="text-gray-900">Check Weather</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                className="bg-white/90 text-gray-900 border-gray-300 placeholder-gray-500"
              />
              <Button onClick={handleSearch} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
                {loading ? 'Fetching...' : 'Search'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {loading && <p className="text-center relative z-10">Loading weather data...</p>}
        {error && <p className="text-red-300 text-center relative z-10">{error}</p>}

        {weatherData && (
          <Card className="w-full max-w-md mx-auto bg-white/70 backdrop-blur-md shadow-xl rounded-xl border border-gray-200 relative z-10">
            <CardHeader>
              <CardTitle className="text-gray-900">{weatherData.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-gray-800">
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Feels like: {weatherData.main.feels_like}°C</p>
              <p>Description: {weatherData.weather[0]?.description}</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              {weatherData.weather[0]?.icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  alt={weatherData.weather[0].description}
                  className="w-24 h-24 mx-auto"
                />
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default WeatherPage;