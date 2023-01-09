import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyTripsContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 20px;

  .contents {
    display: flex;
    > div {
      margin: 20px;
      cursor: pointer;
    }
  }
`;

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

  //회원의 전체 게시글 조회
  // useEffect(() => {
  //   axios({
  //     url: `${process.env.REACT_APP_API_URL}/board/user/1`,
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
          <div>
            <img
              alt="place_image"
              src={el.image}
              onClick={() => navigate("/board/:boardId")}
            />
            <div>{el.title}</div>
            <div>{/* {el.startDate} - {el.endDate} */}</div>
            {/* <div>{el.profile_image}</div> */}
            <div>{el.displayName} </div>
            <div>{el.checkLikes}</div>
          </div>
        ))}
      </div>
    </MyTripsContainer>
  );
};

export default MyLogs;
