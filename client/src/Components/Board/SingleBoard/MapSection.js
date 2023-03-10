import { Fragment, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { Markers } from './Markers';

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const mapContainerStyle = {
  position: 'fixed',
  width: '50vw',
  height: '100vh',
  zIndex: '60',
  top: '0',
  right: '0',
};
export const MapSection = props => {
  const { boardData, geocode, handleGeoCode } = props;
  const [libraries] = useState(['places']);
  const [isZoom, setIsZoom] = useState(13);
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const handleZoom = () => {
    setIsZoom(17);
  };

  return (
    <Fragment>
      {isLoaded && (
        <GoogleMap
          id={'board-map'}
          mapContainerStyle={mapContainerStyle}
          zoom={isZoom}
          center={geocode}
        >
          {boardData
            ? boardData.days.map((data, idx) => (
                <Markers
                  key={idx}
                  data={data}
                  handleGeoCode={handleGeoCode}
                  handleZoom={handleZoom}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
              ))
            : null}
        </GoogleMap>
      )}
    </Fragment>
  );
};
