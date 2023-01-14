import {StandaloneSearchBox} from "@react-google-maps/api";
import styled from "styled-components";
import axios from "axios";
import {getCookie} from "../../Util/Cookies";
import {useState} from "react";

const InputContainer = styled.div`
  width: 95%;
  height: 40px;
  border: 1px solid black;
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  margin-bottom: 20px;

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
  width: 3%;
`;

const PlaceInputBox = (props) => {
        const {
            searchBox,
            setSearchBox,
            setInfoWindowOpen,
            setSearchedGeocode,
            setCenter,
            searchData,
            setSearchData,
            planDateId,
        } = props;

        const [isFocused, setIsFocused] = useState(false);

        const onLoad = (ref) => {
            // if(isFocused) {
            console.log(ref);
            setSearchBox(ref);
            // }
        }

        const handleOnFocus = () => {
            setIsFocused(prevState => !prevState);
        }

        const onUnmount = () => {
            setSearchBox('');
        }

        const onPlacesChanged = () => {
            console.log(1);
            if (searchBox !== '') {
                setInfoWindowOpen(true);
                console.log(searchBox);
                const place = searchBox.getPlaces()[0];
                console.log(place)
                const name = place.name;
                const status = place.business_status;
                const rating = place.rating;
                const price_level = place.price_level;
                const website = place.website;
                const formattedAddress = place.formatted_address;
                const phoneNumber = place.formatted_phone_number;
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();

                let photo, openingHours;

                if (place.photos !== undefined) {
                    photo = place.photos[0].getUrl();
                } else {
                    photo = 'null';
                }

                if (place.opening_hours !== undefined) {
                    openingHours = [
                        place.opening_hours.weekday_text[0],
                        place.opening_hours.weekday_text[1],
                        place.opening_hours.weekday_text[2],
                        place.opening_hours.weekday_text[3],
                        place.opening_hours.weekday_text[4],
                        place.opening_hours.weekday_text[5],
                        place.opening_hours.weekday_text[6]
                    ];
                }

                //console log all results
                console.log(`Name: ${name}`);
                console.log(`Ratings: ${rating}/5`);
                console.log(`Business Status: ${status}`);
                console.log(`Formatted Address: ${formattedAddress}`);
                console.log(`website: ${website}`);
                console.log(`phone: ${phoneNumber}`);

                setSearchedGeocode({
                    lat,
                    lng
                })

                setCenter({
                    lat,
                    lng
                })


                setSearchData({
                    name,
                    photo,
                    status,
                    rating,
                    price_level,
                    openingHours,
                    website,
                    formattedAddress,
                    phoneNumber
                });

                axios.post(`${process.env.REACT_APP_API_URL}/places/${planDateId}`, {
                    placeName: name,
                    latitude: lat,
                    longitude: lng,
                    placeAddress: formattedAddress,
                }, {
                    headers: {
                        Authorization: getCookie('accessToken'),
                    }
                })
                    .then((res) => console.log('추가된 정보: ', res.data))
                    // .then(res => window.location.reload())
                    .catch((err) => console.log(err))
            }

        };

        const handleOnKeyPress = (event) => {
            if (event.key === 'Enter') {
                event.target.value = '';
            }
        };

        const handlePlanDateId = () => {
            console.log(planDateId)
        }

        return (
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
                        id={planDateId}
                        type={'text'}
                        placeholder={'Add a place'}
                        onKeyPress={handleOnKeyPress}
                        onClick={handlePlanDateId}
                    />
                </StandaloneSearchBox>
            </InputContainer>
        )
    }
;

export default PlaceInputBox;