import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

import PlanSection from '../Components/itinerary/PlanSection';
import RenderMap from '../Components/itinerary/RenderMap';
import TopNavigation from '../Components/itinerary/TopNavigation';

import { getCookie } from '../Util/Cookies';

const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

const Itinerary = () => {
  const [libraries] = useState(['places']);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: libraries,
  });

  const { itineraryId } = useParams();

  const [searchedGeocode, setSearchedGeocode] = useState({
    lat: 37.555969,
    lng: 126.972336,
  });
  const [zoom, setZoom] = useState(13);
  const [searchBox, setSearchBox] = useState('');
  const [searchData, setSearchData] = useState({});
  const [startDate, setStartDate] = useState('Start date');
  const [endDate, setEndDate] = useState('End date');
  const [mainData, setMainData] = useState({
    cityName: '',
    planTitle: '',
    startDate: startDate,
    endDate: endDate,
    budget: null,
    planDates: [],
    planDatesAndPlace: [],
  });
  const [title, setTitle] = useState('');
  const [refresh, setRefresh] = useState(1);
  const [budgetRefresh, setBudgetRefresh] = useState(1);

  const handleBudgetRefresh = () => {
    setBudgetRefresh(prevState => prevState * -1);
  };

  //refresh function
  const handleRefresh = () => {
    setRefresh(refresh * -1);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/plans/${itineraryId}`, {
        headers: {
          Authorization: getCookie('accessToken'),
          withCredentials: true,
        },
      })
      .then(res => {
        setMainData(res.data.data);
        setTitle(res.data.data.planTitle);
      });
  }, [itineraryId, refresh]);

  const handleGeoCode = (lat, lng) => {
    setSearchedGeocode({ lat, lng });
  };

  const handleZoom = () => {
    setZoom(17);
  };

  return (
    <Fragment>
      <TopNavigation
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        mainData={mainData}
        setMainData={setMainData}
        title={title}
        setTitle={setTitle}
        handleRefresh={handleRefresh}
      />
      {isLoaded ? (
        <Fragment>
          <RenderMap
            searchedGeocode={searchedGeocode}
            mainData={mainData}
            zoom={zoom}
            handleZoom={handleZoom}
            handleGeoCode={handleGeoCode}
          />
          <PlanSection
            searchedGeocode={searchedGeocode}
            setSearchedGeocode={setSearchedGeocode}
            searchBox={searchBox}
            setSearchBox={setSearchBox}
            searchData={searchData}
            setSearchData={setSearchData}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            mainData={mainData}
            handleGeoCode={handleGeoCode}
            handleZoom={handleZoom}
            handleRefresh={handleRefresh}
            budgetRefresh={budgetRefresh}
            handleBudgetRefresh={handleBudgetRefresh}
          />
        </Fragment>
      ) : (
        <p>Loading</p>
      )}
    </Fragment>
  );
};

export default Itinerary;
