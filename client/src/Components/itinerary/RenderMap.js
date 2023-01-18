import {GoogleMap} from "@react-google-maps/api";
import MarkerLists from "./MarkerLists";

const mapContainerStyle = {
    width: "50vw",
    minWidth: "400px",
    position: "absolute",
    height: "100vh",
    zIndex: "60",
    top: "0",
    bottom: "0",
    right: "0",
};

const RenderMap = (props) => {
    const {
        mainData,
        searchedGeocode,
        handleGeoCode,
        zoom,
        handleZoom
    } = props;

    const placesInfo = mainData.planDatesAndPlace

    return (
        <GoogleMap
            id={"mapping"}
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            center={searchedGeocode}
        >
            {placesInfo !== null ? (
                placesInfo.map((place) => (
                    <MarkerLists
                        key={place.planDateId}
                        data={place}
                        handleGeoCode={handleGeoCode}
                        handleZoom={handleZoom}
                    />
                ))) : null}
        </GoogleMap>
    )
};

export default RenderMap;