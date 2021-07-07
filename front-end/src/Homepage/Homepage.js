import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import Dashboard from "../Components/Dashboard";

const Homepage = () => {
  const history = useHistory();

  return (
    <Wrapper>
      <Tabs>
        <TabItem onClick={() => history.push("/")}>dashboard</TabItem>
        <TabItem
          onClick={() => history.push("/calendar-month")}
          style={{ backgroundColor: "#787ab8" }}
        >
          month
        </TabItem>
        <TabItem
          onClick={() => history.push(`/week/${format(new Date(), "y-MM-dd")}`)}
          style={{ backgroundColor: "#787ab8" }}
        >
          week
        </TabItem>
        <TabItem
          style={{ backgroundColor: "#787ab8" }}
          onClick={() => history.push(`/date/${format(new Date(), "y-MM-dd")}`)}
        >
          Day
        </TabItem>
      </Tabs>
      <Dashboard />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0;
  width: 80vw;
  margin: 20px auto;
  background-color: #eeeff6;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
  margin-right: 3px;
`;
const TabItem = styled.div`
  flex-grow: 1;
  text-align: center;
  background-color: #575aa6;
  border: 1px solid #575aa6;
  color: white;
  text-transform: uppercase;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: none;
  padding: 6px 0;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  &:hover {
    cursor: pointer;
  }
`;

export default Homepage;
