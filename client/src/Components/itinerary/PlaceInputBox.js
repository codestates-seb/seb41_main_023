import { StandaloneSearchBox } from '@react-google-maps/api';
import styled from 'styled-components';
import axios from 'axios';
import { getCookie } from '../../Util/Cookies';
import PlanDropDown from './PlanDropDown';
import { useState } from 'react';

const InputContainer = styled.div`
  display: flex;
  gap: var(--spacing-2);
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > .search__input {
    position: relative;
    width: 100%;

    input {
      min-width: 100%;
    }

    > .svg-icon--20 {
      margin-left: 6px;
      width: 20px;
    }
  }
`;

const PlaceInputBox = (props) => {
  const { searchBox, setSearchBox, singlePlanData, handleGeoCode, refresh, handleRefresh } = props;

  const [selectedDateId, setSelectedDateId] = useState(null);

  const onLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    if (searchBox !== '') {
      const place = searchBox.getPlaces()[0];
      const name = place.name;
      const rating = place.rating;
      const website = place.website;
      const formattedAddress = place.formatted_address;
      const phoneNumber = place.formatted_phone_number;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      let openingHours;

      if (place.opening_hours !== undefined) {
        openingHours = `${place.opening_hours.weekday_text[0]}, ${place.opening_hours.weekday_text[1]},${place.opening_hours.weekday_text[2]},${place.opening_hours.weekday_text[3]},${place.opening_hours.weekday_text[4]},${place.opening_hours.weekday_text[5]},${place.opening_hours.weekday_text[6]}`;
      }

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/places/${selectedDateId}`,
          {
            placeName: name,
            latitude: lat,
            longitude: lng,
            placeAddress: formattedAddress,
            ratings: rating,
            website: website,
            phone: phoneNumber,
            openingHours: openingHours,
          },
          {
            headers: {
              Authorization: getCookie('accessToken'),
            },
          }
        )
        .then((res) => {
          handleRefresh();
        })
        .catch((err) => console.log(err));

      handleGeoCode(lat, lng);
    }

    if (selectedDateId === null) {
      alert('먼저 날짜를 선택해주세요!!');
    }
  };

  const handleOnKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.target.value = '';
    }
  };

  return (
    <InputContainer>
      <div className='search__input'>
        <div className='svg-icon--20'>
          <svg viewBox='0 0 16 16'>
            <path
              fillRule='evenodd'
              fill='currentColor'
              d='M8.403 13.958a.5.5 0 0 1-.806 0C4.866 10.243 3.5 7.59 3.5 6c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5c0 1.59-1.366 4.243-4.097 7.958zM8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'
            ></path>
          </svg>
        </div>
        <StandaloneSearchBox className='search__box' onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
          <input className='input--default-icon' type={'text'} placeholder={'Add a place'} onKeyPress={handleOnKeyPress} />
        </StandaloneSearchBox>
      </div>
      <PlanDropDown
        singlePlanData={singlePlanData}
        selectedDateId={selectedDateId}
        setSelectedDateId={setSelectedDateId}
      />
    </InputContainer>
  );
};
export default PlaceInputBox;
