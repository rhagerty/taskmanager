import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Notepad from "../Components/Notepad";
import Priorities from "../Components/Priorities";
import LoginButton from "../Navigation/LoginButton";
import RegisterButton from "../Navigation/RegisterButton";
import Divider from "./Divider";
import Quote from "../Homepage/Quote";
import NewEventDialog from "./NewEventDialog";
import { format } from "date-fns";

const Dashboard = () => {
  const today = new Date();

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

  function loggedInDashboard() {
    return (
      <>
        <Quote />
        <Divider />
        <div className="row">
          <div className="col-lg-3 col-md-12">
            <Events>
              <SectionTitle>Today</SectionTitle>
              {dayEvents.length === 0 ? (
                <NothingPlanned>
                  Nothing planned for today. Lucky you!
                </NothingPlanned>
              ) : (
                dayEvents.map((ev) => {
                  console.log(ev);
                  if (ev.start.time.allday === true) {
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
                          {parseInt(ev.start.time.hours)}:
                          {ev.start.time.minutes}{" "}
                          {ev.start.time.ap.toLowerCase()}
                        </EventHour>
                        <EventTitle>{ev.title}</EventTitle>
                      </EventLine>
                    );
                  }
                })
              )}
            </Events>
            <NewEventDialog />

            <SectionTitle>Priorities</SectionTitle>
            <Priorities />
          </div>
          <div className="col-lg-9 col-md-12">
            <SectionTitle>Brain Dump</SectionTitle>
            <Notepad />
          </div>
        </div>
      </>
    );
  }

  function loggedOutDashboard() {
    return (
      <div className="col-12">
        <Wrapper>
          <p className="loginTxt">Please login to access your dashboard.</p>
          <LoginButton /> or <RegisterButton />
        </Wrapper>
      </div>
    );
  }

  return (
    <Wrapper>
      <div className="container">
        {localStorage.getItem("username")
          ? loggedInDashboard()
          : loggedOutDashboard()}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0;
  min-height: 100vw;
  margin: 0 auto;
  background-color: #dfece8;
  color: #40776a;
  text-align: center;

  .loginTxt {
    padding-top: 30px;
  }
`;

const SectionTitle = styled.div`
  text-align: center;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  color: #40776a;
`;

const NothingPlanned = styled.div`
  border-radius: 5px;
  padding: 15px;
  font-size: 1.2rem;
  font-weight: 300;
  text-align: center;
`;

const Events = styled.div`
  margin: 0 auto;
`;

const EventLine = styled.div`
  display: flex;
  margin-left: 20%;
  align-items: baseline;
  margin-right: 20%;
`;

const EventHour = styled.div`
  color: #84bdaf;
  margin-right: 10px;
  font-weight: 500;
  font-size: 1.5rem;
  font-family: "Patrick Hand", cursive;
`;
const EventTitle = styled.div`
  font-size: 1.2rem;
  color: #59a692;
  line-height: 100%;
  font-family: "Patrick Hand", cursive;
`;
export default Dashboard;
