import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MapSection } from '../Components/Board/SingleBoard/MapSection';
import BoardSection from '../Components/Board/SingleBoard/BoardSection';
import TopSection from '../Components/Board/SingleBoard/TopSection';
import CommentSection from '../Components/Board/SingleBoard/CommentSection';

const SingleBoard = () => {
  const { boardId } = useParams();
  const [refresh, setRefresh] = useState(1);
  const [boardData, setBoardData] = useState({
    boardId: boardId,
    title: '',
    content: '',
    likes: 0,
    views: 0,
    createdAt: '',
    memberId: '',
    displayName: '',
    profileImage: '',
    checkLikes: false,
    planId: boardId,
    cityName: '',
    days: [],
    cityImage: '',
  });
  const [geocode, setGeocode] = useState({
    lat: 37.555969,
    lng: 126.972336,
  });
  const handleRefresh = () => {
    setRefresh((prevState) => prevState * -1);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/board/${boardId}`)
      .then((res) => {
        setBoardData(res.data);
        const startCode = res.data.days[0].placeDetails[0];
        setGeocode({
          lat: startCode.latitude,
          lng: startCode.longitude,
        });
      })
      .catch((err) => console.log(err));
  }, [boardId, refresh]);

  const handleGeoCode = (lat, lng) => {
    setGeocode({ lat, lng });
  };

  return (
    <Fragment>
      {boardData ? (
        <BoardWrapper>
          <TopSection boardData={boardData} />
          {/* <MapSection boardData={boardData} geocode={geocode} handleGeoCode={handleGeoCode} />
          <BoardSection boardData={boardData} handleGeoCode={handleGeoCode} />
          <CommentSection boardData={boardData} /> */}
        </BoardWrapper>
      ) : null}
    </Fragment>
  );
};

export default SingleBoard;

const BoardWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
