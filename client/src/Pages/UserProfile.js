import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Header from '../Components/Header';
import Footer from './Footer';
import MyTrips from '../Components/user/MyTrips';
import MyLogs from '../Components/user/MyLogs';

import { postData } from '../Util/api';
import { getCookie, removeCookie } from '../Util/Cookies';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  const token = getCookie('accessToken');
  const memberId = getCookie('memberId');

  const getUserInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/members/userProfile/${memberId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => setUserInfo(res.data));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // 로그아웃 요청
  const handleSignOut = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      await postData('/members/logout', {
        headers: {
          Authorization: token,
        },
      }).then(res => {
        removeCookie('accessToken');
        removeCookie('memberId');
        localStorage.removeItem('refreshToken');
        window.location.replace('/');
      });
    }
  };

  return (
    <Container>
      <Header login={true} />
      <UserProfileContainer>
        <div className="top__container">
          <div className="user-profile__info">
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
              <button
                className="button--default button--subtle"
                onClick={() => navigate(`/user/${memberId}/edit`)}
              >
                Edit profile
              </button>
              <button
                className="button--default button--subtle"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>
          {/*<div className="map">*/}
          {/*  <div className="meta_map">*/}
          {/*    <div>*/}
          {/*      <span>{userInfo.cities}</span>*/}
          {/*      cities*/}
          {/*    </div>*/}
          {/*    <div>*/}
          {/*      <span>{userInfo.trips}</span>*/}
          {/*      trips*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
        <div className="bottom__container">
          <MyTrips mode="plan" />
          <MyLogs mode="plan" />
        </div>
      </UserProfileContainer>
      <Footer />
    </Container>
  );
};

export default UserProfile;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;

  & .header__container {
    top: 0;
  }
`;

const UserProfileContainer = styled.div`
  position: relative;
  margin: 0 50px;
  margin-top: 160px;

  .button--subtle {
    border: 1px solid var(--light-gray-4);
  }

  .my-logs {
    margin-bottom: 100px;
  }

  .top__container {
    position: relative;
    display: flex;
    gap: 50px;
    height: 300px;
    margin-bottom: 50px;
  }

  .user-profile__info {
    min-width: 400px;

    .user_meta {
      display: flex;
      gap: var(--spacing-4);
      align-items: center;
      margin-bottom: var(--spacing-4);

      .user_meta_left {
        width: 150px;
        height: 150px;
        border-radius: 50%;

        > img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
        }
      }

      .user_meta_right {
        .display_name {
          margin-bottom: var(--spacing-1);
          font-size: var(--default-heading-font-size);
          line-height: var(--default-heading-line-height);
          color: var(--dark-gray-1);
        }

        .email {
          color: var(--light);
        }
      }
    }

    .user_edit {
      display: flex;
      flex-direction: column;
      margin-top: 50px;
      gap: 0;

      > button:first-child {
        margin-bottom: var(--spacing-2);
        border: 1px solid var(--light-gray-4);

        &:hover {
          background-color: var(--light-gray-1);
        }

        &:active {
          background-color: var(--light-gray-2);
        }
      }

      > button:last-child {
        color: var(--light);
      }
    }
  }

  .map {
    width: 100%;
    height: 300px !important;
    background-color: var(--primary-blue-light-2);
    border-radius: 5px;
    height: 100%;

    .meta_map {
      display: inline-flex;
      margin: var(--spacing-3);
      background-color: var(--light-gray-2);
      border-radius: 3px;
      box-shadow: 0px 0px 1px rgba(9, 30, 66, 0.31),
        0px 8px 12px rgba(9, 30, 66, 0.15);

      > div {
        display: inline-flex;
        gap: var(--spacing-1);
        padding: 12px;
        font-size: var(--large-text-size);
        line-height: var(--large-text-line-height);
        cursor: default;

        > span {
          font-size: var(--large-text-size);
          line-height: var(--large-text-line-height);
          color: var(--primary-blue-bright);
          font-weight: 600;
        }
      }
    }
  }

  .bottom__container {
    position: relative;
  }
`;
