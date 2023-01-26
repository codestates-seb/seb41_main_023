import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import Calendar from '../Calendar';

import { getCookie } from '../../Util/Cookies';
import { formatDate, formatDateKo } from '../../Util/dayUtil';

const TopContainer = styled.div`
  position: relative;
  width: 50vw;
  height: 350px;
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

  .button--container {
    display: flex;
    flex-direction: row;

    .button--primary {
      margin-left: 10px;
    }
  }
`;

const TripInfo = styled.div`
  position: absolute;
  bottom: 50px;
  margin: 0 50px;
  z-index: 100;

  > input {
    display: block;
    font-size: var(--xx-large-heading-font-size);
    line-height: var(--xx-large-heading-line-height);
    color: var(--white);
    border: 0;
    outline: 0;
    background-color: transparent;
    cursor: pointer;
    padding-bottom: var(--spacing-2);
    border-bottom: 2px solid transparent;
    margin-bottom: 10px;

    &:focus {
      border: 0;
      box-shadow: none;
      border-bottom: 2px solid var(--primary-blue-light-2);
    }
  }

  .trip__info-date {
    display: inline-flex;
    gap: var(--spacing-3);
    align-items: center;

    .button__date {
      background: transparent;
    }

    .button__change-date {
      padding: var(--spacing-2);
      background-color: transparent;
      border: 1px solid var(--light-gray-4);
      color: var(--white);
      border-radius: 3px;

      &:hover {
        background-color: var(--white);
        color: var(--dark-gray-2);
        border-color: var(--light-gray-4);
      }
    }

    span {
      font-size: var(--large-text-size);
      line-height: var(--large-text-line-height);
      color: var(--light-gray-3);
    }
  }

  .calendar__container {
    min-width: 700px;
    width: calc(50vw - 100px);

    .rdrMonthsHorizontal {
      gap: var(--spacing-3);
    }
  }
`;

const TopNavigation = props => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    mainData,
    setMainData,
    handleRefresh,
    title,
    setTitle,
  } = props;

  const outSideRef = useRef();
  const token = getCookie('accessToken');
  const { itineraryId } = useParams();
  const navigate = useNavigate();
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDate = date => {
    setStartDate(formatDate(date[0].startDate));
    setEndDate(formatDate(date[0].endDate));
  };

  const handleCalendar = () => {
    setShowCalendar(prevState => !prevState);
  };

  useEffect(() => {
    const clickOutside = e => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (
        showCalendar &&
        outSideRef.current &&
        !outSideRef.current.contains(e.target)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [showCalendar]);

  const changeDateHandler = () => {
    if (
      window.confirm(
        '정말 날짜를 변경하십니까? 변경시 작성한 일정이 모두 초기화됩니다!',
      )
    )
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/plans/${itineraryId}`,
          {
            startDate,
            endDate,
          },
          {
            headers: {
              Authorization: token,
              withCredentials: true,
            },
          },
        )
        .then(res => {
          setMainData({
            ...mainData,
            startDate: startDate,
            endDate: endDate,
          });
          handleRefresh();
        })
        .then(res => handleCalendar());
  };
  const changeTitleHandler = () => {
    axios
      .patch(
        `${process.env.REACT_APP_API_URL}/plans/${itineraryId}`,
        {
          planTitle: title,
          startDate: formatDate(mainData.startDate),
          endDate: formatDate(mainData.endDate),
        },
        {
          headers: {
            Authorization: token,
            withCredentials: true,
          },
        },
      )
      .then(res => {
        setTitle(title);
        handleRefresh();
      });
  };

  const deletePlanHandler = itineraryId => {
    if (
      window.confirm(
        '정말 작성중인 여행 일정을 삭제하시겠습니까? 작성된 게시물이 있을 경우 함께 삭제됩니다.',
      )
    ) {
      if (mainData.boardId) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/board/${mainData.boardId}`,
            {
              headers: {
                Authorization: token,
              },
            },
          )
          .then(res => {
            axios
              .delete(`${process.env.REACT_APP_API_URL}/plans/${itineraryId}`, {
                headers: {
                  Authorization: token,
                },
              })
              .then(res => {
                console.log('deleted plan!!');
                navigate('/', { replace: true });
              })
              .catch(err => console.log(err));
          });
      } else {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/plans/${itineraryId}`, {
            headers: {
              Authorization: token,
            },
          })
          .then(res => {
            console.log('deleted plan!!');
            navigate('/', { replace: true });
          })
          .catch(err => console.log(err));
      }
    }
  };

  return (
    <TopContainer cityImage={mainData.city?.cityImage}>
      <div className="top__gradient-bg"></div>
      <Header>
        <div className="header__logo" onClick={() => navigate('/')}>
          website name
        </div>
        <div className={'button--container'}>
          <button
            className="button--primary"
            onClick={() => navigate(`/`, { replace: true })}
          >
            Save Trip
          </button>
          <button
            className="button--primary"
            onClick={() => deletePlanHandler(itineraryId)}
          >
            Delete Trip
          </button>
        </div>
      </Header>
      <TripInfo>
        <input
          onChange={e => setTitle(e.target.value)}
          value={title}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              e.target.blur();
              return changeTitleHandler();
            }
          }}
        />
        <div className="trip__info-date">
          <button className="button__date" onClick={handleCalendar}>
            <span>{formatDateKo(mainData.startDate)} -</span>
            <span> {formatDateKo(mainData.endDate)}</span>
          </button>
          <button
            className="button__change-date"
            onClick={changeDateHandler}
            disabled={showCalendar === false}
          >
            날짜 변경
          </button>
        </div>
        <div ref={outSideRef}>
          {showCalendar ? <Calendar handleDate={handleDate} /> : null}
        </div>
      </TripInfo>
    </TopContainer>
  );
};

export default TopNavigation;
