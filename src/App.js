import { useEffect, useState, useCallback } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchArea from './component/SearchArea';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';

// 1. 앱이 실행되자마자(useEffect) 현재 위치 기반의 날씨가 보인다.
// 2. 날씨 정보에는 도시, 섭씨 화씨, 날씨 상태 메시지가 보인다.
// 3. 5개의 버튼이 있다 (1개는 현재 위치, 4개는 다른 도시).
//    - 유저가 검색한 지역의 버튼이 생성됨.
// 4. 도시명을 누르면 해당 도시의 날씨가 보인다.
// 5. 데이터를 가져오는 동안 로딩 스피너가 돈다.
// 6. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 보인다.

function App() {
  const [weather, setWeather] = useState(null); // 현재 날씨 데이터를 저장할 상태
  const [cities, setCities] = useState(['Seoul', 'Toronto']); // 추가된 도시 목록을 저장할 상태
  const [isCelsius, setIsCelsius] = useState(true); // 섭씨와 화씨 단위를 관리하는 상태

  // 현재 위치 기반 날씨를 가져오는 함수
  const getCurrentPosition = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      console.log('current location: lat', lat, 'lon', lon);

      getWeatherByCurrentLocation(lat, lon);
    });
  }, []);

  // 현재 위치 기반 날씨 데이터를 API로부터 가져오는 함수
  const getWeatherByCurrentLocation = async (lat, lon) => {
    const APIKey = `6b37f55cdd36fdaefcb3814bc10d46fc`;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
    let res = await fetch(url);
    let data = await res.json();
    console.log('data', data);
    setWeather(data); // 가져온 날씨 데이터를 상태에 저장
  };

  useEffect(() => {
    getCurrentPosition(); // 컴포넌트가 마운트될 때 현재 위치 기반 날씨를 가져옴
  }, [getCurrentPosition]);

  return (
    <div>
      <div className='container'>
        {/* 검색 영역 컴포넌트 */}
        <SearchArea
          cities={cities}
          setCities={setCities}
          isCelsius={isCelsius}
          setIsCelsius={setIsCelsius}
        />
        {/* 날씨 정보 표시 컴포넌트 */}
        <WeatherBox weather={weather} isCelsius={isCelsius} />
        {/* 도시 버튼 컴포넌트 */}
        <WeatherButton cities={cities} />
      </div>
    </div>
  );
}

export default App;
