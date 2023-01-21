import styled from 'styled-components';
import StarRate from '../../itinerary/StarRate';

const SingleItinerary = (props) => {
  const { data, handleGeoCode } = props;

  return (
    <Container>
      {data
        ? data.map((place) => (
            <SinglePlanContainer
              key={place.index}
              onClick={() => {
                handleGeoCode(place.latitude, place.longitude);
              }}
            >
              <div className='location-number__container'>
                <div className='location-number'>{place.index}</div>
              </div>
              <div className='place-info__main'>
                <SingleInfoContainer>
                  <div className='location-name'>{place.placeName}</div>
                  <div className='location-address'>{place.placeAddress}</div>
                  <StarRate rating={place.ratings} />
                </SingleInfoContainer>
                <SingleDescriptionContainer>{place.description}</SingleDescriptionContainer>
              </div>
            </SinglePlanContainer>
          ))
        : null}
    </Container>
  );
};

export default SingleItinerary;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
  cursor: default;
`;

const SinglePlanContainer = styled.div`
  display: flex;
  gap: var(--spacing-3);
  width: 100%;
  min-height: 150px;
  border-bottom: 1px solid var(--light-gray-4);

  > .location-number__container {
    .location-number {
      font-size: var(--small-heading-font-size);
      line-height: var(--small-heading-line-height);
      color: var(--primary-blue-bright);
      font-weight: 600;
    }
  }

  > .place-info__main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3);
    width: 100%;
  }
`;

const SingleInfoContainer = styled.div`
  cursor: pointer;

  > .location-name {
    margin-bottom: var(--spacing-1);
    font-size: var(--small-heading-font-size);
    line-height: var(--small-heading-line-height);
    color: var(--dark-gray-1);
    font-weight: 600;
  }

  > .location-address {
    margin-bottom: var(--spacing-1);
    color: var(--light);
  }

  > .star-rate__container {
    margin-bottom: 0;
  }
`;

const SingleDescriptionContainer = styled.div``;
