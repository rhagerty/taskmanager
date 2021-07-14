import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Quote = () => {
  const [quote, setQuote] = useState(null);

  const index = () =>{
    return Math.floor(Math.random()*1600)
  }
  
  useEffect(() => {
    fetch("https://type.fit/api/quotes", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        
        setQuote(response[index()]);
        console.log(index());
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  if (quote) {
    return (
      <Content>
        <QuoteBox>
          <Description>{quote.text}</Description>
          <Author>
            <div>- {quote.author}</div>
          </Author>
        </QuoteBox>
      </Content>
    );
  } else {
    return <div>Loading quote.</div>;
  }
};
const Content = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
  background-color: #DFECE8;
  text-align: center;
`;

const QuoteBox = styled.div`
  padding: 30px 20px 10px 20px;
  margin: 0 auto;
`;
const Description = styled.div`
  font-weight: 300;
  font-size: 1.2rem;
  font-style: italic;
`;
const Author = styled.div`
  padding-top: 0.5rem;
  font-size: 0.8rem;

`;
export default Quote;
