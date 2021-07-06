import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/logout");
  };
  return (
    <Wrapper>
      <button className="logoutBtn" onClick={handleClick}>
        Logout
      </button>
    </Wrapper>
  );
};

export default LogoutButton;

const Wrapper = styled.div`
  .logoutBtn {
    font-family: "Montserrat", sans-serif;
    background-color: white;
    border: 2px solid #575aa6;
    color: #575aa6;
  }
`;
