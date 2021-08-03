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
          style={{ backgroundColor: "#fff", color: "#40776a"}}
        >
          month
        </TabItem>
        <TabItem
          onClick={() => history.push(`/week/${format(new Date(), "y-MM-dd")}`)}
          style={{ backgroundColor: "#fff", color: "#40776a"}}
        >
          week
        </TabItem>
        <TabItem
          style={{ backgroundColor: "#fff", color: "#40776a"}}
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
  height: max-content;
  background-color: #DFECE8;
`;

const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
`;
const TabItem = styled.div`
  flex-grow: 1;
  text-align: center;
  background-color: #40776A;
  border: 1px solid #40776A;
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
  width: 100%;
`;

export default Homepage;
