import { MarkerF } from '@react-google-maps/api';
import { Fragment, useState } from 'react';
import InfoWindow from './InfoWindow';
import moment from 'moment';
import 'moment/locale/ko';

const MarkerLists = (props) => {
  const { data, handleGeoCode, handleZoom } = props;

  const [activeMarker, setActiveMarker] = useState(null);
  const handleInfoWindow = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const makeColor = (day) => {
    if (day === '월') return 'deepskyblue';
    if (day === '화') return 'orchid';
    if (day === '수') return 'lightcoral';
    if (day === '목') return 'orange';
    if (day === '금') return 'gold';
    if (day === '토') return 'mediumseagreen';
    if (day === '일') return 'turquoise';
  };

  const makeStrokeColor = (day) => {
    if (day === '월') return 'dodgerblue';
    if (day === '화') return 'mediumorchid';
    if (day === '수') return 'indianred';
    if (day === '목') return 'darkorange';
    if (day === '금') return 'goldenrod';
    if (day === '토') return 'seagreen';
    if (day === '일') return 'darkturquoise';
  };

  const makeLabelColor = (day) => {
    if (day === '월') return '#115496';
    if (day === '화') return '#7d1596';
    if (day === '수') return '#731717';
    if (day === '목') return '#804600';
    if (day === '금') return '#8a6508';
    if (day === '토') return '#08572a';
    if (day === '일') return '#006a6b';
  };

  const markerUrl = `data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="64" height="64" viewBox="0 -5 64 64"%3E%3Cpath fill="${makeColor(
    `${moment(data.planDate).format('ddd')}`
  )}" stroke="${makeStrokeColor(
    `${moment(data.planDate).format('ddd')}`
  )}"  stroke-width="2" d="M32.9034 57.1083C33.1835 56.9665 33.4262 56.7608 33.612 56.5078C44.536 41.6478 50 31.0358 50 24.6758C50 14.6758 42 6.67578 32 6.67578C22 6.67578 14 14.6758 14 24.6758C14 31.0358 19.464 41.6478 30.388 56.5078C30.5738 56.7608 30.8165 56.9665 31.0966 57.1083C31.3766 57.2501 31.6861 57.324 32 57.324C32.3139 57.324 32.6234 57.2501 32.9034 57.1083Z"%2F%3E%3C%2Fsvg%3E`;

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
                // label={`${moment(data.planDate).format('ddd')}`}
                label={{
                  text: (idx + 1).toString(),
                  color: makeLabelColor(`${moment(data.planDate).format('ddd')}`),
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
