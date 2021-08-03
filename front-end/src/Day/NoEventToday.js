import React from "react";
import styled from "styled-components";

const NoEventToday = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col">
          <p>You have nothing planned for the day.</p>
          <p className="TapMsg">Tap " + " to add a task.</p>
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
    font-size: 1.2rem;
  }
  font-family: "Montserrat", sans-serif;
`;
const Img = styled.img`
  max-width: 400px;
  margin: 0 auto;
`;
export default NoEventToday;
