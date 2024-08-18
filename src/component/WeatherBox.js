import React from 'react';

const WeatherBox = ({ weather }) => {
  const toFahrenheit = (celsius) => ((celsius * 9) / 5 + 32).toFixed(1);

  console.log('weather?', weather);
  if (!weather) {
    return <div>Loading...</div>; // weather 데이터가 없을 때 로딩 메시지를 표시
  }

  return (
    <div>
      {/* first row - search */}
      <div>
        <div>
          <input></input> <button>Search</button>
        </div>
        <div>
          <div>Metric: °C, m/s</div>
          <div>Metric: ℉, mph</div>
        </div>
      </div>

      {/* second row - weahter info */}
      <div>
        {/* Temp - Celsius */}
        <div>{weather.name}</div>
        {/* WeatherBox안의 If문 대신 이런식으로 &&나 삼항연산자 사용도 가능 ex) {weather && weather.name} {weather?.name} */}
        <div>
          Temp: {weather.main.temp_min} ~ {weather.main.temp_max}°C | Feels
          like: {weather.main.feels_like}°C
        </div>
        {/* Temp - Fahrenheit */}
        <div>
          Temp: {toFahrenheit(weather.main.temp_min)} ~
          {toFahrenheit(weather.main.temp_max)}°F | Feels like:
          {toFahrenheit(weather.main.feels_like)}°F
        </div>
        <div>{weather.main.description}</div>
        <div>
          <div>Wind speed: {weather.wind.speed}</div>
          <div>Humidity: {weather.main.humidity}%</div>
          <div>Visibility: {weather.visibility.toLocaleString()}km</div>
        </div>
      </div>

      {/* third row - a week info */}
      <div>
        <div>{/* graph */}</div>
        <div>Sun, Aug 18</div>
        <div>24 / 14°C</div>
        <div>Scattered clouds. Gentle Breeze</div>
        <div>*</div>
      </div>
    </div>
  );
};

export default WeatherBox;
