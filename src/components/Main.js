import React, { Fragment, useEffect, useState } from "react";
import location from "../images/location.svg";
import { getWoeid, fah } from "../function";
import Spinner from "./Spinner";
const moment = require("moment");

const Main = ({ woeid, setWoeid }) => {
  const [weather, setWeather] = useState(null);
  const [temp, setTemp] = useState("c");
  const [init, setInit] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setWoeid(
          await getWoeid(position.coords.latitude, position.coords.longitude)
        );
      },
      (error) => setWoeid("44418")
    );
  }, [init]);

  useEffect(() => {
    setWeather(null);
    if (woeid) {
      fetch(
        `https://api.allorigins.win/raw?url=https://www.metaweather.com/api/location/${woeid}`
      ).then(async (res) => {
        const data = await res.json();
        setWeather(data);
      });
    }
  }, [woeid, init]);

  useEffect(() => {
    const progress = document.querySelector(".progress");
    if (weather) {
      setTimeout(() => {
        progress.style.width = `${weather.consolidated_weather[0].humidity}%`;
      }, 200);
    }
  }, [weather]);

  const open = () => {
    const search = document.querySelector(".search");
    search.classList.add("slideOut");
    search.classList.remove("slideIn");
  };

  const allowLocate = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setInit(!init);
      },
      (error) =>
        alert("Allow location access to get weather details in your location")
    );
  };

  return (
    <div className="main">
      <div className="first">
        <div className="container">
          <div className="top">
            <button onClick={open}>Seach for places</button>
            <span className="loc">
              <img src={location} alt="" onClick={allowLocate} />
            </span>
          </div>
        </div>
        <div className="body">
          <div className="bg"></div>
          {weather ? (
            <div className="weather">
              <img
                src={`https://www.metaweather.com/static/img/weather/${weather.consolidated_weather[0].weather_state_abbr}.svg`}
                alt=""
              />

              <div className="temp">
                <span className="num">
                  {temp === "c"
                    ? Math.floor(weather.consolidated_weather[0].the_temp)
                    : Math.floor(fah(weather.consolidated_weather[0].the_temp))}
                </span>
                <span className="deg">&deg;{temp === "c" ? "C" : "F"}</span>
              </div>
              <p className="type">
                {weather.consolidated_weather[0].weather_state_name}
              </p>
              <div className="date">
                <p>Today</p>
                <p>.</p>
                <p>
                  {moment(
                    weather.consolidated_weather[0].applicable_date
                  ).format("ddd Do MMMM")}
                </p>
              </div>
              <p className="place">
                <i className="fas fa-map-marker-alt"></i>
                {weather.title}
              </p>
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <div className="second">
        {weather ? (
          <Fragment>
            <div className="top">
              <div className="container2">
                <div className="temp-toggle">
                  <span
                    className={`cel ${temp === "c" ? "active" : ""}`}
                    onClick={() => setTemp("c")}
                  >
                    &deg;C
                  </span>
                  <span
                    className={`fah ${temp === "f" ? "active" : ""}`}
                    onClick={() => setTemp("f")}
                  >
                    &deg;F
                  </span>
                </div>
                <ul>
                  {weather.consolidated_weather
                    .filter(
                      (val) => val.id !== weather.consolidated_weather[0].id
                    )
                    .map((day) => (
                      <li key={day.id}>
                        <p className="date">
                          {moment(day.applicable_date).format("ll") ===
                          moment().add(1, "days").format("ll")
                            ? "Tommorow"
                            : moment(day.applicable_date).format("ddd, D MMM")}
                        </p>
                        <img
                          src={`https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`}
                          alt=""
                        />
                        <div className="temps">
                          <span className="max">
                            {temp === "c"
                              ? Math.floor(day.max_temp)
                              : Math.floor(fah(day.max_temp))}
                            <span>&deg;{temp === "c" ? "C" : "F"}</span>
                          </span>
                          <span className="min">
                            {temp === "c"
                              ? Math.floor(day.min_temp)
                              : Math.floor(fah(day.min_temp))}
                            <span>&deg;{temp === "c" ? "C" : "F"}</span>
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="bottom">
              <div className="container2">
                <h2>Todays Highlights</h2>
                <div className="grid2">
                  <div className="wind">
                    <p className="title">Wind status</p>
                    <p className="value">
                      <span>
                        {Math.floor(weather.consolidated_weather[0].wind_speed)}
                      </span>
                      mph
                    </p>
                    <p className="compass">
                      <i className="fas fa-compass"></i>
                      {weather.consolidated_weather[0].wind_direction_compass}
                    </p>
                  </div>

                  <div className="hum">
                    <p className="title">Humidity</p>
                    <p className="value">
                      <span>
                        {Math.floor(weather.consolidated_weather[0].humidity)}
                      </span>
                      %
                    </p>

                    <div className="progressCover">
                      <div className="space-out">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                      </div>
                      <div className="progressBar">
                        <div className="progress"></div>
                      </div>
                      <span style={{ float: "right" }}>%</span>
                    </div>
                  </div>
                </div>
                <div className="grid3" style={{ marginTop: "20px" }}>
                  <div className="stat">
                    <div className="title">Visibility</div>
                    <div className="value">
                      {Math.floor(weather.consolidated_weather[0].visibility)}
                      <span>miles</span>
                    </div>
                  </div>
                  <div className="stat">
                    <div className="title">Air pressure</div>
                    <div className="value">
                      {Math.floor(weather.consolidated_weather[0].air_pressure)}
                      <span>mb</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <div style={{ height: "100vh" }}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
