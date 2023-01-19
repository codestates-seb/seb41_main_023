import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadScript, GoogleMap } from "@react-google-maps/api";

import { getCookie } from "../Util/Cookies";

import SingleBoardMarker from "../Components/Board/SingleBoardMarker";
import BoardHeader from "../Components/Board/BoardHeader";

const WriteSingleBoard = () => {
  const navigate = useNavigate();
  const token = getCookie("accessToken");
  const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  const { planId } = useParams();

  const [mainData, setMainData] = useState({});
  const [days, setDays] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [placeNotes, setPlaceNotes] = useState([]);
  // const [boardId, setBoardId] = useState(null);
  const [libraries] = useState(["places"]);

  const mapContainerStyle = {
    width: "50%",
    minWidth: "400px",
    position: "absolute",
    height: "100%",
    zIndex: "60",
    top: "0",
    bottom: "0",
    right: "0",
  };

  const [geocode, setGeocode] = useState({
    lat: 0,
    lng: 0,
  });

  const [zoom, setZoom] = useState(13);

  // 여행 정보 요청
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/board/user/plan/${planId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setMainData(res.data);
        setTitle(res.data.planTitle);
        setDays(res.data.days);
        const startPlace = res.data.days[0].placeDetails[0];
        setGeocode({
          lat: startPlace.latitude,
          lng: startPlace.longitude,
        });
      });
  }, []);

  const handleZoom = (el) => {
    setZoom(el);
  };

  //게시물 등록
  const handleCreateLog = async (title, content) => {
    const data = {
      title,
      content,
    };
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}/board/plan/${planId}`,
      headers: {
        Authorization: token,
      },
      data: data,
    })
      .then((res) => navigate(`/board/${res.data.boardId}`))
      .then(() => {
        axios({
          method: "PATCH",
          url: `${process.env.REACT_APP_API_URL}/places/desc`,
          headers: {
            Authorization: token,
          },
          data: { placeDesc: placeNotes },
        }).then((res) => console.log(res));
      });
  };

  //장소별 note 변경
  const handleChangeNote = (e) => {
    let findIndex = placeNotes.findIndex(
      (comment) => Number(comment.placeId) === Number(e.target.name)
    );

    if (findIndex === -1) {
      setPlaceNotes([
        ...placeNotes,
        { placeId: Number(e.target.name), description: e.target.value },
      ]);
    } else {
      let changeNotes = [...placeNotes];
      changeNotes[findIndex].description = e.target.value;
      setPlaceNotes(changeNotes);
    }
  };

  // 장소별 note 삭제
  const handleDeleteNote = (e) => {
    let findIndex = placeNotes.findIndex(
      (comment) => Number(comment.placeId) === Number(e.target.name)
    );
    console.log(findIndex);

    let changeNotes = [...placeNotes];
    changeNotes[findIndex].description = "";
    setPlaceNotes(changeNotes);
  };

  // console.log(placeNotes);

  // 위도, 경도 변경
  const handleGeoCode = (lat, lng) => {
    setGeocode({ lat, lng });
  };

  return (
    <>
      {mainData.planTitle && (
        <BoardHeader
          mainData={mainData}
          mode="write"
          title={title}
          setTitle={setTitle}
          content={content}
          handleCreateLog={handleCreateLog}
        />
      )}
      <MemoBox>
        <h3>Travel experience</h3>
        <textarea
          placeholder="Select a travel experience"
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </MemoBox>
      <ItineraryBox>
        <h3>Itinerary</h3>
        {mainData &&
          days.map((day) => (
            <div key={day.index}>
              <div>{day.day}</div>
              {day.placeDetails.map((place) => (
                <div
                  key={place.index}
                  onClick={() => {
                    handleGeoCode(place.latitude, place.longitude);
                  }}
                  className="place"
                >
                  <div>{place.index}</div>
                  <div>{place.placeName}</div>
                  <div>{place.placeAddress}</div>
                  <form className="memo">
                    <input
                      id="memo"
                      type="text"
                      name={place.placeId}
                      placeholder="memo"
                      onChange={(e) => handleChangeNote(e)}
                    />
                    <input
                      type="reset"
                      value="reset"
                      className="delete_memo"
                    ></input>
                  </form>
                </div>
              ))}
            </div>
          ))}
      </ItineraryBox>
      <MapBox>
        <LoadScript googleMapsApiKey={API_KEY} libraries={libraries}>
          <GoogleMap
            zoom={zoom}
            center={geocode}
            mapContainerStyle={mapContainerStyle}
          >
            {days.map((day, idx) => (
              <div key={idx}>
                <div>{day.planDate}</div>
                <SingleBoardMarker handleZoom={handleZoom} day={day} />
              </div>
            ))}
          </GoogleMap>
        </LoadScript>
      </MapBox>
    </>
  );
};

export default WriteSingleBoard;

const MemoBox = styled.div`
  background-color: var(--light-gray-3);
`;
const ItineraryBox = styled.div`
  background-color: var(--light-gray-1);
  cursor: pointer;

  & .place {
    background-color: var(--light-gray-4);
    margin: 10px 0;
  }

  & .memo {
    background-color: var(--light-gray-2);
    :hover > .delete_memo {
      opacity: 1;
    }

    > input[type="reset"] {
      border: none;
      padding: 5px;
      background-color: var(--light-gray-5);
      cursor: pointer;
    }
  }

  & .delete_memo {
    opacity: 0;
  }
`;
const MapBox = styled.div``;
