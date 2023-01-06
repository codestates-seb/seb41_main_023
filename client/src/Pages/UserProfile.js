import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import Header from "../Components/Header";
import TripList from "../Components/TripList";

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
  return (
    <>
      <Header login={true} />
      <UserProfileContainer>
        <div className="user_profile">
          <div className="user_meta">
            <div className="user_meta_left">
              <div>프로필 사진</div>
            </div>
            <div className="user_meta_right">
              <div>유저 이름</div>
              <div>유저 이메일</div>
            </div>
          </div>
          <div className="user_edit">
            <button>edit profile</button>
            <button>sign out</button>
          </div>
        </div>
        <div className="map">
          지도 영역
          <div>0 cities</div>
          <div>0 trips</div>
        </div>
      </UserProfileContainer>
      <TripList />
    </>
  );
};

export default UserProfile;
