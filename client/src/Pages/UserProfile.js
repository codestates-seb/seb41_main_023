import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header";
import MyTrips from "../Components/user/MyTrips";
import MyLogs from "../Components/user/MyLogs";
import { useState, useEffect } from "react";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    memberId: 1,
    email: "1234@gmail.com",
    displayName: "1234",
    memberStatus: "활동중",
    profile: "https://picsum.photos/50",
  });

  const [tripList, setTripList] = useState();

  //일정 개수
  const [trips, setTrips] = useState(0);

  const [token, setToken] = useState();
  const [memberId, setMemberId] = useState();

  //토큰 설정
  // useEffect(() => {
  //   if (cookies.accessToken) {
  //     setToken(cookies.accessToken.token);
  //   }
  // }, []);

  //memberId 설정

  //유저 정보 조회
  // useEffect(() => {
  //   axios({
  //     url: `${process.env.REACT_APP_API_URL}/members/${memberId}`,
  //     method: "GET",
  //     data: formData,
  //     headers: {
  //       // Authorization: token,
  //       withCredentials: true,
  //     },
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //        setUserInfo(res.data)
  //
  //     })

  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  //유저 여행 정보 조회(방문도시 수, 여행 수)
  // useEffect(() => {
  //   axios({
  //     url: `${process.env.REACT_APP_API_URL}/plans`,
  //     method: "GET",
  //     data: formData,
  //     headers: {
  //        Authorization: token,
  //       withCredentials: true,
  //     },
  //   })
  //     .then((respresonse) => {
  //       console.log(res.data);
  //        setTripList(res.data);
  //      setTrips(res.data.length);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <>
      <Header login={true} />
      <UserProfileContainer>
        <div className="user_profile">
          <div className="user_meta">
            <div className="user_meta_left">
              <img src={userInfo.profile} alt="profile_image" />
            </div>
            <div className="user_meta_right">
              <div className="display_name">{userInfo.displayName}</div>
              <div className="email">{userInfo.email}</div>
            </div>
          </div>
          <div className="user_edit">
            <button onClick={() => navigate("/user/:memberId/edit")}>
              edit profile
            </button>
            <button>sign out?</button>
          </div>
        </div>
        <div className="map">
          <div className="meta_map">
            <div>0 cities</div>
            <div>{trips} trips</div>
          </div>
        </div>
      </UserProfileContainer>
      <MyTrips />
      <MyLogs />
    </>
  );
};

export default UserProfile;

const UserProfileContainer = styled.div`
  display: flex;
  margin-top: 70px;
  height: 20vh;

  .user_profile {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;

    margin: 20px;

    .user_meta {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-top: 30px;
      margin-bottom: 40px;

      .user_meta_left {
        > img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      .user_meta_right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        > .display_name {
          font-size: 17px;
          font-weight: 600;
        }

        > .email {
          font-size: 15px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }

    .user_edit {
      display: flex;
      flex-direction: column;
      justify-content: center;

      /* margin-top: 20px; */

      > button {
        :first-child {
          border: 1px solid rgba(0, 0, 0, 0.9);
        }
        border: none;
        border-radius: 3px;
        padding: 10px 0;
        background-color: transparent;
        cursor: pointer;
      }
    }
  }

  .map {
    margin: 20px;
    margin-left: 30px;
    flex-grow: 9;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 7px;
    height: 100%;

    .meta_map {
      display: flex;
      margin: 15px;
      padding: 13px 8px;
      background-color: whitesmoke;
      width: 15%;
      border-radius: 5px;
      font-size: 13px;
      font-weight: 600;
      justify-content: center;
      > div {
        margin-right: 5px;
      }
    }
  }
`;
