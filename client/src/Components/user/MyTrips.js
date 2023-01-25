import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import styled from "styled-components";

import { Mode } from "../../Util/constants";
import { getCookie } from "../../Util/Cookies";

const MyTrips = ({ mode }) => {
  const navigate = useNavigate();
  const token = getCookie("accessToken");

  //초기값 배열 설정하기
  const [tripList, setTripList] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/plans`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        if (mode === Mode.Write) {
          setTripList(
            res.data.data.filter((trip) => trip.boardCheck === false)
          );
        } else {
          setTripList(res.data.data);
        }
      });
  }, []);

  const handleNavigate = (trip) => {
    navigate(
      mode === Mode.Plan
        ? `/itinerary/${trip.planId}`
        : `/board/plan/${trip.planId}`
    );
  };

  return (
    <MyTripsContainer>
      <h2>My Trips</h2>
      <div className="contents">
        {tripList.map((trip) => (
          <div
            className="my-trips__card"
            key={trip.planId}
            onClick={() => handleNavigate(trip)}
          >
            <img alt="place_image" src={trip.city.cityImage} />
            <div className="meta_title">{trip.planTitle}</div>
            <div className="meta_content">
              <div>
                {dayjs(trip.startDate).format("M월 D일")} -{" "}
                {dayjs(trip.endDate).format("M월 D일")}
              </div>
              {/* <div>
                {trip.plans} places · {trip.cityName}
              </div> */}
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
    flex-wrap: wrap;

    .my-trips__card {
      width: calc((100vw - 228px) / 5);
      cursor: pointer;

      img {
        margin-bottom: var(--spacing-3);
        width: calc((100vw - 228px) / 5);
        height: calc((100vw - 228px) / 5);
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
