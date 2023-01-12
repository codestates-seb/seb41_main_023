import moment from "moment";
import { getData } from "../../Util/api";
import { postData } from "../../Util/api";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyTrips = () => {
  const navigate = useNavigate();

  //초기값 배열 설정하기
  const [tripList, setTripList] = useState([]);

  // 전체 일정 조회 async
  const getTrip = async () => {
    const data = await getData(`/plans`);
    setTripList(data.data);
  };

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
              onClick={() => navigate(`/itinerary/${el.planId}`)}
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
