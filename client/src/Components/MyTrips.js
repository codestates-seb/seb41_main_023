import styled from "styled-components";

const MyTripsContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 20px;

  .contents {
    display: flex;
    > div {
      margin: 20px;
    }
  }
`;

//axios.get
const MyTrips = () => {
  const dummyItineraryList = [
    {
      image: "https://picsum.photos/200",
      title: "Trip to Seoul",
      startDate: "Jan 31",
      endDate: "Feb 18",
      placedCount: "6",
      destination: "Seoul",
    },
    {
      image: "https://picsum.photos/200",
      title: "Trip to Seoul",
      startDate: "Jan 9",
      endDate: "Jan 18",
      placedCount: "6",
      destination: "Seoul",
    },
  ];

  return (
    <MyTripsContainer>
      <h2>My Trips</h2>
      <div className="contents">
        {dummyItineraryList.map((el) => (
          <div>
            <img alt="place_image" src={el.image} />
            <div>{el.title}</div>
            <div>
              {el.startDate} - {el.endDate}
            </div>
            <div>{el.placedCount} places</div>
            <div>{el.destination}</div>
          </div>
        ))}
      </div>
    </MyTripsContainer>
  );
};

export default MyTrips;
