import {InfoWindowF} from "@react-google-maps/api";
import styled from "styled-components";
import StarRate from "./StarRate";
import {Fragment} from "react";

const InfoStyle = styled.div`
  background: white;
  border: 1px solid black;
  padding: 15px;
  display: flex;
  flex-direction: column;

  img {
    width: 200px;
    height: 140px;
  }

  span {
    word-wrap: break-word;
  }
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 80%;
  margin: 5px 0;
  
  h1 {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .content {
    margin: 10px 0;
  }

  p {
    margin: 5px 0;
  }
`;

const InfoWindow = (props) => {
    const {singleData, setActiveMarker} = props;

    const {placeName, openingHours, phone, placeAddress, ratings, website} = singleData;

    return (
        <Fragment>
            <InfoWindowF
                options={{
                    pixelOffset: new window.google.maps.Size(0, -40)
                }}
                position={{
                    lat: singleData.latitude,
                    lng: singleData.longitude
                }}
                onCloseClick={() => setActiveMarker(null)}
            >
                <InfoStyle>
                    <InfoContainer>
                        <h1>{placeName}</h1>
                        {ratings ? (
                            <StarRate rating={ratings}/>
                        ) : null}
                        <div className={'content'}>
                            {openingHours ? <p>영업시간</p> : null}
                            {openingHours ? (
                                openingHours.split(',').map((day, idx) => (
                                    <p key={idx}>
                                        {day}
                                    </p>
                                ))
                            ) : null}
                        </div>
                        {website ? (
                            <div className={'content'}>
                                <p>웹사이트 : <a href={website}>{website}</a></p>
                            </div>
                        ) : null}
                        <div className={'content'}>
                            <p>주소 : {placeAddress}</p>
                        </div>
                        {phone ? (
                            <div className={'content'}>
                                <p>전화번호 : <a href={`tel:${phone}`}>{phone}</a></p>
                            </div>
                        ) : null}
                    </InfoContainer>
                </InfoStyle>
            </InfoWindowF>

        </Fragment>
    )
};

export default InfoWindow;