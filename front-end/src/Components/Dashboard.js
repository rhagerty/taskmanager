import React from "react";
import styled from "styled-components";
import Notepad from "../Components/Notepad";
import Priorities from "../Components/Priorities";
import LoginButton from "../Navigation/LoginButton";
import RegisterButton from "../Navigation/RegisterButton";

const Dashboard = () => {

  function loggedInDashboard() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-12">
          <SectionTitle>Priorities</SectionTitle>
          <Priorities />
          <div className="row">
            <div className="col">
              <SectionTitle>Brain Dump</SectionTitle>
              <Notepad />
            </div>
          </div>
        </div>
      </div>
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
  background-color: #eeeff6;
  color: #787ab8;
  text-align: center;

  .loginTxt {
    padding-top: 30px;
  }
`;

const SectionTitle = styled.div`
  text-align: center;
  margin: 20px 0 10px 0;
  font-weight: 600;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  color: #787ab8;
`;

export default Dashboard;
