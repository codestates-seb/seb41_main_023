import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const TopSection = (props) => {
    const navigate = useNavigate();
    const {boardData} = props;

    const {
        cityImage,
        checkLikes,
        cityName,
        createdAt,
        displayName,
        profileImage,
        title,
        views
    } = boardData;

    return (
        <BoardTopNav cityImage={cityImage}>
            <HeaderSection>
                <div
                    className={'logo'}
                    onClick={() => navigate('/')}
                >
                    <p>Logo</p>
                </div>
                <div className={'liked'}>{checkLikes ? "❤️" : "♡"}</div>
            </HeaderSection>
            <TitleSection>
                <div className={'city_name'}>{cityName}</div>
                <div className={'title'}>{title}</div>
                <div className={'writer_container'}>
                    <div className={'writer_image'}>
                        <img src={profileImage} alt={`${displayName}의 프로필 사진`}/>
                    </div>
                    <div className={'writer_info'}>
                        <p className={'writer_name'}>{displayName}</p>
                        <p className={'written_date_views'}>{createdAt} / {views} views</p>
                    </div>
                </div>
            </TitleSection>
        </BoardTopNav>
    )
};

export default TopSection;

const BoardTopNav = styled.div`
  width: 50vw;
  height: 300px;
  border: 1px solid lightgray;
  background-image: url(${props => props.cityImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 30px;
`;

const HeaderSection = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .logo {
    width: 100px;
    height: 30px;
    background-color: gray;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      color: black;
    }
  }
`;

const TitleSection = styled.div`
  width: auto;
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .city_name {
    width: 80px;
    height: 20px;
    border-radius: 1rem;
    background-color: gray;
    color: black;
    text-align: center;
  }

  .title {
    font-size: 25px;
    color: white;
  }

  .writer_container {
    display: flex;
    flex-direction: row;

    .writer_image {
      position: relative;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;