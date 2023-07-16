
import React from 'react';
import './App.css';
import './style.css'

function App() {
  let timeStr;
  const [searchValue, setSearchValue] = React.useState("bhubaneswar");
  const [tempInfo, setTempInfo] = React.useState({});
  const [tmStr, settmStr] = React.useState("no");
  const [weatherState, setWeatheState] = React.useState("");

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=4a67da5e74535003a4664d1454d61054`;
      let res = await fetch(url);
      let data = await res.json();
      console.log(data)
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      let sec = sunset;
  let date = new Date(sec * 1000);
  timeStr = `${date.getHours()}:${date.getMinutes()}`;
  settmStr(timeStr);
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log("hi");
    }
  };
  React.useEffect(() => {
    if (tempInfo.weathermood) {
      switch (tempInfo.weathermood) {
        case "Clouds":
          setWeatheState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatheState("wi-fog");
          break;
        case "Clear":
          setWeatheState("wi-day-sunny");
          break;
        case "Mist":
          setWeatheState("wi-dust");
          break;

        default:
          setWeatheState("wi-day-sunny");
          break;
      }
    }
  }, [tempInfo.weathermood]);

  React.useEffect(() => {
    getWeatherInfo();
  }, []);
  return (
    <>
    
    <div className="wrap">
      
    <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
           >
            Search
          </button>
        </div>

        
      </div>
      <article className="widget">

      <div className="weatherIcon">
      <i className={`wi ${weatherState}`}></i>
      </div>
      <div className="weatherInfo">
      <div className="temperature">
            <span>{tempInfo.temp}&deg;</span>
          </div>
          <div className="description">
            <div className="weatherCondition">{tempInfo.weathermood}</div>
            <div className="place">
            {tempInfo.name},{tempInfo.country}
            </div>
          </div>
      </div>
      <div className="date"> {new Date().toLocaleString()} </div>
       <div className="extra-temp">
       <div className="temp-info-minmax">
       <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
              {tmStr} PM <br />
                Sunset
              </p>
        </div>
        <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
              {tempInfo.humidity}<br />
                Humidity
              </p>
        </div>
        
       </div>
       <div className="weather-extra-info">
       <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
              {tempInfo.pressure}<br />
                Pressure
              </p>
        </div>
        <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
              {tempInfo.speed} <br />
                Speed
              </p>
        </div>
       </div>
       </div>
      </article>
      </>
  );
}

export default App;
