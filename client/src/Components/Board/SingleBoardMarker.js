import { useState } from 'react';
import { MarkerF } from '@react-google-maps/api';

import InfoWindow from '../itinerary/InfoWindow';

import { dayOfTheWeek } from '../../Util/dayUtil';

const SingleBoardMarker = ({ day, handleZoom }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [closeInfo, setCloseInfo] = useState(false);
  const date = day.day.split(' ')[1];

  const handleInfoWindow = marker => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const onLoad = marker => {};

  const handleGeoCode = (lat, lng) => {
    setGeocode({ lat, lng });
  };

  const [geocode, setGeocode] = useState({
    lat: 0,
    lng: 0,
  });

  const makeColor = date => {
    if (date % 7 === 0) return 'deepskyblue';
    if (date % 7 === 1) return 'orchid';
    if (date % 7 === 2) return 'lightcoral';
    if (date % 7 === 3) return 'orange';
    if (date % 7 === 4) return 'gold';
    if (date % 7 === 5) return 'mediumseagreen';
    if (date % 7 === 6) return 'turquoise';
  };

  const makeStrokeColor = date => {
    if (date % 7 === 0) return 'dodgerblue';
    if (date % 7 === 1) return 'mediumorchid';
    if (date % 7 === 2) return 'indianred';
    if (date % 7 === 3) return 'darkorange';
    if (date % 7 === 4) return 'goldenrod';
    if (date % 7 === 5) return 'seagreen';
    if (date % 7 === 6) return 'darkturquoise';
  };

  const makeLabelColor = date => {
    if (date % 7 === 0) return '#115496';
    if (date % 7 === 1) return '#7d1596';
    if (date % 7 === 2) return '#731717';
    if (date % 7 === 3) return '#804600';
    if (date % 7 === 4) return '#8a6508';
    if (date % 7 === 5) return '#08572a';
    if (date % 7 === 6) return '#006a6b';
  };

  const markerUrl = `data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="56" height="56" viewBox="0 -5 56 56"%3E%3Cpath fill="${makeColor(
    date,
  )}" stroke="${makeStrokeColor(
    date,
  )}" stroke-width="2" d="M28 47.1389C23.5669 41.0517 20.2653 35.8721 18.058 31.5849C15.717 27.0377 14.75 23.762 14.75 21.5918C14.75 14.2225 20.6307 8.3418 28 8.3418C35.3693 8.3418 41.25 14.2225 41.25 21.5918C41.25 23.762 40.283 27.0377 37.942 31.5849C35.7347 35.8721 32.4331 41.0517 28 47.1389Z"%2F%3E%3C%2Fsvg%3E`;

  return (
    <div>
      {day.placeDetails.map((place, idx) => (
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
            label={{
              text: (idx + 1).toString(),
              color: makeLabelColor(date),
            }}
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
