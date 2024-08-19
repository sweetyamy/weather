import React, { useState } from 'react';
import { Button, Badge, Modal } from 'react-bootstrap';

function WeatherButton({ cities, setCities, onCityClick, getCurrentPosition }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [cityToDelete, setCityToDelete] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null); // 선택된 도시를 추적하는 상태

  // 삭제 클릭 시 확인 모달을 보여줌
  const handleDeleteClick = (city) => {
    setCityToDelete(city);
    setShowConfirm(true);
  };

  // 삭제 확인 시 해당 도시를 cities 배열에서 제거
  const confirmDelete = () => {
    setCities((prevCities) =>
      prevCities.filter((city) => city !== cityToDelete)
    );
    setShowConfirm(false);
    if (selectedCity === cityToDelete) {
      setSelectedCity(null); // 삭제된 도시가 선택된 도시라면 선택 상태 초기화
    }
  };

  // 마우스 올리면 배지를 표시
  const handleMouseEnter = (e) => {
    e.currentTarget.querySelector('.delete-badge').classList.remove('d-none');
  };

  // 마우스 떠나면 배지를 숨김
  const handleMouseLeave = (e) => {
    e.currentTarget.querySelector('.delete-badge').classList.add('d-none');
  };

  // 도시 버튼 클릭 시 선택 상태 업데이트
  const handleCityClick = (city) => {
    onCityClick(city);
    setSelectedCity(city);
  };

  return (
    <div>
      <Button
        variant={selectedCity === 'Current Location' ? 'primary' : 'warning'}
        onClick={() => {
          getCurrentPosition();
          setSelectedCity('Current Location');
        }}
      >
        Current Location
      </Button>
      {cities.map((city, index) => (
        <div
          key={index}
          className='city-button-container'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Button
            variant={selectedCity === city ? 'primary' : 'warning'} // 선택된 버튼은 primary 스타일로 설정
            onClick={() => handleCityClick(city)}
          >
            {city}
          </Button>
          <Badge
            className='delete-badge d-none'
            onClick={() => handleDeleteClick(city)}
          >
            X
          </Badge>
        </div>
      ))}

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {cityToDelete} from the list?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant='danger' onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WeatherButton;
