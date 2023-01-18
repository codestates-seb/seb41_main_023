import styled from "styled-components";
import StarRate from "../../itinerary/StarRate";

const SingleItinerary = (props) => {
    const {data, handleGeoCode} = props;

    return (
        <DayWrapper>
            {data ? (
                data.map((place) => (
                    <SinglePlanContainer
                        key={place.index}
                        onClick={() => {
                            handleGeoCode(
                                place.latitude,
                                place.longitude
                            );
                        }
                    }
                    >
                        <div className={'single_index'}>{place.index}</div>
                        <SingleInfoContainer>
                            <div className={'place_name'}>{place.placeName}</div>
                            <div className={'place_address'}>{place.placeAddress}</div>
                            <StarRate rating={place.ratings}/>
                            {/*<div className={'place_description'}>{place.description}</div>*/}
                        </SingleInfoContainer>
                        <SingleDescriptionContainer>
                            {place.description}
                        </SingleDescriptionContainer>
                    </SinglePlanContainer>
                ))
            ) : null}
        </DayWrapper>
    )
};

export default SingleItinerary;

const DayWrapper = styled.div`
  margin: 30px 0;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const SinglePlanContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  cursor: pointer;
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;
  
  .single_index {
    padding: 0 20px;
  }
`;

const SingleInfoContainer = styled.div`
  width: 30%;
  height: auto;
  max-height: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  div {
    margin-bottom: 15px;
  }
  
  .place_name {
    font-size: 15px;
    font-weight: bold;
  }
  
  //.place_description {
  //  word-break: break-word;
  //}
`;

const SingleDescriptionContainer = styled.div`
  width: 70%;
  margin: 0 10px 5px 10px;
  padding: 0 20px 10px 30px;
  text-overflow: ellipsis;
  overflow: scroll;
`;