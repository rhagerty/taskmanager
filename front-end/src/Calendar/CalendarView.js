import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { COLORS, dateColors } from "../Constants";
import MyCalendar from "./MyCalendar";
import NewEventDialog from "../Components/NewEventDialog";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import noEventToday from "./img.png";

const CalendarView = () => {
  const history = useHistory();
  const [status, setStatus] = useState("loading");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [MonthEvents, setMonthEvents] = useState([]);

  // Handle function to pass to MyCalendar
  const updateCurrentMonth = (month) => setCurrentMonth(month);

  const currentUser = localStorage.getItem("username");

  useEffect(() => {
    setStatus("loading");
    fetch(`/events/month/${currentMonth}`)
      .then((res) => res.json())
      .then((res) => {
        setMonthEvents(res.data);
        setStatus("idle");
      })
      .catch((error) => console.log("error!", error));
  }, [currentMonth]);

  let colorIndex = -1;

  const getEventsAfterCreate = async () => {
    setStatus("loading");

    await fetch(`/events/month/${currentMonth}`)
      .then((res) => res.json())
      .then((res) => {
        setMonthEvents(res.data);
        setStatus("idle");
      })
      .catch((error) => console.log("error!", error));
  };

  return (
    <Wrapper>
      <NewEventDialog
        refreshEvents={getEventsAfterCreate}
        currentUser={currentUser}
      />

      <Tabs>
        <TabItem
          onClick={() => history.push("/")}
          style={{ backgroundColor: "#787ab8" }}
        >
          dashboard
        </TabItem>
        <TabItem onClick={() => history.push("/calendar-month")}>month</TabItem>
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
      <MyCalendar updateCurrentMonth={updateCurrentMonth} />

      {status === "loading" ? null : (
        <>
          {MonthEvents.length === 0 ? (
            <NoEventsSection>
              <p>You have nothing planned!</p>
              <p>Tap " + " to add a task.</p>
              <AddEventImg src={noEventToday} alt="Add fun activities" />
            </NoEventsSection>
          ) : null}
          <EventsSection>
            {MonthEvents.map((ev) => (
              <EventBox
                onClick={() =>
                  history.push(`/date/${format(new Date(ev.date), "y-MM-dd")}`)
                }
              >
                <DateBox style={{ backgroundColor: dateColors[++colorIndex] }}>
                  <div className="dayName">
                    {format(new Date(ev.date), "EEE.")}
                  </div>
                  <div className="dayNum">{format(new Date(ev.date), "d")}</div>
                </DateBox>
                <DayEventsBox>
                  {ev.events.map((meeting) => (
                    <div>
                      <EventTitle style={{ color: dateColors[colorIndex] }}>
                        {"‣ "}
                        {meeting.title}
                      </EventTitle>
                    </div>
                  ))}
                </DayEventsBox>
              </EventBox>
            ))}
          </EventsSection>
        </>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: 100vh;
  margin: 20px auto;
  width: 80%;
  background-color: #eeeff6;
`;
const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2px;
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
`;
const NoEventsSection = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const AddEventImg = styled.img`
  max-width: 90vw;
`;

const EventsSection = styled.div``;
const slideUpAnimation = keyframes`
  from {
  margin-top: 100%;
  opacity: 0;
}
to {
  margin-top: 0%;
  opacity:0.4;
}
`;
const EventBox = styled.div`
  display: flex;
  border: none;
  animation: ${slideUpAnimation} 0.3s;
`;
const DateBox = styled.div`
  background-color: blue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  min-width: 100px;
  min-height: 100px;

  .dayName {
    color: ${COLORS.text2};
    font-size: 1rem;
    line-height: 1rem;
  }
  .dayNum {
    color: ${COLORS.text2};
  }
`;

const DayEventsBox = styled.div`
  background-color: ${COLORS.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid #dae2f1;
`;

const EventTitle = styled.div`
  padding-left: 15px;
  font-size: 1.4rem;
`;

export default CalendarView;
