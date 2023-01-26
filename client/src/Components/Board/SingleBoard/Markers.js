import { Fragment, useState } from 'react';
import { MarkerF } from '@react-google-maps/api';

import InfoWindow from '../../itinerary/InfoWindow';

export const Markers = props => {
  const { data, handleGeoCode, handleZoom, isOpen, setIsOpen } = props;

  const [isMarkerActive, setIsMarkerActive] = useState(null);

  const handleInfoWindow = marker => {
    if (marker === isMarkerActive) {
      return;
    }
    setIsMarkerActive(marker);
  };

  const makeColor = day => {
    if (day % 7 === 0) return 'deepskyblue';
    if (day % 7 === 1) return 'orchid';
    if (day % 7 === 2) return 'lightcoral';
    if (day % 7 === 3) return 'orange';
    if (day % 7 === 4) return 'gold';
    if (day % 7 === 5) return 'mediumseagreen';
    if (day % 7 === 6) return 'turquoise';
  };

  const makeStrokeColor = day => {
    if (day % 7 === 0) return 'dodgerblue';
    if (day % 7 === 1) return 'mediumorchid';
    if (day % 7 === 2) return 'indianred';
    if (day % 7 === 3) return 'darkorange';
    if (day % 7 === 4) return 'goldenrod';
    if (day % 7 === 5) return 'seagreen';
    if (day % 7 === 6) return 'darkturquoise';
  };

  const makeLabelColor = day => {
    if (day % 7 === 0) return '#115496';
    if (day % 7 === 1) return '#7d1596';
    if (day % 7 === 2) return '#731717';
    if (day % 7 === 3) return '#804600';
    if (day % 7 === 4) return '#8a6508';
    if (day % 7 === 5) return '#08572a';
    if (day % 7 === 6) return '#006a6b';
  };

  const markerUrl = `data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="56" height="56" viewBox="0 -5 56 56"%3E%3Cpath fill="${makeColor(
    data.day.split(' ')[1],
  )}" stroke="${makeStrokeColor(
    data.day.split(' ')[1],
  )}" stroke-width="2" d="M28 47.1389C23.5669 41.0517 20.2653 35.8721 18.058 31.5849C15.717 27.0377 14.75 23.762 14.75 21.5918C14.75 14.2225 20.6307 8.3418 28 8.3418C35.3693 8.3418 41.25 14.2225 41.25 21.5918C41.25 23.762 40.283 27.0377 37.942 31.5849C35.7347 35.8721 32.4331 41.0517 28 47.1389Z"%2F%3E%3C%2Fsvg%3E`;

  return (
    <Fragment>
      {data.placeDetails.map((place, idx) => (
        <Fragment key={place.placeId}>
          <MarkerF
            position={{
              lat: place.latitude,
              lng: place.longitude,
            }}
            onClick={() => {
              handleInfoWindow(place.placeId);
              handleGeoCode(place.latitude, place.longitude);
              handleZoom();
              setIsOpen(prevState => !prevState);
            }}
            label={{
              text: (idx + 1).toString(),
              color: makeLabelColor(data.day.split(' ')[1]),
            }}
            options={{
              icon: {
                url: markerUrl,
              },
            }}
          />
          {isOpen && isMarkerActive === place.placeId ? (
            <InfoWindow
              key={place.placeId}
              singleData={place}
              setActiveMarker={setIsMarkerActive}
            />
          ) : null}
        </Fragment>
      ))}
    </Fragment>
  );
};
