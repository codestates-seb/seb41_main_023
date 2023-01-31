import { Fragment } from 'react';
import { InfoWindowF } from '@react-google-maps/api';
import styled from 'styled-components';

import StarRate from './StarRate';

const InfoStyle = styled.div`
  background: var(--white);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 100%;
  overflow: hidden;
  font-weight: 400;

  h5 {
    margin-bottom: var(--spacing-1);
    font-size: var(--small-heading-font-size);
    line-height: var(--small-heading-line-height);
    font-weight: 600;
    color: var(--dark-gray-1);
  }

  > .info__address {
    color: var(--light);
    margin-bottom: var(--spacing-1);
  }

  .title {
    font-weight: 600;
    color: var(--primary-blue-bright);
    margin-bottom: var(--spacing-1);
  }

  .hours__container {
    margin-bottom: var(--spacing-2);
  }

  .hours__list {
    display: flex;
    flex-direction: column;
    gap: 2px;

    > p {
      color: var(--dark-gray-3);
    }
  }

  .contact__container {
    margin-bottom: var(--spacing-2);

    > a {
      color: var(--dark-gray-3);

      &:hover {
        color: var(--dark-gray-1);
      }
    }
  }

  > .website__container {
    > a {
      color: var(--primary-blue-dark);

      &:hover {
        color: var(--primary-blue);
      }
    }
  }
`;

const InfoWindow = props => {
  const { singleData, setActiveMarker } = props;

  const { placeName, openingHours, phone, placeAddress, ratings, website } =
    singleData;

  return (
    <Fragment>
      <InfoWindowF
        options={{
          pixelOffset: new window.google.maps.Size(0, -40),
        }}
        position={{
          lat: singleData.latitude,
          lng: singleData.longitude,
        }}
        onCloseClick={() => setActiveMarker(null)}
      >
        <InfoStyle>
          <InfoContainer>
            <h5>{placeName}</h5>
            <p className="info__address">{placeAddress}</p>
            {ratings ? <StarRate rating={ratings} /> : null}
            <div className="hours__container">
              {openingHours ? <h6 className="title">영업시간</h6> : null}
              <div className="hours__list">
                {openingHours
                  ? openingHours
                      .split(',')
                      .map((day, idx) => <p key={idx}>{day}</p>)
                  : null}
              </div>
            </div>
            {phone ? (
              <div className="contact__container container">
                <h6 className="title">전화번호</h6>
                <a href={`tel:${phone}`}>{phone}</a>
              </div>
            ) : null}
            {website ? (
              <div className="website__container container">
                <h6 className="title">웹사이트</h6>
                <a href={website} rel="noreferrer" target="_blank">
                  {website}
                </a>
              </div>
            ) : null}
          </InfoContainer>
        </InfoStyle>
      </InfoWindowF>
    </Fragment>
  );
};

export default InfoWindow;
