import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

export default function Navbar() {
  const today = new Date();
  let greeting = "";
  if (today.getHours() < 12) {
    greeting = "Good Morning";
  } else if (today.getHours() < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  function loggedInNav() {
    return (
      <div className="col">
        <Wrapper>
          <LogoutButton/>
        </Wrapper>
      </div>
    );
  }

  function loggedOutNav() {
    return <div className="col"></div>;
  }

  return (
    <div className="container">
      <div className="row">
        <TopBanner>
          <div className="col-12">
            <Welcome>{greeting}</Welcome>
            <div className="row">
              <div className="col-md-8 offset-md-2">
                <MainDate>Today is {format(today, "EEEE, LLLL do")}.</MainDate>
              </div>
              <div className="col-md-2">
                {/* {localStorage.getItem("username") !== null
                  ? loggedInNav()
                  : loggedOutNav()} */}
              </div>
            </div>
          </div>
        </TopBanner>
      </div>
    </div>
  );
}

const TopBanner = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 1000px;
  width: 75%;
  border-radius: 5px;
  margin: 20px auto;
  padding: 20px 30px;
  border: 3px solid #40776A;
  text-align: center;
`;

const Welcome = styled.div`
  font-size: 4rem;
  font-family: "League Script", cursive;
  color: #458173;
  opacity: 0.8;
`;
const MainDate = styled.div`
  font-size: 0.8rem;
  text-align: center;
  color: #458173;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
`;

const Wrapper = styled.div`
  font-size: 0.8rem;
  color: #458173;
  text-decoration: none;
  font-weight: bold;
  display: inline;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
