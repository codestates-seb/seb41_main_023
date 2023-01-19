import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { Mode } from "../../Util/constants";
import { getCookie } from "../../Util/Cookies";

const MyLogs = ({ mode }) => {
  const navigate = useNavigate();
  const [logList, setLogList] = useState([]);

  const token = getCookie("accessToken");
  const memberId = getCookie("memberId");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/board/user/${memberId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => setLogList(res.data));
  }, []);

  const handleNavigate = (log) => {
    navigate(
      mode === Mode.Plan
        ? `/board/${log.boardId}`
        : `/board/edit/${log.boardId}`
    );
  };

  return (
    <MyLogsContainer className="my-logs">
      <h2>My Logs</h2>
      <div className="contents">
        {logList.map((log) => (
          <div
            className="my-logs__card"
            key={log.boardId}
            onClick={() => handleNavigate(log)}
          >
            <img
              className="meta__travel-image"
              alt="place_image"
              src={log.cityImage}
            />
            <div className="meta_title">{log.title}</div>
            <div className="meta_content">
              {moment(log.travelPeriod.split("-")[0]).format("M월 D일")} -{" "}
              {moment(log.travelPeriod.split("-")[1]).format("M월 D일")}
            </div>
            <div className="meta_profile">
              <img
                className="profile__image"
                alt="profile_image"
                src={log.profileImage}
              />
              <span>{log.displayName} </span>
            </div>
            <div className={log.checkLikes ? "meta_likes likes" : "meta_likes"}>
              <svg viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  fill="currentColor"
                  d="M7.29583817,13.7871612 C7.68473613,14.1808512 8.31605486,14.1828078 8.70304958,13.7885531 C8.70304958,13.7885531 10.9002368,11.6291175 13,9.00215315 C15,6.50000023 15.5000002,3.49999998 13,2.00000001 C10.5031852,0.501911222 8.00000022,3.00000005 8.00000022,3.00000005 C8.00000022,3.00000005 5.49772957,0.501362336 3.00000005,2.00000001 C0.500000019,3.49999999 0.999999993,6.50000023 2.99999999,9.00215315 C5.09401769,11.6219294 7.29583817,13.7871612 7.29583817,13.7871612 Z"
                ></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </MyLogsContainer>
  );
};

export default MyLogs;

const MyLogsContainer = styled.div`
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
    
    .my-logs__card {
      position: relative;
      width: calc((100vw - 228px) / 5);
      cursor: pointer;

      .meta__travel-image {
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
        margin-bottom: 2px;
        color: var(--light);

        > div {
          /* margin-bottom: 2px;
          text-transform: capitalize;
          color: var(--light); */
        }
      }

      .meta_likes {
        position: absolute;
        top: var(--spacing-3);
        right: var(--spacing-3);
        height: 24px;
        width: 24px;
        cursor: pointer;

        svg path {
          color: rgba(15, 15, 15, 0.25);
          stroke-width: 1.5;
          stroke: var(--white);
        }

        &:hover {
          svg path {
            color: rgba(202, 53, 53, 0.25);
            stroke-width: 1.5;
            stroke: var(--red-light-1);
          }
        }

        &.likes {
          svg path {
            color: var(--red);
            stroke: var(--red);
          }
        }
      }

      .meta_profile {
        margin-top: var(--spacing-2);
        display: flex;
        align-items: center;
        gap: var(--spacing-2);

        .profile__image {
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }

        > span {
          color: var(--dark-gray-3);
        }
      }
    }
  }
`;
