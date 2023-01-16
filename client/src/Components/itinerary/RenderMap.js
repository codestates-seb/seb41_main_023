import {GoogleMap} from "@react-google-maps/api";
import MarkerLists from "./MarkerLists";

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
        mainData
    } = props;

    const placesInfo = mainData.planDatesAndPlace
    console.log('info: ', placesInfo)

    return (
        <GoogleMap
            id={"mapping"}
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={center}
        >
            {placesInfo !== null ? (
                placesInfo.map((place) => (
                    <MarkerLists
                        key={place.planDateId}
                        data={place}
                    />
                ))) : null}
        </GoogleMap>
    )
};

export default RenderMap;