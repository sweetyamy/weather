import React from 'react';
import { Button } from 'react-bootstrap';

// WeatherButton 컴포넌트는 도시 목록을 버튼 형태로 표시합니다.
function WeatherButton({ cities }) {
  console.log('cities?', cities);

  return (
    <div>
      <Button variant='warning'>Current Location</Button>
      {cities.map((item, index) => (
        <Button key={index} variant='warning'>
          {item}
        </Button>
      ))}
    </div>
  );
}

export default WeatherButton;
