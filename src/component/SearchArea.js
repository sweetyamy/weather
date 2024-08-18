import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// 검색 영역 컴포넌트
const SearchArea = ({ cities, setCities, isCelsius, setIsCelsius }) => {
  // const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태

  // 도시명을 대문자로 변환하는 함수
  const capitalizeFirstLetter = (city) => {
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  };

  // 도시를 추가하는 함수 (최대 5개까지)
  const handleCitySearch = (city) => {
    const formattedCity = capitalizeFirstLetter(city);
    if (cities.length < 4 && !cities.includes(formattedCity)) {
      setCities([...cities, formattedCity]);
    } else if (cities.length === 4) {
      alert('You can only add up to 4 cities.');
    }
  };

  // 섭씨/화씨 단위를 토글하는 함수
  const toggleTempUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className='task-input-container'>
      <div>
        <input
          className='task-input'
          id='city-input'
          placeholder='Enter city name'
        />
        <button
          className='btn-add'
          onClick={() =>
            handleCitySearch(document.getElementById('city-input').value)
          }
        >
          Add City
        </button>
      </div>
      <div className='bd-mode-toggle'>
        <div
          className={`toggle-container ${!isCelsius ? 'toggled' : ''}`}
          onClick={toggleTempUnit}
        >
          <div className='toggle-circle'></div>
          <span className='toggle-text-left'>Unit: °F</span>
          <span className='toggle-text-right'>Unit: °C</span>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
