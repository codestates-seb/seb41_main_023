import {InfoWindowF} from "@react-google-maps/api";
import styled from "styled-components";
import StarRate from "./StarRate";

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
  margin: 15px;
  
  .content {
    margin: 10px 0;
  }
  
  p {
    margin: 5px 0;
  }
`;

const InfoWindow = (props) => {
    const {searchedGeocode, searchData, setSearchData, setInfoWindowOpen} = props;

    const closeInfoWindowHandler = () => {
        setInfoWindowOpen(false);
    }

    const showedData = searchData !== null ? searchData[searchData.length - 1] : [];
    const {name, photo, price_level, rating, openingHours, website, formattedAddress, phoneNumber} = showedData;

    return (
        <InfoWindowF
            options={{
                pixelOffset: new window.google.maps.Size(0, -40)
            }}
            position={searchedGeocode}
            onCloseClick={closeInfoWindowHandler}
        >
            <InfoStyle>
                <InfoContainer>
                    <h2>{name}</h2>
                    {photo ? (
                        <div className={'content'}>
                            <img src={photo} alt={`${name} 의 사진`}/>
                        </div>
                    ) : null}
                    {price_level ? (
                        <p>가격레벨 : {price_level}</p>
                    ) : null}
                    {rating ? (
                        <StarRate rating={rating}/>
                    ) : null}
                    <div className={'content'}>
                        {openingHours ? <p>영업시간</p> : null}
                        {openingHours ? (
                            openingHours.map((day, idx) => (
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
                        <p>주소 : {formattedAddress}</p>
                    </div>
                    {phoneNumber ? (
                        <div className={'content'}>
                            <p>전화번호 : <a href={`tel:${phoneNumber}`}>{phoneNumber}</a></p>
                        </div>
                    ) : null}
                </InfoContainer>
            </InfoStyle>
        </InfoWindowF>
    )
};

export default InfoWindow;