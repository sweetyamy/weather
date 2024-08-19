import React from 'react';

// WeatherBox 컴포넌트는 날씨 데이터를 받아와 화면에 표시합니다.
const WeatherBox = ({ weather, isCelsius }) => {
  // 섭씨(Celsius)에서 화씨(Fahrenheit)로 변환하는 함수
  const toFahrenheit = (celsius) => ((celsius * 9) / 5 + 32).toFixed(1);

  console.log('weather?', weather);
  if (!weather) {
    return <div>Loading...</div>; // weather 데이터가 없을 때 로딩 메시지를 표시
  }

  return (
    <div>
      <div>
        <h1>My Location </h1>
        <h3>{weather.name}</h3>
      </div>
      <div>
        <h1>
          {isCelsius ? weather.main.temp : toFahrenheit(weather.main.temp)}°
        </h1>
        {isCelsius
          ? weather.main.temp_min
          : toFahrenheit(weather.main.temp_min)}{' '}
        ~
        {isCelsius
          ? weather.main.temp_max
          : toFahrenheit(weather.main.temp_max)}
        °{isCelsius ? 'C' : 'F'}
      </div>
      <div>
        <h3>{weather.weather[0].description}</h3>
      </div>
      <div>
        <strong>Feels like:</strong>{' '}
        {isCelsius
          ? weather.main.feels_like
          : toFahrenheit(weather.main.feels_like)}
        °{isCelsius ? 'C' : 'F'}
      </div>

      <div>
        <div>
          <strong>Wind speed:</strong> {weather.wind.speed}{' '}
          {isCelsius ? 'm/s' : 'mph'}
        </div>
        <div>
          <strong>Humidity:</strong> {weather.main.humidity}%
        </div>
        <div>
          <strong>Visibility:</strong> {weather.visibility.toLocaleString()} km
        </div>
      </div>
    </div>
  );
};

export default WeatherBox;
