import PlanSection from "../Components/itinerary/PlanSection";
import {Fragment, useEffect, useState} from "react";
import {LoadScript} from "@react-google-maps/api";
import RenderMap from "../Components/itinerary/RenderMap";
import TopNavigation from "../Components/itinerary/TopNavigation";
import axios from "axios";
import {useParams} from "react-router-dom";
import {getCookie} from "../Util/Cookies";

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Itinerary = () => {
    console.log('1');
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
        budget: null,
        planDates: [],
        planDatesAndPlace: [],
    });
    const [refresh, setRefresh] = useState(1);

    //refresh function
    const handleRefresh = () => {
        setRefresh(refresh * -1);
    };

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
                setMainData(res.data.data);
            })
    }, [itineraryId, refresh]);

    const handleGeoCode = (lat, lng) => {
        setSearchedGeocode({lat, lng});
    };

    const handleZoom = () => {
        setZoom(17);
    }

    return (
        <Fragment>
            <TopNavigation
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                mainData={mainData}
                setMainData={setMainData}
                handleRefresh={handleRefresh}
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
                    handleRefresh={handleRefresh}
                />
            </LoadScript>

        </Fragment>
    )
};

export default Itinerary;