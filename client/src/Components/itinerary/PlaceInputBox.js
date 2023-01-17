import {StandaloneSearchBox} from "@react-google-maps/api";
import styled from "styled-components";
import axios from "axios";
import {getCookie} from "../../Util/Cookies";
import PlanDropDown from "./PlanDropDown";
import {useState} from "react";


const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: space-between;

  div {
    width: 100%;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid black;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;

  input {
    width: 700px;
    border-style: none;
    font-size: 18px;
    height: 30px;
  }
`;

const InputIconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  width: auto;
`;


const PlaceInputBox = (props) => {
        const {
            searchBox,
            setSearchBox,
            singlePlanData,
            handleGeoCode,
            refresh,
            handleRefresh
        } = props;

        const [selectedDateId, setSelectedDateId] = useState(null);

        const onLoad = (ref) => {
            setSearchBox(ref);
        }

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
                    openingHours =
                        `${place.opening_hours.weekday_text[0]}, ${place.opening_hours.weekday_text[1]},${place.opening_hours.weekday_text[2]},${place.opening_hours.weekday_text[3]},${place.opening_hours.weekday_text[4]},${place.opening_hours.weekday_text[5]},${place.opening_hours.weekday_text[6]}`
                    ;
                }

                axios.post(`${process.env.REACT_APP_API_URL}/places/${selectedDateId}`, {
                    placeName: name,
                    latitude: lat,
                    longitude: lng,
                    placeAddress: formattedAddress,
                    ratings: rating,
                    website: website,
                    phone: phoneNumber,
                    openingHours: openingHours
                }, {
                    headers: {
                        Authorization: getCookie('accessToken'),
                    }
                })
                    .then(res => {
                        handleRefresh();
                    })
                    .catch((err) => console.log(err))

                handleGeoCode(lat, lng)
            }


            if (selectedDateId === null) {
                alert('먼저 날짜를 선택해주세요!!')
            }
        };

        const handleOnKeyPress = (event) => {
            if (event.key === 'Enter') {
                event.target.value = '';
            }
        };

        return (
            <InputWrapper>
                <InputContainer>
                    <InputIconBox>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                             preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0zM12 13a2 2 0 1 0 0-4a2 2 0 0 0 0 4z"/>
                        </svg>
                    </InputIconBox>
                    <StandaloneSearchBox
                        onLoad={onLoad}
                        onPlacesChanged={onPlacesChanged}
                    >
                        <input
                            type={'text'}
                            placeholder={'Add a place'}
                            onKeyPress={handleOnKeyPress}
                        />
                    </StandaloneSearchBox>
                </InputContainer>
                <PlanDropDown
                    singlePlanData={singlePlanData}
                    selectedDateId={selectedDateId}
                    setSelectedDateId={setSelectedDateId}
                />
            </InputWrapper>
        )
    }
;

export default PlaceInputBox;