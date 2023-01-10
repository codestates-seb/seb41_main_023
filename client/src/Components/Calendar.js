import moment from "moment";
import styled from "styled-components";
import "react-date-range/dist/styles.css"; // 메인 css 파일
import "react-date-range/dist/theme/default.css"; // 테마 CSS 파일
import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: row;

  position: absolute;
  top: 55%;
  left: 15%;

  &.login {
    position: absolute;
    top: 110%;
  }
`;

const Calendar = ({ handleDate, login }) => {
  const tomorrow = moment().add(1, "d").toDate();

  const [date, setDate] = useState([
    {
      startDate: tomorrow,
      endDate: tomorrow,
      key: "selection",
    },
  ]);

  useEffect(() => {
    handleDate(date);
  }, [date[0].startDate, date[0].endDate]);

  return (
    <>
      <CalendarContainer className={login ? "login" : null}>
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          months={2}
          direction="horizontal"
          minDate={addDays(date[0].startDate, -30)}
          maxDate={addDays(date[0].startDate, 30)}
          dateDisplayFormat={"LLLL yyyy"} // 날짜 포맷값
        />
      </CalendarContainer>
    </>
  );
};

export default Calendar;
