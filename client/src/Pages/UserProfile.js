import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header";
import TripList from "../Components/MyTrips";

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

const UserProfile = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header login={true} />
      <UserProfileContainer>
        <div className="user_profile">
          <div className="user_meta">
            <div className="user_meta_left">
              <div>프로필 이미지</div>
            </div>
            <div className="user_meta_right">
              <div>유저 아이디</div>
              <div>유저 이메일</div>
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
          <div>0 trips</div>
        </div>
      </UserProfileContainer>
      <TripList />
    </>
  );
};

export default UserProfile;
