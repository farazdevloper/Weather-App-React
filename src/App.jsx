import React, { useState } from "react";
import { CloudSun, Droplets, Wind, MapPin, Search } from "lucide-react";

export default function App() {

  const [city, setCity] = useState('');
  const [weatherDetail, setWeatherDetail] = useState();

  const getWeather = (e) =>{
    fetch(`https://api.weatherapi.com/v1/current.json?key=cd74a19b42a14df58ef61651260501&q=${city}&aqi=yes`)
    .then((res)=>res.json())
    .then((response)=>{
      if(response.cod=="404"){
        setWeatherDetail(undefined);
      }
      else{
        setWeatherDetail(response);
      }
    })

    e.preventDefault();
    setCity('');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-4">

      
      {/* Glass Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-8 text-white border border-white/30">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-lg font-semibold tracking-wide">
            <MapPin className="text-white/80" />
            <span>
              {weatherDetail
                ? `${weatherDetail.location.name}, ${weatherDetail.location.country}`
                : "Search Your City"}
            </span>
          </div>

          {weatherDetail === undefined
            ? <CloudSun size={42} className="text-yellow-300 drop-shadow-lg" />
            : <img
                src={weatherDetail.current.condition.icon}
                alt="weather icon"
                className="w-12 h-12"
              />
          }
        </div>

        {/* Search  Your City */}
        <form
          onSubmit={getWeather}
          className="flex items-center gap-3 bg-white/30 rounded-2xl px-5 py-3 mb-8 shadow-inner"
        >
          <Search size={18} className="text-white/80" />
          <input
            type="text"
            placeholder="Enter city name..."
            className="w-full bg-transparent outline-none placeholder-white/70 text-sm tracking-wide"
            value={city}
            onChange={(e)=> setCity(e.target.value)}
          />
        </form>

        {
          weatherDetail !== undefined
          ?
          <>
            {/* Temperature */}
            <div className="text-center mb-10">
              <h1 className="text-7xl font-extrabold tracking-tight drop-shadow-lg">
                {weatherDetail.current.temp_c}°
              </h1>
              <p className="text-lg mt-2 text-white/90">
                {weatherDetail.current.condition.text}
              </p>
            </div>

            {/* Other Details */}
            <div className="grid grid-cols-3 gap-4">
              
              <div className="group rounded-2xl bg-white/25 p-4 text-center hover:bg-white/35 transition">
                <Droplets className="mx-auto mb-2 text-cyan-200 group-hover:scale-110 transition" />
                <p className="text-xs uppercase tracking-wider">Humidity</p>
                <p className="text-lg font-semibold">{weatherDetail.current.humidity}%</p>
              </div>

              <div className="group rounded-2xl bg-white/25 p-4 text-center hover:bg-white/35 transition">
                <Wind className="mx-auto mb-2 text-emerald-200 group-hover:scale-110 transition" />
                <p className="text-xs uppercase tracking-wider">Wind</p>
                <p className="text-lg font-semibold">{weatherDetail.current.wind_kph} km/h</p>
              </div>

              <div className="group rounded-2xl bg-white/25 p-4 text-center hover:bg-white/35 transition">
                <CloudSun className="mx-auto mb-2 text-yellow-200 group-hover:scale-110 transition" />
                <p className="text-xs uppercase tracking-wider">Feels Like</p>
                <p className="text-lg font-semibold">{weatherDetail.current.feelslike_c}°</p>
              </div>

            </div>
          </>
          :
          <p className="text-center text-white/80 text-sm">
            No data found. Please search a city.
          </p>
        }

        {/* Footer */}
        <div className="mt-8 text-center text-[11px] tracking-widest text-white/60">
          Weather App • React + Tailwind
        </div>
      </div>
    </div>
  );
}
