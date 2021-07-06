import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import NewEventDialog from "../Components/NewEventDialog";
import Joke from "./Joke";
import Dashboard from "../Components/Dashboard";

const Homepage = () => {
  const today = new Date();
  const history = useHistory();

  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    fetch(`/events/date/${format(today, "yyyy-MM-dd")}`)
      .then((res) => res.json())
      .then((res) => {
        setDayEvents(res.data);
        console.log("Today's events: ", res.data);
      })
      .catch((error) => console.log("error!", error));
  }, []);

  return (
    <Wrapper>
      <Events>
        <SectionTitle>Preview of your day</SectionTitle>
        {dayEvents.length === 0 ? (
          <NothingPlanned>Nothing planned for today. Lucky you!</NothingPlanned>
        ) : (
          dayEvents.map((ev) => {
            console.log(ev)
            if (ev.start.time.allday===true) {
              return (
                <EventLine>
                  <EventHour>All Day!</EventHour>
                  <EventTitle>{ev.title}</EventTitle>
                </EventLine>
              );
            } else {
              return (
                <EventLine>
                  <EventHour>
                    {parseInt(ev.start.time.hours)}:{ev.start.time.minutes}{" "}
                    {ev.start.time.ap.toLowerCase()}
                  </EventHour>
                  <EventTitle>{ev.title}</EventTitle>
                </EventLine>
              );
            }
          })
        )}
      </Events>
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
      <Joke />
      <NewEventDialog />
      <Dashboard />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0;
  width: 80vw;
  margin: 20px auto;
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

const SectionTitle = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px 0 10px 0;
  padding-bottom: 6px;
  font-weight: 600;
  font-family: "Varela Round", sans-serif;
`;
const NothingPlanned = styled.div`
  border-radius: 5px;
  border: 1px dashed rgba(0, 0, 0, 0.3);
  padding: 15px;
  font-size: 1.2rem;
  font-weight: 300;
  text-align: center;
`;
const Events = styled.div`
  margin: 10px;
`;
const EventLine = styled.div`
  display: flex;
  margin-left: 15vw;
  margin-bottom: 10px;
  align-items: center;
`;
const EventHour = styled.div`
  color: #ffafbd;
  margin-right: 10px;
  font-weight: 500;
  font-size: 1rem;
`;
const EventTitle = styled.div`
  font-size: 1rem;
  font-family: "Varela Round", sans-serif;
`;

export default Homepage;
