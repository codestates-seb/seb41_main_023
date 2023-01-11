import styled from "styled-components";
import SinglePlanBox from "./SinglePlanBox";
import PlaceInputBox from "./PlaceInputBox";

const Container = styled.div`
  position: relative;
  word-wrap: break-word;
  min-width: 0;
  flex-grow: 1;
  max-width: 100%;
  min-height: calc(100% - 200px);
  width: calc(100% - 50px);
  margin-top: 30px;
  margin-left: 50px;
  padding: 0;
  overflow-y: scroll;
`;

const PlanContainer = styled.div`
  margin: 240px 48px 0 48px;
  position: relative;
`;

const Title = styled.h2`
  margin-top: 24px;
  margin-bottom: 24px;
  align-items: center;
  display: flex;
  font-size: 36px;
  line-height: 1 !important;
  font-weight: 700 !important;
  margin-right: auto !important;
`;

const SectionComponent = styled.div`
  box-sizing: border-box;
`;

const EditContainer = (props) => {
    const {
        setCenter,
        searchBox,
        setSearchBox,
        searchData,
        setSearchData,
        setSearchedGeocode,
        setInfoWindowOpen
    } = props;

    return (
        <Container>
            <PlanContainer>
                <Title>Itinerary</Title>
                <SectionComponent>
                    <SinglePlanBox
                        searchData={searchData}
                        setSearchData={setSearchData}
                    />
                    <PlaceInputBox
                        searchBox={searchBox}
                        setSearchBox={setSearchBox}
                        searchData={searchData}
                        setSearchData={setSearchData}
                        setInfoWindowOpen={setInfoWindowOpen}
                        setSearchedGeocode={setSearchedGeocode}
                        setCenter={setCenter}
                    />
                </SectionComponent>
            </PlanContainer>
        </Container>
    )
};

export default EditContainer;