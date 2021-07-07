import React, { useState } from "react";
import styled from "styled-components";

function Notepad() {
  const [formData, setFormData] = useState([]);

  function handleChange(evt) {
    const value = evt.target;
    setFormData((formData) => [...formData, value]);
  }

  return (
    <Wrapper>
      <List>
        <li>
          <input type="text" value={formData} onChange={handleChange} />
        </li>
        <li>
          <input type="text" value={formData} onChange={handleChange} />
        </li>
        <li>
          <input type="text" value={formData} onChange={handleChange} />
        </li>
        <li>
          <input type="text" value={formData} onChange={handleChange} />
        </li>
        <li>
          <input type="text" value={formData} onChange={handleChange} />
        </li>
        <li>
          <input type="text" value={formData} onChange={handleChange} />
        </li>
        <li>
          <input type="text" value={formData} onChange={handleChange} />
        </li>
        <li>
          <input type="text" value={formData} onChange={handleChange} />
        </li>
        <li>
          <input type="text" value={formData} onChange={handleChange} />
        </li>
      </List>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  color: #555;
  margin: 20px auto;
  font-size: 12px;
  padding: 0 !important;
  font-family: courier, monospace;
  border: 1px solid #dedede;
  background: white;
  width: 80%;
`;

const List = styled.div`
  li {
    list-style: none;
    border-bottom: 1px dotted #ccc;
    height: auto;
    padding: 10px;
    text-transform: capitalize;
  }

  input {
    width: 100%;
    height: 100%;
    border: none;
  }

  text-align: center;
`;

export default Notepad;
