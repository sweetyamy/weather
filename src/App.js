import { useEffect, useState, useCallback } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchArea from './component/SearchArea';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red'
};

function App() {
  const [weather, setWeather] = useState(null);

  const initialCities = ['Seoul', 'Toronto'];
  const [cities, setCities] = useState(initialCities);

  const [isCelsius, setIsCelsius] = useState(true);
  const APIKey = `6b37f55cdd36fdaefcb3814bc10d46fc`;

  let [loading, setLoading] = useState(true);
  let [color] = useState('#ffffff');

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
    setLoading(true); // 로딩 시작
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
      let res = await fetch(url);
      let data = await res.json();
      console.log('data', data);
      setWeather(data);
    } catch (error) {
      console.error('Failed to fetch weather data', error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const getWeatherByCity = async (cityName) => {
    setLoading(true); // 로딩 시작
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`;
      let res = await fetch(url);
      let data = await res.json();
      console.log('selected city data', data);
      setWeather(data); // 선택된 도시의 날씨 데이터 업데이트
    } catch (error) {
      console.error('Failed to fetch city weather data', error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const handleCityClick = (city) => {
    getWeatherByCity(city); // 선택된 도시의 날씨를 가져옴
    setCities((prevCities) => {
      if (!prevCities.includes(city)) {
        return [...prevCities, city]; // 기존 배열에 새 도시 추가
      }
      return prevCities; // 도시가 이미 목록에 있으면 그대로 유지
    });
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
          initialCities={initialCities} // 초기 도시 목록을 전달
        />
        {/* 로딩 스피너 */}
        {loading ? (
          <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        ) : (
          <WeatherBox weather={weather} isCelsius={isCelsius} />
        )}
        {/* 도시 버튼 컴포넌트 */}
        <WeatherButton
          cities={cities}
          setCities={setCities}
          onCityClick={handleCityClick}
          getCurrentPosition={getCurrentPosition}
        />
      </div>
    </div>
  );
}

export default App;
