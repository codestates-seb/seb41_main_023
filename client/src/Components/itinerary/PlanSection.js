import styled from "styled-components";
import EditContainer from "./EditContainer";

const TravelContainer = styled.div`
  display: flex;
  width: 50%;
  box-sizing: border-box;
  flex-direction: row;
`;

const LeftSideBar = styled.div`
  width: 50px;
  background-color: white;
  border-right: 1px solid #e9ecef;
  height: calc(100% - 200px);
  overflow: hidden;
  position: fixed;
  z-index: 50;
  margin-top: 221px;
  overflow-y: scroll;
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
        setInfoWindowOpen
    } = props;

    return (
        <TravelContainer>
            <LeftSideBar/>
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
            />
        </TravelContainer>
    )
};

export default PlanSection;