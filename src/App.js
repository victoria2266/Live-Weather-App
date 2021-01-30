import React, { useState } from 'react';
import './App.css';
import Weathervideo from "./video/weathervideo.mp4"

// const api = {
//   key: "98e193595faf01031xxxxxxx",
//   base: "https://api.openweathermap.org/data/2.5/"
// }

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [title, setTitle] = useState('Live Weather App');

  console.log("wheater main:", weather.main);

  const search = evt => {
    if (evt.key === "Enter") {
      // fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      fetch(`${process.env.REACT_APP_API_BASE}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className="app">

      <h1>{title}</h1>

      <video autoPlay loop muted
        style={{
          width: "100%",
          minHeight: "100%"
        }}>
        <source src={(Weathervideo)} />
      </video>

      <div>
        {(typeof weather.main != "undefined") ? (
          <div className="weather-info">
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
                <div className="weather">{weather.weather[0].main}</div>
              </div>

            </div>
          </div>
        ) : ('')}
      </div>

      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        onChange={e => setQuery(e.target.value)}
        onClick={() => setTitle('')}
        value={query}
        onKeyPress={search}
      />

    </div>
  );
}

export default App;
