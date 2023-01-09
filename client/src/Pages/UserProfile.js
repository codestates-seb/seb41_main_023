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
  const [trips, setTrips] = useState(0);

  //유저 id 조회
  // const [id, setId] = useState();

  // useEffect(()=>{

  // },[])

  //유저 정보 조회
  // useEffect(() => {
  //   axios({
  //     url: `${process.env.REACT_APP_API_URL}/members/id?`,
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
  //       // Authorization: token,
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
              <div>{userInfo.displayName}</div>
              <div>{userInfo.email}</div>
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
          지도 영역 : 방문한 도시 색칠...?
          <div>0 cities</div>
          <div>{trips} trips</div>
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

  height: 20vh;

  .user_profile {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;

    background-color: beige;

    margin: 20px;

    .user_meta {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-bottom: 40px;

      .user_meta_left {
      }
      .user_meta_right {
      }
    }

    .user_edit {
      display: flex;
      flex-direction: column;
      justify-content: center;

      margin-top: 20px;

      > button {
        cursor: pointer;
      }
    }
  }

  .map {
    margin: 20px;
    flex-grow: 9;

    background-color: aliceblue;
  }
`;
