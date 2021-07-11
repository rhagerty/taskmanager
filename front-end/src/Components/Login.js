import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setUser((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios.post("/login", {
      body: JSON.stringify({ user }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        history.push("/");
      })
      .catch((error) => {
        console.log("error!", error);
      });
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="loginForm">
        <Username
          type="text"
          name="username"
          placeholder="USERNAME"
          onChange={handleChange}
          value={user.username}
        />
        <Password
          type="text"
          name="password"
          placeholder="PASSWORD"
          onChange={handleChange}
          value={user.password}
        />
        <button type="submit" className="loginBtn">
          Login
        </button>
      </form>
    </Wrapper>
  );
};

export default Login;

const Username = styled.input`
  border: none;
  width: 75%;
  border-bottom: 2px solid #575aa6;
  padding-bottom: 5px;
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: 500;
  background-color: transparent;
  font-family: "Montserrat", sans-serif;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 50%;
    font-weight: 400;
  }
`;
const Password = styled.input`
  margin: 10px 0;
  border: none;
  width: 75%;
  border-bottom: 1px solid #b3b3b3;
  padding-bottom: 5px;
  font-size: 1rem;
  background-color: transparent;
  font-family: "Montserrat", sans-serif;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 60%;
  }
`;
const Wrapper = styled.div`
  margin: 20px auto;
  max-width: 500px;
  .loginForm {
    text-align: center;
    padding: 10px;
  }
  .loginBtn {
    display: block;
    margin: 10px auto;
    background-color: white;
    color: #575aa6;
    border: 2px solid #575aa6;
    font-family: "Montserrat", sans-serif;
    text-transform: uppercase;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 5px 10px;
  }
`;