import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Register = () => {
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

  async function handleSubmit(e) {
    e.preventDefault();
    
    fetch("/register", {
      method: "POST",
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
      <form onSubmit={handleSubmit}>
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

export default Register;

const Username = styled.input`
  border: none;
  width: 75%;
  border-bottom: 2px solid black;
  padding-bottom: 5px;
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
 margin: 0 auto;
`;
