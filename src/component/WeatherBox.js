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
      <div>{weather.name}</div>
      <div>
        Temp:{' '}
        {isCelsius
          ? weather.main.temp_min
          : toFahrenheit(weather.main.temp_min)}{' '}
        ~
        {isCelsius
          ? weather.main.temp_max
          : toFahrenheit(weather.main.temp_max)}
        °{isCelsius ? 'C' : 'F'} | Feels like:{' '}
        {isCelsius
          ? weather.main.feels_like
          : toFahrenheit(weather.main.feels_like)}
        °{isCelsius ? 'C' : 'F'}
      </div>
      <div>{weather.weather[0].description}</div>
      <div>
        <div>
          Wind speed: {weather.wind.speed} {isCelsius ? 'm/s' : 'mph'}
        </div>
        <div>Humidity: {weather.main.humidity}%</div>
        <div>Visibility: {weather.visibility.toLocaleString()} km</div>
      </div>
    </div>
  );
};

export default WeatherBox;
