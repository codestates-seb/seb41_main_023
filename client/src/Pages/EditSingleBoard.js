import axios from "axios";
import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";

import {getCookie} from "../Util/Cookies";

import SingleBoardMarker from "../Components/Board/SingleBoardMarker";
import BoardHeader from "../Components/Board/BoardHeader";

const EditSingleBoard = () => {
    const navigate = useNavigate();
    const token = getCookie("accessToken");
    const API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const {boardId} = useParams();

    const [mainData, setMainData] = useState({});
    const [days, setDays] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [placeNotes, setPlaceNotes] = useState([]);
    const [libraries] = useState(["places"]);
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries: libraries
    });

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

    // 게시글 조회 요청
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/board/${boardId}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                setMainData(res.data);
                setTitle(res.data.title);
                setContent(res.data.content);
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

    //게시물 수정 요청
    const handleEditLog = async (title, content) => {
        const data = {
            title,
            content,
        };

        await axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_API_URL}/board/${boardId}`,
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
                    data: {placeDesc: placeNotes},
                }).then((res) => console.log(res));
            });
    };

  //게시물 삭제 요청
  const handleDeleteLog = async () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/board/${boardId}`,
        headers: {
          Authorization: token,
        },
      }).then((res) => navigate(`/board/plan`));
    }
  };

    //장소별 note 변경
    const handleChangeNote = (e) => {
        let findIndex = placeNotes.findIndex(
            (placeNote) => Number(placeNote.placeId) === Number(e.target.name)
        );

        if (findIndex === -1) {
            setPlaceNotes([
                ...placeNotes,
                {placeId: Number(e.target.name), description: e.target.value},
            ]);
        } else {
            let changeNotes = [...placeNotes];
            changeNotes[findIndex].description = e.target.value;
            setPlaceNotes(changeNotes);
        }
    };

    // 위도, 경도 변경
    const handleGeoCode = (lat, lng) => {
        setGeocode({lat, lng});
    };

    const memoRef = useRef({});

  //입력값 초기화
  const handelClear = (id) => {
    const placeId = Object.keys(memoRef.current).filter(
      (key) => Number(key) === id
    );
    memoRef.current[placeId].value = "";
  };
  return (
    <>
      {mainData && (
        <BoardHeader
          mainData={mainData}
          mode="edit"
          title={title}
          setTitle={setTitle}
          content={content}
          handleEditLog={handleEditLog}
          handleDeleteLog={handleDeleteLog}
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
                  key={place.placeId}
                  onClick={() => {
                    handleGeoCode(place.latitude, place.longitude);
                  }}
                >
                  <div>{place.index}</div>
                  <div>{place.placeName}</div>
                  <div>{place.placeAddress}</div>
                  <div className="memo">
                    <textarea
                      name={place.placeId}
                      onChange={(e) => handleChangeNote(e)}
                      ref={(el) => (memoRef.current[place.placeId] = el)}
                    >
                      {place.description}
                    </textarea>
                    <input
                      type="reset"
                      value="reset"
                      className="delete_memo"
                      onClick={() => handelClear(place.placeId)}
                    ></input>
                  </div>
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

{
}

export default EditSingleBoard;

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
