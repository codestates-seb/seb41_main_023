import styled from 'styled-components';

import SingleItinerary from './SingleItinerary';

const BoardSection = props => {
  const { boardData, handleGeoCode } = props;
  const { content, days } = boardData;

  return (
    <Container>
      <h3 className="section__title">Travel Experience</h3>
      <p className="travel-experience__content">
        {content.split('\n').map((line, idx) => {
          return (
            <span key={idx}>
              {line}
              <br />
            </span>
          );
        })}
        }
      </p>
      <h3 className="section__title">Itinerary</h3>
      <div className="itinerary__container">
        {days
          ? days.map((day, idx) => (
              <ItineraryItem key={idx}>
                <div className={'itinerary__day'}>{day.day}</div>
                <SingleItinerary
                  data={day.placeDetails}
                  handleGeoCode={handleGeoCode}
                />
              </ItineraryItem>
            ))
          : null}
      </div>
    </Container>
  );
};

export default BoardSection;

const Container = styled.div`
  position: relative;
  width: 50vw;
  padding: 50px;
  padding-bottom: 0;
  margin-bottom: var(--spacing-5);

  > .section__title {
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    color: var(--black);
    font-weight: 600;
  }

  > .travel-experience__content {
    margin-bottom: var(--spacing-5);
  }

  > .itinerary__container {
    .itinerary__item:last-child {
      margin-bottom: 0;
    }
  }
`;

const ItineraryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);

  .itinerary__day {
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    color: var(--dark-gray-1);
    font-weight: normal;
  }
`;
