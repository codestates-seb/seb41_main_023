import styled from "styled-components";
import EditContainer from "./EditContainer";
import SideDateBar from "./SideDateBar";

const TravelContainer = styled.div`
  display: flex;
  width: 50%;
  box-sizing: border-box;
  flex-direction: row;
`;


const PlanSection = (props) => {
    const {
        center,
        setCenter,
        searchBox,
        setSearchBox,
        searchData,
        setSearchData,
        searchedGeocode,
        setSearchedGeocode,
        setInfoWindowOpen,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        mainData,
        setMainData
    } = props;

    return (
        <TravelContainer>
            <SideDateBar
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
            <EditContainer
                center={center}
                setCenter={setCenter}
                searchBox={searchBox}
                setSearchBox={setSearchBox}
                searchData={searchData}
                setSearchData={setSearchData}
                searchedGeocode={searchedGeocode}
                setSearchedGeocode={setSearchedGeocode}
                setInfoWindowOpen={setInfoWindowOpen}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                mainData={mainData}
                setMainData={setMainData}
            />
        </TravelContainer>
    )
};

export default PlanSection;