import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components";
import NoEventToday from "./NoEventToday";
import NewEventDialog from "../Components/NewEventDialog";

import DateSection from "./DateSection";
import SingleEvent from "./SingleEvent";

const DayView = () => {
  const [dayEvents, setDayEvents] = useState([]);
  const [status, setStatus] = useState("loading");
  const history = useHistory();
  const params = useParams();
  const today = new Date(
    params.date.slice(0, 4),
    params.date.slice(5, 7) - 1,
    params.date.slice(8, 10)
  );

  useEffect(() => {
    setStatus("loading");
    fetch(`/events/date/${params.date}`)
      .then((res) => res.json())
      .then((res) => {
        setDayEvents(res.data);
        setStatus("idle");
      })
      .catch((error) => console.log("error!", error));
  }, [params]);

  const getDayEventsAfterDeleteAdd = async () => {
    setStatus("loading");
    await fetch(`/events/date/${params.date}`)
      .then((res) => res.json())
      .then((res) => {
        setDayEvents(res.data);
        setStatus("idle");
      })
      .catch((error) => console.log("error!", error));
  };

  return (
    <Wrapper>
      <NewEventDialog refreshEvents={getDayEventsAfterDeleteAdd} />
      <Tabs>
        <TabItem
          onClick={() => history.push("/")}
          style={{ backgroundColor: "#fff", color: "#40776a" }}
        >
          dashboard
        </TabItem>
        <TabItem
          onClick={() => history.push("/calendar-month")}
          style={{ backgroundColor: "#fff", color: "#40776a" }}
        >
          month
        </TabItem>
        <TabItem
          style={{ backgroundColor: "#fff", color: "#40776a" }}
          onClick={() => history.push(`/week/${params.date}`)}
        >
          week
        </TabItem>
        <TabItem>Day</TabItem>
      </Tabs>
      <DateSection today={today} />

      {status === "loading" ? null : (
        <ContentSection>
          {dayEvents.length === 0 ? (
            <NoEventToday />
          ) : (
            <>
              <SingleEvent
                dayEvents={dayEvents}
                refreshEvents={getDayEventsAfterDeleteAdd}
              />
            </>
          )}
        </ContentSection>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 100vh;
  margin: 20px auto;
  width: 80%;
  background-color: #DFECE8;
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
  background-color: #40776A;
  border: 1px solid #40776A;
  color: white;
  text-transform: uppercase;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: none;
  width: 100%;
  padding: 6px 0;
  font-size: 1rem;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;
`;

const ContentSection = styled.div`
  top: 200px;
`;
export default DayView;
