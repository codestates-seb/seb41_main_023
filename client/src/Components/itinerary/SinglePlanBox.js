import axios from "axios";
import {getCookie} from "../../Util/Cookies";
import {Fragment, useState} from "react";
import styled from "styled-components";

const SectionWrapper = styled.div`
  display: flex;
  flex-flow: row;
`;

const SectionContent = styled.div`
  width: 95%;
  height: 100px;
  border: 1px solid black;
  border-radius: 2rem;
  margin: 20px 0;
  padding: 15px 25px;
  display: flex;
  flex-direction: row;
`;

const PlaceInfoBox = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;

  p {
    margin: 10px 0;
  }
`;

const PlaceInfoContainer = styled.div`
  width: 100%;
  height: 80%;
`;

const PlaceAddingButtons = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: flex-start;
  align-items: end;

  svg {
    margin-right: 3px;
    margin-bottom: -2px;
  }

  button {
    border-style: none;
    background-color: white;
    margin: 0 10px 0 0;
    cursor: pointer;
  }
`;

const PlanDeleteContainer = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  width: 5%;

  button {
    margin-left: 10px;
    cursor: pointer;
    border-style: none;
    background-color: white;

    svg {
      color: gray;
    }

    &:hover {
      svg {
        display: block;
        color: black;
      }
    }
  }
`;

const PlaceImageBox = styled.div`
  width: 30%;
  height: 100%;

  img {
    border-radius: 1rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const clockSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
         viewBox="0 0 24 24">
        <path fill="currentColor"
              d="M14.55 16.55L11 13V8h2v4.175l2.95 2.95ZM11 6V4h2v2Zm7 7v-2h2v2Zm-7 7v-2h2v2Zm-7-7v-2h2v2Zm8 9q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4Q8.65 4 6.325 6.325Q4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z"/>
    </svg>
);

const moneySvg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet"
         viewBox="0 0 256 256">
        <path fill="currentColor"
              d="M204 168a52 52 0 0 1-52 52h-12v12a12 12 0 0 1-24 0v-12h-12a52 52 0 0 1-52-52a12 12 0 0 1 24 0a28.1 28.1 0 0 0 28 28h48a28 28 0 0 0 0-56h-44a52 52 0 0 1 0-104h8V24a12 12 0 0 1 24 0v12h4a52 52 0 0 1 52 52a12 12 0 0 1-24 0a28.1 28.1 0 0 0-28-28h-36a28 28 0 0 0 0 56h44a52 52 0 0 1 52 52Z"/>
    </svg>
);

const deleteSvg = (
    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet"
         viewBox="0 0 256 256">
        <path fill="currentColor"
              d="M216 48h-36V36a28.1 28.1 0 0 0-28-28h-48a28.1 28.1 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20.1 20.1 0 0 0 20 20h128a20.1 20.1 0 0 0 20-20V72h4a12 12 0 0 0 0-24ZM100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Zm48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Z"/>
    </svg>
)


const SinglePlanBox = (props) => {
    const {
        setAddExpenseModal,
        singleData,
    } = props;

    const [delButtonIsShow, setDelButtonIsShow] = useState(false);

    const handleExpenseModal = () => {
        setAddExpenseModal(true);
    }

    const onMouseHandler = () => {
        setDelButtonIsShow(prevState => !prevState);
    }

    const handleDeletePlan = (selectedPlaceId) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            axios.delete(`${process.env.REACT_APP_API_URL}/places/${selectedPlaceId}`, {
                headers: {
                    Authorization: getCookie('accessToken')
                }
            })
                .then(res => {
                    console.log('삭제완료!')
                })
                .then(res => window.location.reload())
                .catch(err => console.log(err));
        }
    }

    return (
        <Fragment>
            {singleData &&
                singleData.places.map((data) => (
                    <SectionWrapper
                        onMouseEnter={onMouseHandler}
                        onMouseLeave={onMouseHandler}
                        key={data.placeId}
                    >
                        <SectionContent>
                            <PlaceInfoBox>
                                <PlaceInfoContainer>
                                    <h3>{data.placeName}</h3>
                                    <p>{data.placeAddress}</p>
                                </PlaceInfoContainer>
                                <PlaceAddingButtons>
                                    <button>
                                        {clockSvg}
                                        Add time
                                    </button>
                                    <button
                                        onClick={handleExpenseModal}
                                    >
                                        {moneySvg}
                                        Add cost
                                    </button>
                                </PlaceAddingButtons>
                            </PlaceInfoBox>
                            {/*<PlaceImageBox>*/}
                            {/*    <img src={data.photo} alt={`${data.name}의 사진`}/>*/}
                            {/*</PlaceImageBox>*/}
                        </SectionContent>
                        <PlanDeleteContainer>
                            {delButtonIsShow ? (
                            <button
                                onClick={() => handleDeletePlan(data.placeId)}
                            >
                                {deleteSvg}
                            </button>
                            ) : null}
                        </PlanDeleteContainer>
                    </SectionWrapper>
                ))
            }
        </Fragment>
    )
};

export default SinglePlanBox;