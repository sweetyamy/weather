import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchArea = ({
  cities,
  setCities,
  initialCities,
  isCelsius,
  setIsCelsius
}) => {
  const APIKey = `6b37f55cdd36fdaefcb3814bc10d46fc`;
  const inputRef = useRef(null); // input box에 접근하기 위한 ref 생성

  // 도시명을 대문자로 변환하는 함수
  const capitalizeFirstLetter = (city) => {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  };

  // API를 통해 도시의 유효성을 검사하는 함수
  const checkCityValidity = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (res.status === 404 || data.cod === '404' || !isNaN(cityName)) {
      // 도시가 API에서 유효하지 않으면 false 반환
      return false;
    }
    return true; // 유효하면 true 반환
  };

  // 도시를 추가하는 함수 (최대 4개까지)
  const handleCitySearch = async () => {
    const city = inputRef.current.value;
    const formattedCity = capitalizeFirstLetter(city);

    // 도시 이름의 유효성 검사
    const isValidCity = await checkCityValidity(formattedCity);

    if (!isValidCity) {
      alert('Please enter a valid city name.');
      return; // 유효하지 않으면 함수 종료
    }

    if (cities.length < 4 && !cities.includes(formattedCity)) {
      setCities([...cities, formattedCity]); // 유효한 도시만 배열에 추가
      inputRef.current.value = ''; // input box 초기화
    } else if (cities.length === 4) {
      alert('You can only add up to 4 cities.');
    }
  };

  // 섭씨/화씨 단위를 토글하는 함수
  const toggleTempUnit = () => {
    setIsCelsius(!isCelsius);
  };

  // 리셋 함수
  const handleReset = () => {
    setCities([...initialCities]);
    inputRef.current.value = '';
  };

  return (
    <div className='task-input-container'>
      <div>
        <input
          className='task-input'
          ref={inputRef}
          id='city-input'
          placeholder='Enter city name'
        />
        <button className='btn-add' onClick={handleCitySearch}>
          Add City
        </button>

        <button className='btn-add' onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className='bd-mode-toggle'>
        <div
          className={`toggle-container ${!isCelsius ? 'toggled' : ''}`}
          onClick={toggleTempUnit}
        >
          <div className='toggle-circle'></div>
          <span className='toggle-text-left'>Unit: °C</span>
          <span className='toggle-text-right'>Unit: °F</span>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
