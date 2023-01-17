import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCookie } from "../../Util/Cookies";

//axios.get
const MyLogs = ({ mode }) => {
  const dummy = [
    {
      boardId: 1,
      title: "title",
      likes: 0,
      views: 0,
      memberId: 1,
      displayName: "wpdnd",
      profileImage:
        "https://seb41pre020.s3.ap-northeast-2.amazonaws.com/basic.png",
      checkLikes: true,
      travelPeriod: "JAN 01 - JAN 03, 2021",
      cityImage:
        "https://youimg1.tripcdn.com/target/0104p120008ars39uB986_C_800_10000.jpg",
    },
    {
      boardId: 2,
      title: "title",
      likes: 0,
      views: 1,
      memberId: 1,
      displayName: "wpdnd",
      profileImage:
        "https://seb41pre020.s3.ap-northeast-2.amazonaws.com/basic.png",
      checkLikes: false,
      travelPeriod: "JAN 01 - JAN 03, 2021",
      cityImage:
        "https://lh5.googleusercontent.com/p/AF1QipPOse0VYy5ZbAIVOet6W0sSvyS2L391-c52Pv0=w408-h271-k-no",
    },
  ];

  const navigate = useNavigate();
  const [logList, setLogList] = useState(dummy);

  const token = getCookie("accessToken");
  const memberId = getCookie("memberId");

  // const getTrip = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/board/user/${memberId}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     })
  //     .then((res) => setLogList(res.data));
  // };

  // useEffect(() => {
  //   getTrip();
  // }, []);

  const handleNavigate = (el) => {
    if (mode === "plan") {
      navigate(`/board/${el.boardId}`);
    } else if (mode === "board") {
      navigate(`/board/edit/${el.boardId}`);
    }
  };

  return (
    <MyLogsContainer>
      <h2>My Logs</h2>
      <div className="contents">
        {logList.map((el) => (
          <div
            className="my-logs__card"
            key={el.boardId}
            onClick={() => handleNavigate(el)}
          >
            <img alt="place_image" src={el.cityImage} />
            <div className="meta_title">{el.title}</div>
            <div className="meta_content">{el.travelPeriod}</div>
            <div className="meta_profile">
              <img alt="profile_image" src={el.profileImage} />
              <div>{el.displayName} </div>
            </div>
            <div className={el.checkLikes ? "meta_likes likes" : "meta_likes"}>
              <svg viewBox="0 0 16 16">
                <path
                  //fill-rule="evenodd"
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

    .my-logs__card {
      position: relative;
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
          margin-bottom: 2px;
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
    }
  }
`;
