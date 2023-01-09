import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyTripsContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 20px;

  .contents {
    display: flex;
    > div {
      margin: 20px;
      cursor: pointer;
    }
  }
`;

const MyTrips = () => {
  const dummyItineraryList = [
    {
      planId: 1,
      cityName: "Seoul",
      planTitle: "Trip to Seoul",
      startDate: "Jan 31",
      endDate: "Feb 18",
      plans: "6",
      image: "https://picsum.photos/200", //추가 필요
    },
    {
      planId: 2,
      cityName: "Seoul",
      planTitle: "Trip to Seoul",
      startDate: "Jan 31",
      endDate: "Feb 18",
      plans: "6",
      image: "https://picsum.photos/200",
    },
  ];

  const navigate = useNavigate();
  const [tripList, setTripList] = useState(dummyItineraryList);

  //전체 일정 조회
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
          <div>
            <img
              alt="place_image"
              src={el.image}
              onClick={() => navigate(`/itinerary/${el.planId}`)}
            />
            <div>{el.title}</div>
            <div>
              {el.startDate} - {el.endDate}
            </div>
            <div>{el.plans} places</div>
            <div>{el.cityName}</div>
          </div>
        ))}
      </div>
    </MyTripsContainer>
  );
};

export default MyTrips;
