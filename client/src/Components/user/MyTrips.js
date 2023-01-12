import moment from "moment";
import getData from "../../Util/api";
import postData from "../../Util/api";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyTrips = () => {
  const dummyItineraryList = [
    {
      planId: 1,
      cityName: "서울",
      planTitle: "Trip to Seoul",
      startDate: "2022-01-03",
      endDate: "2022-01-05",
      plans: "6",
      image: "https://picsum.photos/200", //추가 필요
    },
    {
      planId: 2,
      cityName: "서울",
      planTitle: "Trip to Seoul",
      startDate: "2022-01-03",
      endDate: "2022-01-05",
      plans: "6",
      image: "https://picsum.photos/200",
    },
  ];

  const navigate = useNavigate();

  //초기값 배열 설정하기
  const [tripList, setTripList] = useState(dummyItineraryList);

  // 전체 일정 조회 async
  const getTrip = async () => {
    const data = await getData(`/city`);
    console.log(data);
  };

  // const postTrip = async () => {
  //   const data = await postData(`/posts`, {
  //     userId: 11,
  //     id: 101,
  //     body: "test body",
  //     title: "test title",
  //   });
  //   console.log(data);
  // };

  useEffect(() => {
    getTrip();
  }, []);

  return (
    <MyTripsContainer>
      <h2>My Trips</h2>
      <div className="contents">
        {tripList.map((el) => (
          <div key={el.planId}>
            <img
              alt="place_image"
              src={el.image}
              onClick={() => navigate(`/itinerary/${el.id}`)}
            />
            <div className="meta_title">{el.planTitle}</div>
            <div className="meta_content">
              <div>
                {moment(el.startDate).format("M월 D일")} -{" "}
                {moment(el.endDate).format("M월 D일")}
              </div>
              <div>{el.plans} 장소</div>
              <div>{el.cityName}</div>
            </div>
          </div>
        ))}
      </div>
    </MyTripsContainer>
  );
};

export default MyTrips;

const MyTripsContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 20px;

  .contents {
    display: flex;

    > div {
      margin: 20px 17px 10px 0;
      cursor: pointer;

      > img {
        border-radius: 7px;
      }

      > .meta_title {
        margin: 5px;
        font-size: 15px;
      }

      > .meta_content {
        margin: 5px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
`;
