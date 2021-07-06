import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../Constants";
import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import { AiOutlineHome } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import NewEventDialog from "../Components/NewEventDialog";

const WeekView = () => {
  let history = useHistory();
  const [status, setStatus] = useState("idle");
  const [today, setToday] = useState(new Date());
  const [weekEvents, setWeekEvents] = useState([]);

  //Determine the date for the current week's Monday
  //let current_month = format(today, "LLLL");
  let toStartOfWeek = today.getDay() - 1;
  let startOfWeekDate = new Date();
  startOfWeekDate.setDate(today.getDate() - toStartOfWeek);

  // Create an array with all the dates of the current week
  let weekArray = [];
  for (let i = 0; i < 7; i++) {
    let date = new Date();
    date.setDate(startOfWeekDate.getDate() + i);
    weekArray.push(format(date, "yyyy-MM-dd"));
  }
  // Create a state with the dates array
  const [weekRange, setWeekRange] = useState(weekArray);

  // Fetch this week's events
  useEffect(() => {
    if (weekRange.length > 0) {
      setStatus("idle");
      fetch("/events/week", {
        method: "POST",
        body: JSON.stringify({ weekRange }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setWeekEvents(res.data.results);
          setStatus("received");
        })
        .catch((error) => {
          console.log("error!", error);
          setStatus("error");
        });
    }
  }, [weekRange]);

  useEffect(() => {
    //Determine the date for the current week's Monday
    //let current_month = format(today, "LLLL");
    let toStartOfWeek = today.getDay() - 1;
    let startOfWeekDate = new Date();
    startOfWeekDate.setDate(today.getDate() - toStartOfWeek);

    // Create an array with all the dates of the current week
    let weekArray = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(startOfWeekDate.getDate() + i);
      weekArray.push(format(date, "yyyy-MM-dd"));
    }

    setWeekRange(weekArray);
  }, [today]);

  // Refresh after adding a new event
  const refreshAfterNewEvent = async () => {
    setStatus("idle");
    await fetch("/events/week", {
      method: "POST",
      body: JSON.stringify({ weekRange }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setWeekEvents(res.data.results);
        setStatus("received");
      })
      .catch((error) => {
        console.log("error!", error);
        setStatus("error");
      });
  };

  const nextWeek = () => {
    let nextDay = new Date();
    nextDay.setDate(today.getDate() + 7);
    setToday(nextDay);
  };

  const previousWeek = () => {
    let prevDay = new Date();
    prevDay.setDate(today.getDate() - 7);
    setToday(prevDay);
  };

  return (
    <Wrapper>
      <NewEventDialog refreshEvents={refreshAfterNewEvent} />
      <Tabs>
      <TabItem
          onClick={() => history.push("/")}
          style={{ backgroundColor: "#787ab8" }}
        >
          dashboard
        </TabItem>
        <TabItem
          onClick={() => history.push("/calendar-month")}
          style={{ backgroundColor: "#787ab8" }}
        >
          month
        </TabItem>
        <TabItem onClick={() => history.push("/week/a")}>week</TabItem>
        <TabItem
          style={{ backgroundColor: "#787ab8" }}
          onClick={() => history.push(`/date/${format(new Date(), "y-MM-dd")}`)}
        >
          Day
        </TabItem>
      </Tabs>
      <WeekBar>
        <div className="month">{format(today, "LLLL yyyy")}</div>
        <div className="numbers">
          <WeekButton onClick={(ev) => previousWeek()}> {"‹"} </WeekButton>
          {weekRange.map((weekDay) => {
            let date = new Date(
              weekDay.slice(0, 4),
              weekDay.slice(5, 7) - 1,
              weekDay.slice(8, 10)
            );
            return <div>{date.getDate()}</div>;
          })}
          <WeekButton onClick={(ev) => nextWeek()}> {"›"} </WeekButton>
        </div>
      </WeekBar>
      <WeekContainer>
        {weekEvents.map((weekDay) => {
          let date = new Date(
            weekDay.date.slice(0, 4),
            weekDay.date.slice(5, 7) - 1,
            weekDay.date.slice(8, 10)
          );

          if (date.getDay() < 6 && date.getDay() > 0) {
            return (
              <DateContainer
                onClick={(ev) => {
                  history.push(`/date/${weekDay.date}`);
                }}
              >
                <div className="week-date">{format(date, "EEEE, MMM. d")}</div>
                <Tasks>
                  {weekDay.allDayEvents.map((task) => {
                    return (
                      <SingleTask>
                        <AllDayEvent>{task.title}</AllDayEvent>
                      </SingleTask>
                    );
                  })}
                  {weekDay.events.map((task) => {
                    return (
                      <SingleTask>
                        <TaskTime>
                          {task.start.time.hours}:{task.start.time.minutes}{" "}
                          {task.start.time.ap}
                        </TaskTime>
                        <TaskTitle>{task.title}</TaskTitle>
                      </SingleTask>
                    );
                  })}
                </Tasks>
              </DateContainer>
            );
          } else if (date.getDay() === 6) {
            return (
              <DateContainer>
                <WEDateContainer
                  onClick={(ev) => {
                    history.push(`/date/${weekDay.date}`);
                  }}
                >
                  <div className="week-date">
                    {format(date, "EEEE, MMM. d")}
                  </div>
                  <Tasks>
                    {weekDay.allDayEvents.map((task) => {
                      return (
                        <SingleTask>
                          <AllDayEvent>{task.title}</AllDayEvent>
                        </SingleTask>
                      );
                    })}
                    {weekDay.events.map((task) => {
                      return (
                        <SingleTask>
                          <TaskTime>
                            {task.start.time.hours}:{task.start.time.minutes}{" "}
                            {task.start.time.ap}
                          </TaskTime>
                          <TaskTitle>{task.title}</TaskTitle>
                        </SingleTask>
                      );
                    })}
                  </Tasks>
                </WEDateContainer>
                <WEDateContainer
                  onClick={(ev) => {
                    history.push(`/date/${weekEvents[6].date}`);
                  }}
                >
                  <div className="week-date">
                    {format(date.setDate(date.getDate() + 1), "EEEE, MMM. d")}
                  </div>
                  <Tasks>
                    {weekEvents[6].allDayEvents.map((task) => {
                      return (
                        <SingleTask>
                          <AllDayEvent>{task.title}</AllDayEvent>
                        </SingleTask>
                      );
                    })}
                    {weekEvents[6].events.map((task) => {
                      return (
                        <SingleTask>
                          <TaskTime>
                            {task.start.time.hours}:{task.start.time.minutes}{" "}
                            {task.start.time.ap}
                          </TaskTime>
                          <TaskTitle>{task.title}</TaskTitle>
                        </SingleTask>
                      );
                    })}
                  </Tasks>
                </WEDateContainer>
              </DateContainer>
            );
          } else {
            return <></>;
          }
        })}
      </WeekContainer>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  height: 100vh;
  margin: 20px auto;
  width: 80%;
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
  font-family: 'Montserrat', sans-serif;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: none;
  padding: 6px 0;
  font-size: 1rem;
`;

const WeekBar = styled.div`
  text-align: center;
  background-color: white;
  padding-bottom: 8px;
  .month {
    padding-top: 8px;
    color: #575aa6;
    font-size: 1.2rem;
    text-transform: uppercase;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
  }
  .numbers {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 0px;
    font-size: 1rem;
  }
`;
const WeekButton = styled.button`
  margin: 0 10px;
  border: none;
  font-size: 1.5rem;
  line-height: 1rem;
  color: #575aa6;
  background-color: white;
  &:active {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const WeekContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  .week-date {
    width: 100%;
    text-align: center;
    padding: 5px 0;
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: underline 3px solid rgb(187, 222, 215);
  }
`;

const DateContainer = styled.div`
  border: 1px solid #dae2f1;
  width: 49%;
  height: 33%;
  overflow: hidden;
`;
const WEDateContainer = styled.div`
  border-bottom: 1px solid #cedefd;
  height: 50%;
  &:last-of-type {
    border: none;
  }
`;

const Tasks = styled.div`
  padding: 5px 10px;
`;

const SingleTask = styled.div`
  margin: 2px 0;
`;
const AllDayEvent = styled.div`
  background-color: rgb(254, 182, 185, 0.7);
  padding: 2px 5px;
  margin: 3px 0px;
`;
const TaskTime = styled.div`
  display: inline;
  background-color: rgb(97, 191, 191);
  margin-right: 5px;
  font-size: 0.9rem;
  padding: 0px 2px;
  text-transform: lowercase;
  color: white;
  font-weight: 400;
`;
const TaskTitle = styled.div`
  display: inline;
  font-size: 0.95rem;
`;

export default WeekView;
