import moment from "moment";
import axios from "axios";
import { getCookie } from "../../Util/Cookies";
import { getData } from "../../Util/api";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MyTrips = () => {
  const navigate = useNavigate();
  const token = getCookie("accessToken");

  //초기값 배열 설정하기
  const [tripList, setTripList] = useState([]);

  // 전체 일정 조회 async
  // const getTrip = async () => {
  //   await getData(`/plans`).then((res) => setTripList(res.data));
  // };

  const getTrip = () => {
    axios
      .get(`https://www.sebmain41team23.shop/plans`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setTripList(res.data.data));
  };

  useEffect(() => {
    getTrip();
  }, []);

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
                {moment(el.startDate).format("M월 D일")} -{" "}
                {moment(el.endDate).format("M월 D일")}
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
