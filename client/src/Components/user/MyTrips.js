import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyTrips = () => {
  const dummyItineraryList = [
    {
      planId: 1,
      cityName: 'Seoul',
      planTitle: 'Trip to Seoul',
      startDate: 'Jan 31',
      endDate: 'Feb 18',
      plans: '6',
      image: 'https://picsum.photos/100', //추가 필요
    },
    {
      planId: 2,
      cityName: 'Seoul',
      planTitle: 'Trip to Seoul',
      startDate: 'Jan 31',
      endDate: 'Feb 18',
      plans: '6',
      image: 'https://picsum.photos/200',
    },
    {
      planId: 3,
      cityName: 'Seoul',
      planTitle: 'Trip to Seoul',
      startDate: 'Jan 31',
      endDate: 'Feb 18',
      plans: '6',
      image: 'https://picsum.photos/300',
    },
    {
      planId: 4,
      cityName: 'Seoul',
      planTitle: 'Trip to Seoul',
      startDate: 'Jan 31',
      endDate: 'Feb 18',
      plans: '6',
      image: 'https://picsum.photos/400',
    },
    {
      planId: 5,
      cityName: 'Seoul',
      planTitle: 'Trip to Seoul',
      startDate: 'Jan 31',
      endDate: 'Feb 18',
      plans: '6',
      image: 'https://picsum.photos/500',
    },
  ];

  const navigate = useNavigate();
  const [tripList, setTripList] = useState(dummyItineraryList);
  const [token, setToken] = useState();

  // 토큰 설정
  // useEffect(() => {
  //   if (cookies.accessToken) {
  //     setToken(cookies.accessToken.token);
  //   }
  // }, []);

  // 전체 일정 조회
  // useEffect(() => {
  //   axios({
  //     url: `${process.env.REACT_APP_API_URL}/plans`,
  //     method: "GET",
  //     headers: {
  //        Authorization: token,
  //       withCredentials: true,
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //        setTripList(response.data)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <MyTripsContainer>
      <h2>My Trips</h2>
      <div className="contents">
        {tripList.map((el) => (
          <div className="my-trips__card" key={el.planId}>
            <img
              alt="place_image"
              src={el.image}
              onClick={() => navigate(`/itinerary/${el.planId}`)}
            />
            <div className="meta_title">{el.planTitle}</div>
            <div className="meta_content">
              <div>
                {el.startDate} - {el.endDate}
              </div>
              <div>
                {el.plans} places · {el.cityName}
              </div>
            </div>
          </div>
        ))}
      </div>
    </MyTripsContainer>
  );
};

export default MyTrips;

const MyTripsContainer = styled.div`
  position: relative;
  margin-bottom: 50px;

  h2 {
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    font-weight: 600;
    color: var(--black);
  }

  .contents {
    display: flex;
    gap: var(--spacing-4);

    .my-trips__card {
      width: calc((100vw - 228px) / 5);
      cursor: pointer; 

      img {
        margin-bottom: var(--spacing-3);
        width: 100%; 
        border-radius: 5px;
      }

      .meta_title {
        margin-bottom: var(--spacing-1);
        font-size: var(--large-text-size);
        line-height: var(--large-text-line-height);
        font-weight: 600;
      }

      .meta_content {
        > div {
          color: var(--light);

          &:not(:last-child) {
            margin-bottom: 2px;
          }
        }
      }
    }
  }
`;
