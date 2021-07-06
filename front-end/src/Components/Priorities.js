import React, { useState } from "react";
import {TextField} from "@material-ui/core";
import styled from "styled-components";

export default function Priorities() {
  const [priorities, setPriorities] = useState({
    soonish: "",
    laterish: "",
  });

  const handleChange = (event) => {
    setPriorities(event.target.value);
    localStorage.setItem("soonish", priorities.soonish);
    localStorage.setItem("laterish", priorities.laterish);
  };

  return (
    <form autoComplete="off">
      <Wrapper>
        <TextField
          id="outlined-multiline-static"
          label="SOONISH"
          multiline
          rows={8}
          value={priorities.soonish}
          onChange={handleChange}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          id="outlined-multiline-static"
          label="LATERISH"
          multiline
          rows={8}
          value={priorities.laterish}
          onChange={handleChange}
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
      </Wrapper>
    </form>
  );
}

const Wrapper = styled.div`
  text-align: center;

  .MuiTextField-root {
    margin: 5px 10px;
    width: 40%;
    background-color: white;
  }
  #outlined-multiline-static{
    padding: 10px 5px;
  }
`;
