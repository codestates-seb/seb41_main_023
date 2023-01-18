import moment from "moment";
import "moment/locale/ko";
import InfoWindow from "../itinerary/InfoWindow";
import { MarkerF } from "@react-google-maps/api";
import { useState } from "react";

const SingleBoardMarker = ({ el, handleZoom }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [closeInfo, setCloseInfo] = useState(false);

  const handleInfoWindow = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const onLoad = (marker) => {
    // console.log("marker: ", marker);
  };

  const handleGeoCode = (lat, lng) => {
    setGeocode({ lat, lng });
  };

  const [geocode, setGeocode] = useState({
    lat: 0,
    lng: 0,
  });

  const makeColor = (day) => {
    if (day === "월") return "red";
    if (day === "화") return "orange";
    if (day === "수") return "yellow";
    if (day === "목") return "green";
    if (day === "금") return "skyblue";
    if (day === "토") return "gray";
    if (day === "일") return "pink";
  };

  const markerUrl = `data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="1.5rem" height="2rem" viewBox="0 0 384 512"%3E%3Cpath fill="${makeColor(
    `${moment(el.planDate).format("ddd")}`
  )}" d="M172.268 501.67C26.97 291.031 0 269.413 0 192C0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67c-9.535 13.774-29.93 13.773-39.464 0z"%2F%3E%3C%2Fsvg%3E`;

  return (
    <div>
      {el.places.map((place, idx) => (
        <div key={place.placeId}>
          <MarkerF
            onClick={() => {
              handleInfoWindow(place.placeId);
              handleGeoCode(place.latitude, place.longitude);
              handleZoom(17);
              setCloseInfo(!closeInfo);
            }}
            onLoad={onLoad}
            position={{
              lat: place.latitude,
              lng: place.longitude,
            }}
            scale={5}
            label={(idx + 1).toString()}
            options={{
              icon: {
                url: markerUrl,
              },
            }}
          />
          {closeInfo && activeMarker === place.placeId ? (
            <InfoWindow
              handleZoom={handleZoom}
              key={place.placeId}
              singleData={place}
              setActiveMarker={setActiveMarker}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default SingleBoardMarker;
