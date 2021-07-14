import styled from "styled-components";

const Divider = () => <HR />;

export default Divider;

const HR = styled.div`
  border-top: 1px solid #9BBFB6;
  margin: 25px 0 5px 0;
  text-align: center;
  :after {
    content: "§";
    display: inline-block;
    position: relative;
    top: -14px;
    padding: 0 10px;
    background: #f0f0f0;
    color: #9BBFB6;
    font-size: 18px;
    -webkit-transform: rotate(60deg);
    -moz-transform: rotate(60deg);
    transform: rotate(60deg);
  }
`;
