import styled from "styled-components";
import SingleItinerary from "./SingleItinerary";

const BoardSection = (props) => {
    const {boardData, handleGeoCode} = props;

    const {content, days} = boardData;

    return (
        <ContentWrapper>
            <ContentTitle>Travel Experience</ContentTitle>
            <Content>
                {content}
                I ate a lot of marinated salmon whatever ...blnah cahsd
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis no
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis no
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis no
            </Content>
            <ItineraryTitle>Itinerary</ItineraryTitle>
            {days ? (
                days.map((day, idx) => (
                    <ItinerarySection key={idx}>
                        <div className={'itinerary_day'}>{day.day}</div>
                        <SingleItinerary
                            data={day.placeDetails}
                            handleGeoCode={handleGeoCode}
                        />
                    </ItinerarySection>
                ))
            ) : null}
        </ContentWrapper>
    )
};

export default BoardSection;

const ContentWrapper = styled.div`
  width: 50vw;
  height: calc(100vh - 300px);
  padding: 40px 30px;
  overflow: scroll;
`;

const ContentTitle = styled.h1`
  font-size: 20px;
`;

const Content = styled.div`
  margin: 30px 0;
  width: 100%;
  height: auto;
  word-wrap: break-word;
`;

const ItineraryTitle = styled.h1`
  font-size: 20px;
`;

const ItinerarySection = styled.div`
  width: 100%;
  height: auto;
  margin: 30px 0;

  .itinerary_day {
    font-size: 18px;
  }
`;