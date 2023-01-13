import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header";
import MyTrips from "../Components/user/MyTrips";
import MyLogs from "../Components/user/MyLogs";

import { getData } from "../Util/api";
import { postData } from "../Util/api";
import { getCookie, removeCookie } from "../Util/Cookies";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const token = getCookie("accessToken");
  const refreshToken = localStorage.getItem("refresh-token");
  const memberId = getCookie("memberId");

  // 유저 정보 조회
  const getUserInfo = async () => {
    const data = await getData(`/members/userProfile/${memberId}`);
    setUserInfo(data);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // 로그아웃 요청
  const handleSignout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      await postData("/members/logout", {
        accessToken: token,
        refreshToken: refreshToken,
      }).then((res) => {
        removeCookie("accessToken");
        removeCookie("memberId");
        localStorage.removeItem("refresh-token");
        window.location.replace("/");
      });
    }
  };

  return (
    <>
      <Header login={true} />
      <UserProfileContainer>
        <div className="user_profile">
          <div className="user_meta">
            <div className="user_meta_left">
              <img src={userInfo.profileImage} alt="profile_image" />
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
            <button className="sign_out" onClick={handleSignout}>
              sign out
            </button>
          </div>
        </div>
        <div className="map">
          <div className="meta_map">
            <div>{userInfo.cities} cities</div>
            <div>{userInfo.trips} trips</div>
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

      > .sign_out {
        color: rgba(0, 0, 0, 0.5);
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
