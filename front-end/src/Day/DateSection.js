import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import moment from "moment";
import { format } from "date-fns";

const DateSection = ({ today }) => {
  let history = useHistory();

  const nextDay = () => {
    let nextDay = new Date();
    nextDay.setDate(today.getDate() + 1);
    let nextDayString = format(nextDay, "y-MM-dd");
    history.push(`/date/${nextDayString}`);
  };
  const previousDay = () => {
    let nextDay = new Date();
    nextDay.setDate(today.getDate() - 1);
    let nextDayString = format(nextDay, "y-MM-dd");
    history.push(`/date/${nextDayString}`);
  };
  return (
    <Header>
      <DateDivSection>
        <Arrow onClick={(ev) => previousDay()}>{"‹"}</Arrow>
        <DateNumber onClick={(ev) => previousDay()}>
          {moment(today).subtract(1, "d").format("DD")}
        </DateNumber>
        <DateNumberMain>{format(today, "dd")}</DateNumberMain>
        <DateNumber onClick={(ev) => nextDay()}>
          {moment(today).add(1, "d").format("DD")}
        </DateNumber>
        <Arrow onClick={(ev) => nextDay()}>{"›"}</Arrow>
      </DateDivSection>
    </Header>
  );
};

const Header = styled.div`
  position: relative;
`;

const DateDivSection = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: white;
  padding: 10px;
`;
const Arrow = styled.button`
  color: #476a6f;
  font-size: 2rem;
  padding: 0 30px;
  background-color: white;
  border: none;
  outline: none;
  &:active {
    outline: none;
  }
`;
const DateNumber = styled.div`
  color: #519e8a;
  font-size: 1.5rem;
  font-weight: 300;
  padding: 0 20px;
  box-sizing: border-box;
  line-height: 4rem;
  background-color: white;
`;

const DateNumberMain = styled.div`
  color: #519e8a;
  font-size: 2rem;
  font-weight: 300;
  padding: 0 20px;
  box-sizing: border-box;
  line-height: 4rem;
  background-color: white;
`;

export default DateSection;
