import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getCookie } from "../Util/Cookies";
import {
  LoadScript,
  GoogleMap,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";

import BoardHeader from "../Components/Board/BoardHeader";

const WriteSingleBoard = () => {
  const token = getCookie("accessToken");
  const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const { planId } = useParams();
  const [openInfo, setOpenInfo] = useState(true);
  const [mainData, setMainData] = useState();
  const [planDatesAndPlace, setPlanDatesAndPlace] = useState();
  const [content, setContent] = useState();
  const [placeComment, setPlaceComment] = useState([]);
  //날짜별 데이터
  // const [daysData, setDaysData] = useState();
  //선택 날짜 정보
  // const [selectedDate, setSelectedDate] = useState([]);
  //선택 날짜의 위도,경도
  // const [mapLocations, setMapLocations] = useState();
  // 선택한 장소 표시
  const [searchData, setSearchData] = useState({
    장소: "",
    주소: "",
    영업시간: "",
    별점: "",
    웹사이트: "",
    연락처: "",
  });

  const [libraries] = useState(["places"]);

  const onLoad = (marker) => {
    // console.log("marker: ", marker);
  };

  const mapContainerStyle = {
    width: "50%",
    minWidth: "400px",
    position: "absolute",
    height: "100%",
    zIndex: "60",
    top: "0",
    bottom: "0",
    right: "0",
  };

  const [geocode, setGeocode] = useState({
    lat: 0,
    lng: 0,
  });

  //선택한 일정 조회
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/plans/${planId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setMainData(res.data.data);
        setPlanDatesAndPlace(res.data.data.planDatesAndPlace);
        const startPlace = res.data.data.planDatesAndPlace[0].places[0];
        setSearchData({
          장소: startPlace.placeName,
          주소: startPlace.placeAddress,
          전화번호: startPlace.phone || null,
          웹사이트: startPlace.website || null,
          평점: startPlace.ratings || null,
          영업시간: startPlace.openingHours || null,
        });
        setGeocode({
          lat: startPlace.latitude,
          lng: startPlace.longitude,
        });
      });
  }, []);

  // 게시글 불러오기
  useEffect(() => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/board/1`,
      headers: {
        Authorization: token,
      },
    }).then((res) => console.log(res));
  }, []);

  //요일별 데이터 설정
  // useEffect(() => {
  //   setDaysData(planDatesAndPlace?.map((el) => el));
  // }, [mainData]);

  // 선택한 날짜 데이터, 위치 설정
  // const handleDayData = (el) => {
  //   const dateData = [...daysData];
  //   const selectedlatlng = [];
  //   for (let i = 0; i < dateData.length; i++) {
  //     const dataId = dateData[i].planDateId;
  //     if (dataId === el) {
  //       setSelectedDate(dateData[i].places.map((el) => el));
  //     }
  //     selectedDate?.map((el) =>
  //       selectedlatlng.push({ lat: el.longitude, lng: el.longitude })
  //     );
  //   }
  //   setMapLocations(selectedlatlng);
  // };

  const handleGeoCode = (lat, lng) => {
    setGeocode({ lat, lng });
  };

  //infowindow에 나타낼 데이터
  const InfoData = ({ searchData }) => {
    return (
      <>
        {Object.entries(searchData).map(([key, value]) => (
          <InfoDataContainer>
            <div>{key}:</div>
            <div>{value} </div>
          </InfoDataContainer>
        ))}
      </>
    );
  };

  const handleInfoWindow = () => {
    setOpenInfo(!openInfo);
  };

  // const [activeMarker, setActiveMarker] = useState(null);

  // const handleActiveMarker = (marker) => {
  //   console.log(marker);
  // };

  //게시물 등록
  const handleCreateLog = async (title, content) => {
    console.log("전송 데이터:", title, content);
    //상단 메모
    const data = {
      title,
      content,
    };
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/board/plan/${planId}`,
      headers: {
        Authorization: token,
      },
      data: data,
    }).then((res) => console.log(res));
  };

  //장소별 메모 변경
  const handleChangeComment = (e) => {
    // const { name, value } = e.target;
    // const 변경할객체 = placeComment.filter((el) => el.placeId === name);
    // // 변경할객체 = { ...placeId, description: value };
    // console.log("변경할객체", 변경할객체);
    // setPlaceComment([...placeComment, 변경할객체]);
  };

  // console.log(placeComment);

  // 장소별 comment 등록
  const handleSubmitComment = async (e) => {
    // console.log(placeComment);
    //enter key
    // if (e.keyCode === 13) {
    //   await axios({
    //     method: "PATCH",
    //     url: `${process.env.REACT_APP_API_URL}/places/desc`,
    //     headers: {
    //       Authorization: token,
    //     },
    //     placeDesc: placeComment,
    //   });
    // }
  };

  return (
    <>
      {mainData && (
        <BoardHeader
          mainData={mainData}
          mode="write"
          content={content}
          handleCreateLog={handleCreateLog}
        />
      )}
      <MemoBox>
        <h3>Travel experience</h3>
        <textarea
          placeholder="Share your experience!"
          onChange={(e) => setContent(e.target.value)}
        >
          {content}
        </textarea>
      </MemoBox>
      <ItineraryBox>
        <h3>Itinerary</h3>
        {mainData &&
          planDatesAndPlace.map((el) => (
            <div key={el.planDateId}>
              <div>{el.planDate}</div>
              {el.places.map((place) => (
                <div
                  key={place.placeId}
                  onClick={() => {
                    setSearchData(place);
                    handleGeoCode(place.latitude, place.longitude);
                  }}
                >
                  <div>{place.placeId}</div>
                  <div>{place.placeAddress}</div>
                  <input
                    name={place.placeId}
                    placeholder="memo"
                    onChange={handleChangeComment}
                    onKeyUp={(e) => handleSubmitComment(e)}
                  />
                </div>
              ))}
            </div>
          ))}
      </ItineraryBox>
      <MapBox>
        <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
          <GoogleMap
            zoom={15}
            center={geocode}
            mapContainerStyle={mapContainerStyle}
          >
            <MarkerF
              onLoad={onLoad}
              position={geocode}
              scale={5}
              onClick={handleInfoWindow}
            >
              {openInfo ? (
                <InfoWindowF position={geocode}>
                  <InfoData searchData={searchData} />
                </InfoWindowF>
              ) : null}
            </MarkerF>
          </GoogleMap>
        </LoadScript>
      </MapBox>
    </>
  );
};

{
}

export default WriteSingleBoard;

const MemoBox = styled.div``;
const ItineraryBox = styled.div``;
const MapBox = styled.div``;
const InfoDataContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
