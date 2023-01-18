import { GoogleMap } from '@react-google-maps/api';
import MarkerLists from './MarkerLists';

const mapContainerStyle = {
  position: 'fixed !important',
  width: '50vw',
  height: '100vh',
  top: '0px',
  right: '0px',
  // zIndex: '60',
};

const RenderMap = (props) => {
  const { mainData, searchedGeocode, handleGeoCode, zoom, handleZoom } = props;

  const placesInfo = mainData.planDatesAndPlace;

  return (
    <GoogleMap
      id={'mapping'}
      mapContainerStyle={mapContainerStyle}
      zoom={zoom}
      center={searchedGeocode}
    >
      {placesInfo !== null
        ? placesInfo.map((place) => (
            <MarkerLists
              key={place.planDateId}
              data={place}
              handleGeoCode={handleGeoCode}
              handleZoom={handleZoom}
            />
          ))
        : null}
    </GoogleMap>
  );
};

export default RenderMap;
