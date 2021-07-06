import React from "react";
import styled from "styled-components";
import picture from "./img.png";

const NoEventToday = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col">
          <p>You have nothing planned for the day!</p>
          <p className="TapMsg">Tap " + " to add a task.</p>
          <Img src={picture} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  padding-top: 30px;
  font-size: 1rem;
  .TapMsg {
    padding-top: 15px;
    font-size: 1.3rem;
  }
`;
const Img = styled.img`
  max-width: 400px;
  margin: 0 auto;
`;
export default NoEventToday;
