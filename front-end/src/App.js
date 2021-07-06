import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import CalendarView from "./Calendar/CalendarView";
import DayView from "./Day/DayView";
import WeekView from "./Week/WeekView";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import Register from "./Components/Register";
import Navbar from "./Navigation/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route exact path="/calendar-month">
          <CalendarView />
        </Route>
        <Route exact path="/date/:date">
          <DayView />
        </Route>
        <Route exact path="/week/:date">
          <WeekView />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
