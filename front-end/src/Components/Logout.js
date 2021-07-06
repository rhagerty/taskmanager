import React from "react";

import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  localStorage.removeItem("username");
  history.push("/");
  return true;
};

export default Logout;
