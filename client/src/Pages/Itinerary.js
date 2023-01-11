import styled from "styled-components";
import PlanSection from "../Components/itinerary/PlanSection";
import {useState} from "react";
import {LoadScript} from "@react-google-maps/api";
import RenderMap from "../Components/itinerary/RenderMap";
import TopNavigation from "../Components/itinerary/TopNavigation";
const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const ItineraryWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

const Itinerary = () => {
    const [infoWindowOpen, setInfoWindowOpen] = useState(false);
    const [libraries] = useState(["places"]);

    const [center, setCenter] = useState({
        lat: 37.555969,
        lng: 126.972336,
    });

    const [searchedGeocode, setSearchedGeocode] = useState({
        lat: 0,
        lng: 0
    });

    const [searchBox, setSearchBox] = useState('');
    const [searchData, setSearchData] = useState([]);

    return (
        <ItineraryWrapper>
            <TopNavigation/>
            <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
                <RenderMap
                    center={center}
                    setCenter={setCenter}
                    searchedGeocode={searchedGeocode}
                    setSearchedGeocode={setSearchedGeocode}
                    searchData={searchData}
                    setSearchData={setSearchData}
                    infoWindowOpen={infoWindowOpen}
                    setInfoWindowOpen={setInfoWindowOpen}
                />
                <PlanSection
                    center={center}
                    setCenter={setCenter}
                    searchedGeocode={searchedGeocode}
                    setSearchedGeocode={setSearchedGeocode}
                    searchBox={searchBox}
                    setSearchBox={setSearchBox}
                    searchData={searchData}
                    setSearchData={setSearchData}
                    setInfoWindowOpen={setInfoWindowOpen}
                />
            </LoadScript>

        </ItineraryWrapper>
    )
};

export default Itinerary;