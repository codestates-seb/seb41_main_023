import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//axios.get
const MyLogs = () => {
  const dummy = [
    {
      image: "https://picsum.photos/200",
      boardId: 3,
      title: "title",
      likes: 1,
      views: 0,
      displayName: "wpdnd",
      checkLikes: true,
    },
    {
      image: "https://picsum.photos/200",
      boardId: 4,
      title: "title",
      likes: 1,
      views: 0,
      displayName: "wpdnd",
      checkLikes: false,
    },
  ];

  const navigate = useNavigate();
  const [logList, setLogList] = useState(dummy);

  const [token, setToken] = useState();
  const [memberId, setMemberId] = useState();

  //토큰 설정
  // useEffect(() => {
  //   if (cookies.accessToken) {
  //     setToken(cookies.accessToken.token);
  //   }
  // }, []);

  //memberId 설정

  //회원의 전체 게시글 조회
  // useEffect(() => {
  //   axios({
  //     url: `${process.env.REACT_APP_API_URL}/board/user/${memberId}`,
  //     method: "GET",
  //     headers: {
  //        Authorization: token,
  //       withCredentials: true,
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response.data);
  //        setLogList(response.data)
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <MyTripsContainer>
      <h2>My Logs</h2>
      <div className="contents">
        {logList.map((el) => (
          <div key={el.boardId}>
            <img
              alt="place_image"
              src={el.image}
              onClick={() => navigate("/board/:boardId")}
            />
            <div className="meta_title">{el.title}</div>
            <div className="meta_content">
              {/* {el.startDate} - {el.endDate} */}
            </div>
            <div className="meta_profile">
              {/* <div>{el.profile_image}</div> */}
              <div>{el.displayName} </div>
            </div>
            <div className={el.checkLikes ? "meta_likes likes" : "meta_likes"}>
              ♡
            </div>
          </div>
        ))}
      </div>
    </MyTripsContainer>
  );
};

export default MyLogs;

const MyTripsContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 20px;

  .contents {
    display: flex;
    > div {
      margin: 20px 17px 10px 0;
      cursor: pointer;
      position: relative;

      > img {
        border-radius: 7px;
      }

      > .meta_title {
        margin: 5px;
        font-size: 15px;
      }

      > .meta_content {
        margin: 5px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.5);
      }

      > .meta_profile {
        font-size: 15px;
      }

      > .meta_likes {
        position: absolute;
        top: 3%;
        left: 85%;
        color: black;
        font-size: 20px;
      }

      > .likes {
        color: red;
      }
    }
  }
`;
