import styled from "styled-components";
import PlanSection from "../Components/itinerary/PlanSection";
import {useEffect, useState} from "react";
import {LoadScript} from "@react-google-maps/api";
import RenderMap from "../Components/itinerary/RenderMap";
import TopNavigation from "../Components/itinerary/TopNavigation";
import axios from "axios";
import {useParams} from "react-router-dom";
import {getCookie} from "../Util/Cookies";
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const ItineraryWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

const Itinerary = () => {
    const [libraries] = useState(["places"]);
    const {itineraryId} = useParams();

    const [searchedGeocode, setSearchedGeocode] = useState({
        lat: 37.555969,
        lng: 126.972336,
    });
    const [zoom, setZoom] = useState(13);
    const [searchBox, setSearchBox] = useState('');
    const [searchData, setSearchData] = useState({});
    const [startDate, setStartDate] = useState("Start date");
    const [endDate, setEndDate] = useState("End date");
    const [mainData, setMainData] = useState({
        cityName: '',
        planTitle: '',
        startDate: startDate,
        endDate: endDate,
        budgetId: '',
        planDates: [],
        planDatesAndPlace: [],

    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/plans/${itineraryId}`,
            {
                headers: {
                    Authorization: getCookie('accessToken'),
                    withCredentials: true,
                }
            }
        )
            .then((res) => {
                setMainData({
                    cityName: res.data.data.cityName,
                    planTitle: res.data.data.planTitle,
                    startDate: res.data.data.startDate,
                    endDate: res.data.data.endDate,
                    budgetId: res.data.data.budget.budgetId,
                    planDates: res.data.data.planDates,
                    planDatesAndPlace: res.data.data.planDatesAndPlace
                });
                const startPlace = res.data.data.planDatesAndPlace;
                setSearchedGeocode({
                    lat: startPlace[0].places[0].latitude,
                    lng: startPlace[0].places[0].longitude,
                });
            })
    }, []);

    const handleGeoCode = (lat, lng) => {
        setSearchedGeocode({ lat, lng });
    };

    const handleZoom = () => {
        setZoom(17);
    }

    return (
        <ItineraryWrapper>
            <TopNavigation
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                mainData={mainData}
                setMainData={setMainData}
            />
            <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
                <RenderMap
                    searchedGeocode={searchedGeocode}
                    mainData={mainData}
                    zoom={zoom}
                    handleZoom={handleZoom}
                    handleGeoCode={handleGeoCode}
                />
                <PlanSection
                    searchedGeocode={searchedGeocode}
                    setSearchedGeocode={setSearchedGeocode}
                    searchBox={searchBox}
                    setSearchBox={setSearchBox}
                    searchData={searchData}
                    setSearchData={setSearchData}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    mainData={mainData}
                    handleGeoCode={handleGeoCode}
                    handleZoom={handleZoom}
                />
            </LoadScript>

        </ItineraryWrapper>
    )
};

export default Itinerary;