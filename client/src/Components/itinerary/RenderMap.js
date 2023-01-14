import {GoogleMap, MarkerF} from "@react-google-maps/api";
import InfoWindow from "./InfoWindow";

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

const RenderMap = (props) => {
    const {
        center,
        setCenter,
        searchData,
        infoWindowOpen,
        setInfoWindowOpen,
        searchedGeocode,
        setSearchedGeocode,
        setSearchData
    } = props;



    const handleInfoWindow = () => {
        setInfoWindowOpen(prevState => !prevState);
    }

    return (
        <GoogleMap
            id={"mapping"}
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={center}
        >
            <MarkerF
                position={searchedGeocode}
                onClick={handleInfoWindow}
                label={'0'}
            />
            {infoWindowOpen ? (
                <InfoWindow
                    searchedGeocode={searchedGeocode}
                    searchData={searchData}
                    setSearchData={setSearchData}
                    setInfoWindowOpen={setInfoWindowOpen}
                />
            ) : null}
        </GoogleMap>
    )
};

export default RenderMap;