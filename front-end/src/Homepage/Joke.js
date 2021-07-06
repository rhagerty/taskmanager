import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Joke = () => {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    fetch("https://official-joke-api.appspot.com/random_joke", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setJoke(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  if (joke) {
    return (
      <Content>
        <InfoBox>
          <Description>{joke.setup}</Description>
          <Info>
            <div>{joke.punchline}</div>
          </Info>
        </InfoBox>
      </Content>
    );
  } else {
    return <div>Loading joke.</div>;
  }
};
const Content = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  align-items: center;
  justify-content: center;
`;

const TempBox = styled.div`
  text-align: center;
`;
const CurrentTemp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const TempNum = styled.div`
  font-size: 3.4rem;
  font-weight: 300;
  line-height: 2.7rem;
  padding-top: 5px;
`;
const Exponent = styled.div`
  font-size: 1.5rem;
`;
const FeelsLike = styled.div`
  font-size: 0.7rem;
  padding-top: 10px;
`;
const AppTemp = styled.div`
  font-size: 1rem;
`;
const InfoBox = styled.div`
  padding-left: 8px;
`;
const Description = styled.div`
  font-weight: 300;
  font-size: 1.2rem;
`;
const Info = styled.div`
  padding-top: 0.5rem;
  font-size: 0.8rem;
`;
export default Joke;
