import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import { getCookie } from '../../../Util/Cookies';

const TopSection = props => {
  const navigate = useNavigate();
  const { boardData, handleRefresh } = props;

  const logInMemberId = getCookie('memberId');
  const token = getCookie('accessToken');

  const {
    cityImage,
    checkLikes,
    cityName,
    createdAt,
    displayName,
    profileImage,
    title,
    views,
    memberId,
    boardId,
  } = boardData;

  // 좋아요 기능
  const changeLikes = boardId => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/board/${boardId}/likes`,
        {},
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(res => handleRefresh())
      .catch(err => console.log(err));
  };

  return (
    <TopContainer cityImage={cityImage}>
      <div className="top__gradient-bg"></div>
      <Header>
        <div
          className="button--default back__button"
          onClick={() => navigate(-1)}
        >
          Back
        </div>
        <div className="edit__like">
          {memberId === Number(logInMemberId) && (
            <div className={'button--container'}>
              <button
                className="button--primary"
                onClick={() => navigate(`/board/edit/${boardId}`)}
              >
                Edit Log
              </button>
            </div>
          )}
          {token && (
            <div
              className={checkLikes ? 'meta_likes likes' : 'meta_likes'}
              onClick={e => {
                e.stopPropagation();
                changeLikes(boardId);
              }}
            >
              <svg viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  fill="currentColor"
                  d="M7.29583817,13.7871612 C7.68473613,14.1808512 8.31605486,14.1828078 8.70304958,13.7885531 C8.70304958,13.7885531 10.9002368,11.6291175 13,9.00215315 C15,6.50000023 15.5000002,3.49999998 13,2.00000001 C10.5031852,0.501911222 8.00000022,3.00000005 8.00000022,3.00000005 C8.00000022,3.00000005 5.49772957,0.501362336 3.00000005,2.00000001 C0.500000019,3.49999999 0.999999993,6.50000023 2.99999999,9.00215315 C5.09401769,11.6219294 7.29583817,13.7871612 7.29583817,13.7871612 Z"
                ></path>
              </svg>
            </div>
          )}
        </div>
      </Header>
      <TripInfo>
        <div className="city-name__label">{cityName}</div>
        <h2>{title}</h2>
        <div className="writer-info__container">
          <div className="writer-image">
            <img src={profileImage} alt={`${displayName}의 프로필 사진`} />
          </div>
          <div className="writer-info">
            <p className="name">{displayName}</p>
            <p className="meta-info">
              {createdAt} · {views} views
            </p>
          </div>
        </div>
      </TripInfo>
    </TopContainer>
  );
};

export default TopSection;

const TopContainer = styled.div`
  position: relative;
  width: 50vw;
  height: 350px;
  background-color: var(--primary-blue-light-1);
  background-image: url(${props => props.cityImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: default;

  .top__gradient-bg {
    position: absolute;
    top: 0;
    width: 50vw;
    height: 350px;
    background: rgb(15, 15, 15);
    background: -moz-linear-gradient(
      0deg,
      rgba(15, 15, 15, 0.5) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    background: -webkit-linear-gradient(
      0deg,
      rgba(15, 15, 15, 0.5) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    background: linear-gradient(
      0deg,
      rgba(15, 15, 15, 0.5) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0f0f0f",endColorstr="#ffffff",GradientType=1);
    z-index: 1;
  }

  .writer-image {
    img {
      cursor: pointer;
    }
  }
`;

const Header = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 50px;
  height: 60px;
  width: calc(50vw - 100px);
  z-index: 100;

  > * {
    cursor: pointer;
  }

  > .edit__like {
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    > .meta_likes {
      height: 24px;
      width: 24px;
      cursor: pointer;
      margin-left: 30px;
      margin-top: 5px;

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
        margin-left: 30px;
        margin-top: 5px;
      }
    }
  }
`;

const TripInfo = styled.div`
  position: absolute;
  bottom: 50px;
  margin: 0 50px;
  width: calc(50vw - 100px);
  z-index: 100;

  .city-name__label {
    display: inline-block;
    margin-bottom: var(--spacing-1);
    padding: 6px var(--spacing-2);
    background-color: var(--primary-blue-dark);
    color: var(--light-gray-3);
    font-size: var(--small-text-size);
    line-height: var(--samll-text-line-height);
    font-weight: 500;
    border-radius: 3px;
  }

  h2 {
    margin-bottom: var(--spacing-3);
    font-size: var(--xx-large-heading-font-size);
    line-height: var(--xx-large-heading-line-height);
    font-weight: 600;
    color: var(--white);
  }

  .writer-info__container {
    display: flex;
    gap: var(--spacing-2);
    align-items: center;

    .writer-image {
      width: 30px;
      height: 30px;
      border-radius: 50%;

      > img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }

    .writer-info {
      > p {
        color: var(--light-gray-3);
      }
    }
  }
`;
