import { useEffect, useState, useCallback } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';

// 1. 앱이 실행되자마자(useEffect)현재 위치기반의 날씨가 보인다
// 2. 날씨 정보에는 도시, 섭씨 화씨, 날씨 상태 메세지가 보인다
// 3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른 도시)
//    - 유저가 검색한 지역의 버튼이 생성됨
// 4. 도시명을 누르면 해당 도시의 날씨가 보인다
// 5. 데이터를 가져오는 동안 로딩 스피너가 돈다
// 6. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 보인다
//
function App() {
  const [weather, setWeather] = useState(null);
  const cities = ['Seoul', 'Toronto', 'Vancouver', 'Quebec'];

  const getCurrentPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log('current location: let', lat, 'lon', lon);

      getWeatherByCurrentLocation(lat, lon);
    });
  }, []);

  const getWeatherByCurrentLocation = async (lat, lon) => {
    const APIKey = `6b37f55cdd36fdaefcb3814bc10d46fc`;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
    let res = await fetch(url);
    let data = await res.json();
    console.log('data', data);
    setWeather(data);
  };

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  return (
    <div>
      <div className='container'>
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} />
      </div>
    </div>
  );
}

export default App;
