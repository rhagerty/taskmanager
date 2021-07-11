import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const LoginButton = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/loginUser")
  }
  return (
    <Wrapper>
      <button className="loginBtn" onClick={handleClick}>Login</button>
    </Wrapper>
  );
};

export default LoginButton;

const Wrapper = styled.div`
  .loginBtn {
    font-family: "Montserrat", sans-serif;
    background-color: white;
    border: 2px solid #575aa6;
    color: #575aa6;
  }
`;
