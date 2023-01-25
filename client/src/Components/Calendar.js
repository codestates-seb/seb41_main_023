import styled from "styled-components";
import "react-date-range/dist/styles.css"; // 메인 css 파일
import "react-date-range/dist/theme/default.css"; // 테마 CSS 파일
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import dayjs from "dayjs";

const CalendarContainer = styled.div`
  position: relative;
  max-width: 848px;
  z-index: 999;

  & .calendar {
    display: flex;
    justify-content: center;
    position: absolute;
    margin-top: var(--spacing-2);
    padding: var(--spacing-3);
    top: 100%;
    width: 100%;
    background-color: white;
    border: 1px solid var(--light-gray-4);
    border-radius: 3px;
    box-shadow: 0px 0px 1px rgba(9, 30, 66, 0.31),
      0px 8px 12px rgba(9, 30, 66, 0.15);

    > .rdrCalendarWrapper {
      width: 100%;
    }

    .rdrMonthAndYearWrapper {
      margin-bottom: 16px;
      padding: 0;
      height: auto;
    }

    .rdrNextPrevButton {
      margin: 0 var(--spacing-2);
      background-color: transparent;

      &:hover {
        background-color: var(--light-gray-2);
      }
    }

    .rdrPprevButton {
      > i {
        border-color: transparent var(--light) transparent transparent;
      }

      &:hover {
        > i {
          border-color: transparent var(--dark-gray-1) transparent transparent;
        }
      }
    }

    .rdrNextButton {
      > i {
        border-color: transparent transparent transparent var(--light);
      }

      &:hover {
        > i {
          border-color: transparent transparent transparent var(--dark-gray-1);
        }
      }
    }

    .rdrMonthPicker,
    .rdrYearPicker {
      > select {
        color: var(--dark-gray-3);

        &:hover {
          background-color: var(--light-gray-2);
        }
      }
    }

    .rdrMonthsHorizontal {
      gap: var(--spacing-4);
      justify-content: center;
    }

    .rdrMonthName {
      padding: 0;
      color: var(--dark-gray-1);
      text-align: center;
      padding-bottom: var(--spacing-3);
    }

    .rdrWeekDays {
      > span {
        color: var(--light);
        font-weight: 600;
        text-transform: uppercase;
      }
    }

    .rdrDay {
      & span {
        color: var(--dark-gray-2);
      }
    }

    .rdrDayPassive {
      & span {
        color: var(--light-gray-5);
      }
    }

    .rdrDayDisabled {
      background-color: var(--light-gray-1);

      & span {
        color: var(--light-gray-4);
      }
    }

    .rdrDayStartPreview,
    .rdrDayEndPreview,
    .rdrDayInPreview {
      background-color: rgba(156, 199, 255, 0.2);
      border-color: var(--primary-blue-light-1);
    }

    .rdrInRange,
    .rdrStartEdge,
    .rdrEndEdge {
      background-color: var(--primary-blue-bright);
    }

    .rdrDayToday .rdrDayNumber span::after {
      background: var(--primary-blue-bright);
    }
  }

  .rdrDateDisplayWrapper {
    display: none;
  }
`;

const Calendar = ({ handleDate, login, calenderRef }) => {
  const day = new Date();
  const tomorrow = dayjs(day).add(1, "d").toDate();

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
    <CalendarContainer
      ref={calenderRef}
      className={`calendar__container ${login ? "login" : null}`}
    >
      <div className="calendar">
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setDate([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={date}
          months={2}
          direction="horizontal"
          dateDisplayFormat={"LLLL yyyy"} // 날짜 포맷값
        />
      </div>
    </CalendarContainer>
  );
};

export default Calendar;
