import styled from "styled-components";

const TripListContainer = styled.div`
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

const TripList = () => {
  const dummyItineraryList = [
    {
      image: "image",
      title: "Trip to Seoul",
      startDate: "Jan 31",
      endDate: "Feb 18",
      placedCount: "6",
      destination: "Seoul",
    },
    {
      image: "image",
      title: "Trip to Seoul",
      startDate: "Jan 9",
      endDate: "Jan 18",
      placedCount: "6",
      destination: "Seoul",
    },
  ];
  return (
    <TripListContainer>
      <h2>My Trips</h2>
      <div className="contents">
        {dummyItineraryList.map((el) => (
          <div>
            <div>{el.image}</div>
            <div>{el.title}</div>
            <div>
              {el.startDate} - {el.endDate}
            </div>
            <div>{el.placedCount} places</div>
            <div>{el.destination}</div>
          </div>
        ))}
      </div>
    </TripListContainer>
  );
};

export default TripList;
