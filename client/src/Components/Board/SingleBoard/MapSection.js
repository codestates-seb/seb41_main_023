import {useState} from "react";
import {GoogleMap, LoadScript} from "@react-google-maps/api";
import {Markers} from "./Markers";

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
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
export const MapSection = (props) => {
    const {boardData, geocode, handleGeoCode} = props;
    const [libraries] = useState(['places']);
    const [isZoom, setIsZoom] = useState(13);

    const handleZoom = () => {
        setIsZoom(17);
    }

    return (
        <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
            <GoogleMap
                id={"board-map"}
                mapContainerStyle={mapContainerStyle}
                zoom={isZoom}
                center={geocode}
            >
                {boardData ? (
                    boardData.days.map((data, idx) => (
                        <Markers
                            key={idx}
                            data={data}
                            handleGeoCode={handleGeoCode}
                            handleZoom={handleZoom}
                        />
                    ))) : null}
            </GoogleMap>
        </LoadScript>
    )
};