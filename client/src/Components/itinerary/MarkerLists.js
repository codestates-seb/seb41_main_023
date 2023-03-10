import { Fragment, useState } from 'react';
import { MarkerF } from '@react-google-maps/api';

import InfoWindow from './InfoWindow';

import { dayOfTheWeekKo } from '../../Util/dayUtil';

const MarkerLists = props => {
  const { data, handleGeoCode, handleZoom } = props;

  const [activeMarker, setActiveMarker] = useState(null);
  const handleInfoWindow = marker => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const makeColor = day => {
    if (day === '월') return 'deepskyblue';
    if (day === '화') return 'orchid';
    if (day === '수') return 'lightcoral';
    if (day === '목') return 'orange';
    if (day === '금') return 'gold';
    if (day === '토') return 'mediumseagreen';
    if (day === '일') return 'turquoise';
  };

  const makeStrokeColor = day => {
    if (day === '월') return 'dodgerblue';
    if (day === '화') return 'mediumorchid';
    if (day === '수') return 'indianred';
    if (day === '목') return 'darkorange';
    if (day === '금') return 'goldenrod';
    if (day === '토') return 'seagreen';
    if (day === '일') return 'darkturquoise';
  };

  const makeLabelColor = day => {
    if (day === '월') return '#115496';
    if (day === '화') return '#7d1596';
    if (day === '수') return '#731717';
    if (day === '목') return '#804600';
    if (day === '금') return '#8a6508';
    if (day === '토') return '#08572a';
    if (day === '일') return '#006a6b';
  };

  const markerUrl = `data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="56" height="56" viewBox="0 -5 56 56"%3E%3Cpath fill="${makeColor(
    `${dayOfTheWeekKo(data.planDate)}`,
  )}" stroke="${makeStrokeColor(
    `${dayOfTheWeekKo(data.planDate)}`,
  )}" stroke-width="2" d="M28 47.1389C23.5669 41.0517 20.2653 35.8721 18.058 31.5849C15.717 27.0377 14.75 23.762 14.75 21.5918C14.75 14.2225 20.6307 8.3418 28 8.3418C35.3693 8.3418 41.25 14.2225 41.25 21.5918C41.25 23.762 40.283 27.0377 37.942 31.5849C35.7347 35.8721 32.4331 41.0517 28 47.1389Z"%2F%3E%3C%2Fsvg%3E`;

  return (
    <Fragment>
      {data !== null
        ? data.places.map((singleData, idx) => (
            <Fragment key={singleData.placeId}>
              <MarkerF
                position={{
                  lat: singleData.latitude,
                  lng: singleData.longitude,
                }}
                onClick={() => {
                  handleInfoWindow(singleData.placeId);
                  handleGeoCode(singleData.latitude, singleData.longitude);
                  handleZoom();
                }}
                label={{
                  text: (idx + 1).toString(),
                  color: makeLabelColor(`${dayOfTheWeekKo(data.planDate)}`),
                }}
                options={{
                  icon: {
                    url: markerUrl,
                  },
                }}
              />
              {activeMarker === singleData.placeId ? (
                <InfoWindow
                  key={singleData.planDateId}
                  singleData={singleData}
                  setActiveMarker={setActiveMarker}
                />
              ) : null}
            </Fragment>
          ))
        : null}
    </Fragment>
  );
};

export default MarkerLists;
