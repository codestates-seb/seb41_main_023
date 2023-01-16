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
  const { planId } = useParams();
  const [mainData, setMainData] = useState();
  const [planDatesAndPlace, setPlanDatesAndPlace] = useState();
  const token = getCookie("accessToken");

  console.log(mainData);

  //map 관련
  const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  const [center, setCenter] = useState({
    lat: 37.555969,
    lng: 126.972336,
  });

  const [searchData, setSearchData] = useState({
    placeName: "",
    placeAddress: "",
  });

  const [libraries] = useState(["places"]);

  const onLoad = (marker) => {
    console.log("marker: ", marker);
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
        // console.log(res.data.data);
        setMainData({
          cityName: res.data.data.cityName,
          planTitle: res.data.data.planTitle,
          startDate: res.data.data.startDate,
          endDate: res.data.data.endDate,
          budgetId: res.data.data.budget.budgetId,
          planDates: res.data.data.planDates,
          planDatesAndPlace: res.data.data.planDatesAndPlace,
        });
        setPlanDatesAndPlace(res.data.data.planDatesAndPlace);
        const startPlace = res.data.data.planDatesAndPlace;
        console.log(startPlace);
        setSearchData({
          placeName: startPlace[0].places[0].placeName,
          placeAddress: startPlace[0].places[0].placeAddress,
        });
        setGeocode({
          lat: startPlace[0].places[0].latitude,
          lng: startPlace[0].places[0].longitude,
        });
      });
  }, []);

  const handleGeoCode = (lat, lng) => {
    setGeocode({ lat, lng });
  };

  const InfoData = () => {
    return (
      <>
        <div>{searchData.placeName}</div>
        <div>{searchData.placeAddress}</div>
      </>
    );
  };

  return (
    <>
      {mainData && <BoardHeader mainData={mainData} mode="write" />}
      <MemoBox>
        <h3>Travel experience</h3>
        <textarea placeholder="Share your experience!"></textarea>
      </MemoBox>
      <ItineraryBox>
        <h3>Itinerary</h3>
        {mainData &&
          planDatesAndPlace.map((el) => (
            <div key={el.planId}>
              <div>{el.planDate}</div>
              {el.places.map((place) => (
                <div
                  key={place.planDateId}
                  onClick={() => {
                    setSearchData(place);
                    handleGeoCode(place.latitude, place.longitude);
                  }}
                >
                  <div>{place.placeName}</div>
                  <div>{place.placeAddress}</div>
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
            <MarkerF onLoad={onLoad} position={geocode} scale={5}>
              <InfoWindowF position={geocode}>
                <InfoData />
              </InfoWindowF>
            </MarkerF>
          </GoogleMap>
        </LoadScript>
      </MapBox>
    </>
  );
};

export default WriteSingleBoard;

const MemoBox = styled.div``;
const ItineraryBox = styled.div``;
const MapBox = styled.div``;
