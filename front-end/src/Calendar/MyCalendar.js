import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";

const MyCalendar = ({ updateCurrentMonth }) => {
  /**Calendar state and functions */
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  /** OnClick function to go to daily view*/
  let history = useHistory();

  const handleClickDate = (value) => {
    let formattedDate = format(value, "y-MM-dd");
    history.push(`/date/${formattedDate}`);
  };

  const tileContent = ({ date, view }) =>
    view === "month" && date.getDay() === 2 ? <p></p> : null;

  return (
    <Wrapper>
      <Calendar
        tileContent={tileContent}
        onChange={onChange}
        defaultView="month"
        value={value}
        prev2Label={null}
        next2Label={null}
        onClickDay={(value, event) => handleClickDate(value, event)}
        onActiveStartDateChange={({ activeStartDate, value, view }) => {
          updateCurrentMonth(activeStartDate.getMonth());
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .react-calendar {
    max-width: 100%;
    background: white;
    line-height: 2em;
    text-align: center;
    border: 1px solid #575aa6;
  }
  .react-calendar button {
    border: 1px dashed #575aa6;
    font-size: 1rem;
  }

  //Mon Tues
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: 400;
    font-size: 1em;
    background-color: #787ab8;
  }
  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
    font-size: 0.8rem;
    color: white;
    text-transform: uppercase;
  }

  .react-calendar__tile {
    max-width: 10vw;
    height: 8vw;
    background-color: white;
  }
  .react-calendar__navigation {
    padding: 10px;
  }

  //Top (month and R/L buttons)
  .react-calendar__navigation button {
    background: white;
    font-size: 1.3rem;
    padding: 0;
    margin: 0 10px;
    border: none;
    color: #575aa6;
  }
  .react-calendar__navigation__label__labelText  {
    color: #575aa6;
    font-size: 1rem;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
  }
  
  .react-calendar__month-view__days__day {
    text-align: left;
    padding: 0 10px;
  }
  .react-calendar__month-view__days__day abbr {
    font-size: 0.8rem;
    vertical-align: top;
    
  }
  .react-calendar__tile--active {
    background-color: #787ab8;
  }
`;

export default MyCalendar;
