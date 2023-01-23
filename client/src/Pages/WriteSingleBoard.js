import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadScript, GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { getCookie } from '../Util/Cookies';

import SingleBoardMarker from '../Components/Board/SingleBoardMarker';
import BoardHeader from '../Components/Board/BoardHeader';

const WriteSingleBoard = () => {
  const navigate = useNavigate();
  const token = getCookie('accessToken');
  const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const { planId } = useParams();

  const [mainData, setMainData] = useState({});
  const [days, setDays] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [placeNotes, setPlaceNotes] = useState([]);
  // const [boardId, setBoardId] = useState(null);
  const [libraries] = useState(['places']);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const mapContainerStyle = {
    width: '50%',
    minWidth: '400px',
    position: 'absolute',
    height: '100%',
    zIndex: '60',
    top: '0',
    bottom: '0',
    right: '0',
  };

  const [geocode, setGeocode] = useState({
    lat: 0,
    lng: 0,
  });

  const [zoom, setZoom] = useState(13);

  // 여행 정보 요청
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/board/user/plan/${planId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setMainData(res.data);
        setTitle(res.data.planTitle);
        setDays(res.data.days);
        const startPlace = res.data.days[0].placeDetails[0];
        setGeocode({
          lat: startPlace.latitude,
          lng: startPlace.longitude,
        });
      });
  }, []);

  const handleZoom = (el) => {
    setZoom(el);
  };

  //게시물 등록
  const handleCreateLog = async (title, content) => {
    const data = {
      title,
      content,
    };
    await axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_URL}/board/plan/${planId}`,
      headers: {
        Authorization: token,
      },
      data: data,
    })
      .then((res) => navigate(`/board/${res.data.boardId}`))
      .then(() => {
        axios({
          method: 'PATCH',
          url: `${process.env.REACT_APP_API_URL}/places/desc`,
          headers: {
            Authorization: token,
          },
          data: { placeDesc: placeNotes },
        }).then((res) => console.log(res));
      });
  };

  //장소별 note 변경
  const handleChangeNote = (e) => {
    let findIndex = placeNotes.findIndex(
      (comment) => Number(comment.placeId) === Number(e.target.name)
    );

    if (findIndex === -1) {
      setPlaceNotes([
        ...placeNotes,
        { placeId: Number(e.target.name), description: e.target.value },
      ]);
    } else {
      let changeNotes = [...placeNotes];
      changeNotes[findIndex].description = e.target.value;
      setPlaceNotes(changeNotes);
    }
  };

  // 장소별 note 삭제
  const handleDeleteNote = (e) => {
    let findIndex = placeNotes.findIndex(
      (comment) => Number(comment.placeId) === Number(e.target.name)
    );
    console.log(findIndex);

    let changeNotes = [...placeNotes];
    changeNotes[findIndex].description = '';
    setPlaceNotes(changeNotes);
  };

  // console.log(placeNotes);

  // 위도, 경도 변경
  const handleGeoCode = (lat, lng) => {
    setGeocode({ lat, lng });
  };

  return (
    <>
      {mainData.planTitle && (
        <BoardHeader
          mainData={mainData}
          mode='write'
          title={title}
          setTitle={setTitle}
          content={content}
          handleCreateLog={handleCreateLog}
        />
      )}
      <MainContainer>
        <h3 className='section__title'>Travel Experience</h3>
        <textarea
          className='travel-experience__text-area'
          placeholder='Share your travel experience'
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <ItineraryWrapper>
          <h3 className='section__title'>Itinerary</h3>
          <div className='itinerary__container'>
            {mainData &&
              days.map((day, index) => (
                <div className='itinerary__item' key={index}>
                  <div className='itinerary__day'>{day.day}</div>
                  <div className='itinerary__plan-container'>
                    {day.placeDetails.map((place) => (
                      <div
                        key={place.index}
                        onClick={() => {
                          handleGeoCode(place.latitude, place.longitude);
                        }}
                        className='single-plan__container'
                      >
                        <div className='location-number__container'>
                          <div className='location-number'>{place.index}</div>
                        </div>
                        <div className='place-info__main'>
                          <div className='place-info__top'>
                            <div className='location-name'>{place.placeName}</div>
                            <div className='location-address'>{place.placeAddress}</div>
                          </div>
                          <form className='location-memo__container'>
                            <textarea
                              className='location-memo__text-area'
                              type='text'
                              name={place.placeId}
                              placeholder='Add note'
                              onChange={(e) => handleChangeNote(e)}
                            ></textarea>
                            <input
                              type='reset'
                              value='reset'
                              className='location-memo__reset'
                            ></input>
                          </form>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </ItineraryWrapper>
      </MainContainer>
      <MapBox>
        {isLoaded && (
          <GoogleMap zoom={zoom} center={geocode} mapContainerStyle={mapContainerStyle}>
            {days.map((day, idx) => (
              <div key={idx}>
                <div>{day.planDate}</div>
                <SingleBoardMarker handleZoom={handleZoom} day={day} />
              </div>
            ))}
          </GoogleMap>
        )}
      </MapBox>
    </>
  );
};

export default WriteSingleBoard;

const MainContainer = styled.div`
  position: relative;
  width: 50vw;
  padding: 50px;

  .section__title {
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    color: var(--black);
    font-weight: 600;
  }

  > .travel-experience__text-area {
    padding: var(--spacing-3);
    width: 100%;
    min-height: 100px;
    border: 1px solid var(--light-gray-4);
    border-radius: 5px;
    outline: 0;
    margin-bottom: var(--spacing-5);

    &:focus {
      border-color: var(--primary-blue-light-1);
      box-shadow: 0 0 0 var(--spacing-1) rgba(156, 199, 255, 0.5);
    }
  }
