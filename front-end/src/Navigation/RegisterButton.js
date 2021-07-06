import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const RegisterButton = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/register")
  }
  return (
    <Wrapper>
      <button className="registerBtn" onClick={handleClick}>Register</button>
    </Wrapper>
  );
};

export default RegisterButton;

const Wrapper = styled.div`
  .registerBtn {
    font-family: "Montserrat", sans-serif;
    background-color: white;
    border: 2px solid #575aa6;
    color: #575aa6;
  }
`;
