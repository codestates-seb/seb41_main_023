import {Fragment, useState} from "react";
import {MarkerF} from "@react-google-maps/api";
import InfoWindow from "../../itinerary/InfoWindow";

export const Markers = (props) => {
    const {data, handleGeoCode, handleZoom} = props;

    const [isMarkerActive, setIsMarkerActive] = useState(null);
    const handleInfoWindow = (marker) => {
        if (marker === isMarkerActive) {
            return;
        }
        setIsMarkerActive(marker);
    }

    const fillColor = (day) => {
        if (day % 7 === 0) return "red"
        if (day % 7 === 1) return "orange"
        if (day % 7 === 2) return "yellow"
        if (day % 7 === 3) return "green"
        if (day % 7 === 4) return "skyblue"
        if (day % 7 === 5) return "gray"
        if (day % 7 === 6) return "pink"
    }

    const markerUrl = `data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1.5rem" height="2rem" viewBox="0 0 384 512"%3E%3Cpath fill="${fillColor(data.day.split(' ')[1])}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192C0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67c-9.535 13.774-29.93 13.773-39.464 0z"%2F%3E%3C%2Fsvg%3E`;

    return (
        <Fragment>
            {data.placeDetails.map((place, idx) => (
                <Fragment key={place.placeId}>
                    <MarkerF
                        position={{
                            lat: place.latitude,
                            lng: place.longitude
                        }}
                        onClick={() => {
                            handleInfoWindow(place.placeId);
                            handleGeoCode(place.latitude, place.longitude);
                            handleZoom();
                        }}
                        label={(idx + 1).toString()}
                        options={{
                            icon: {
                                url: markerUrl,
                            }
                        }}
                    />
                    {isMarkerActive === place.placeId ? (
                        <InfoWindow
                            key={place.placeId}
                            singleData={place}
                            setActiveMarker={setIsMarkerActive}
                        />
                    ) : null}
                </Fragment>
            ))}
        </Fragment>
    )
};