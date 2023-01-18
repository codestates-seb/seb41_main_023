import styled from "styled-components";
import EditContainer from "./EditContainer";

const TravelContainer = styled.div`
  display: flex;
  width: 50%;
  box-sizing: border-box;
  //flex-direction: row;
`;


const PlanSection = (props) => {
    const {
        searchBox,
        setSearchBox,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        mainData,
        handleGeoCode,
        handleZoom
    } = props;

    return (
        <TravelContainer>
            <EditContainer
                searchBox={searchBox}
                setSearchBox={setSearchBox}
                mainData={mainData}
                handleGeoCode={handleGeoCode}
                handleZoom={handleZoom}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
            />
        </TravelContainer>
    )
};

export default PlanSection;