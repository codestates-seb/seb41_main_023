import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import { getCookie } from '../../Util/Cookies';
import { formatDateKo } from '../../Util/dayUtil';

const Explore = props => {
  const [exploreList, setExploreList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);

  const token = getCookie('accessToken');
  const navigate = useNavigate();

  const observerTargetEl = useRef(null);
  const page = useRef(2);

  // 무한 스크롤
  const fetchMoreExplores = useCallback(async () => {
    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_API_URL}/board?page=${page.current}&size=5&tab=boardId`,
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .then(res => {
        setTimeout(() => {
          setExploreList(prevState => [...prevState, ...res.data.data]);
          setLoading(false);
        }, 1500);
        setHasNextPage(res.data.data.length === 5);
        if (res.data.data.length) page.current += 1;
      })
      .catch(err => console.log(err));
  }, [page.current]);

  // 게시판 접근시
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/board?page=1&size=5&tab=boardId`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        setExploreList(res.data.data);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    // 검색
    if (props.searches) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/board?page=1&size=100&tab=boardId&city=${props.destination}`,
          {
            headers: {
              Authorization: token,
            },
          },
        )
        .then(res => {
          setExploreList(res.data.data);
        })
        .catch(err => console.log(err));
    } else {
      // 게시판
      if (window.location.pathname === '/board') {
        if (!observerTargetEl.current || !hasNextPage) return;
        const options = {
          root: null,
          rootMargin: '0px 0px -30px 0px',
          threshold: 1,
        };

        const io = new IntersectionObserver((entries, observer) => {
          if (entries[0].isIntersecting) {
            fetchMoreExplores();
          }
        }, options);
        io.observe(observerTargetEl.current);

        return () => {
          io.disconnect();
        };
      } else {
        // 메인
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/board?page=1&size=10&tab=boardId`,
            {
              headers: {
                Authorization: token,
              },
            },
          )
          .then(res => {
            setExploreList(res.data.data);
          })
          .catch(err => console.log(err));
      }
    }
  }, [fetchMoreExplores, hasNextPage, token, props.destination]);

  const handleNavigate = explore => {
    navigate(`/board/${explore.boardId}`);
  };

  return (
    <ExploreContainer>
      <div className="contents">
        {exploreList.length !== 0 ? (
          exploreList.map((explore, index) => (
            <div
              className="my-logs__card"
              key={index}
              onClick={() => handleNavigate(explore)}
            >
              <img
                className="meta__travel-image"
                alt="place_image"
                src={explore.cityImage}
              />
              <div className="meta_title">{explore.title}</div>
              <div className="meta_content">
                {formatDateKo(explore.travelPeriod.split('-')[0])} -{' '}
                {formatDateKo(explore.travelPeriod.split('-')[1])}
              </div>
              <div className="meta_profile">
                <img
                  className="profile__image"
                  alt="profile_image"
                  src={explore.profileImage}
                />
                <span>{explore.displayName} </span>
              </div>
              {token && (
                <div
                  className={
                    explore.checkLikes ? 'meta_likes likes' : 'meta_likes'
                  }
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
          ))
        ) : (
          <div className={'search__error'}>
            검색어와 일치하는 게시글이 없습니다
          </div>
        )}
        {loading ? <div className="loader"></div> : <div></div>}
        <div ref={observerTargetEl} className="target">
          t
        </div>
      </div>
    </ExploreContainer>
  );
};
export default Explore;

const ExploreContainer = styled.div`
  position: relative;
  margin-bottom: 50px;

  .target {
    height: 150px;
    margin-top: 225px;
    color: white;
  }

  .loader {
    width: 64px;
    height: 64px;
    border: 5px solid lightgray;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    margin: 0 auto;
    margin-top: 100px;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  h2 {
    margin-bottom: var(--spacing-4);
    font-size: var(--large-heading-font-size);
    line-height: var(--large-heading-line-height);
    font-weight: 600;
    color: var(--black);
  }

  .contents {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-4);

    .search__error {
      font-size: var(--large-text-size);
      line-height: var(--large-text-line-height);
    }

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

        /* &:hover {
          svg path {
            color: rgba(202, 53, 53, 0.25);
            stroke-width: 1.5;
            stroke: var(--red-light-1);
          }
        } */

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