`;

const ItineraryWrapper = styled.div`
  > .itinerary__container {
    .itinerary__item:last-child {
      margin-bottom: 0;
    }
  }

  .itinerary__item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
    margin-bottom: var(--spacing-4);
  }

  .itinerary__day {
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    color: var(--dark-gray-1);
    font-weight: normal;
  }

  .itinerary__plan-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
    cursor: default;
  }

  .single-plan__container {
    display: flex;
    gap: var(--spacing-3);
    width: 100%;
    min-height: 150px;
    border-bottom: 1px solid var(--light-gray-4);
  }

  .location-number__container {
    .location-number {
      font-size: var(--small-heading-font-size);
      line-height: var(--small-heading-line-height);
      color: var(--primary-blue-bright);
      font-weight: 600;
    }
  }

  .place-info__main {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .place-info__top {
    cursor: pointer;
  }

  .location-name {
    margin-bottom: var(--spacing-1);
    font-size: var(--small-heading-font-size);
    line-height: var(--small-heading-line-height);
    color: var(--dark-gray-1);
    font-weight: 600;
  }

  .location-address {
    margin-bottom: var(--spacing-3);
    color: var(--light);
  }

  .location-memo__container {
    position: relative;
    width: 100%;
  }

  .location-memo__text-area {
    display: block;
    width: 100%;
    padding: var(--spacing-3);
    width: 100%;
    min-height: 100px;
    border: 1px solid var(--light-gray-4);
    border-radius: 5px;
    outline: 0;
    margin-bottom: var(--spacing-3);

    &:focus {
      border-color: var(--primary-blue-light-1);
      box-shadow: 0 0 0 var(--spacing-1) rgba(156, 199, 255, 0.5);
    }
  }

  .location-memo__reset {
    position: absolute;
    bottom: 28px;
    right: 20px;
    background-color: transparent;
    color: var(--light);
    outline: 0;
    border: 0;
    cursor: pointer;

    &:hover {
      color: var(--dark-gray-2);
    }

    &:focus {
      box-shadow: none;
    }
  }
`;

const MapBox = styled.div`
  > div {
    position: fixed !important;
    width: 50vw !important;
    height: 100vh !important;
  }
`;
