import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/Home";
import Register from "./components/register/Register";
import styled from "styled-components";
import Dashboard from "./components/Dashboard/Dashboard";

export default function App() {
  return (
    <div className="App">
      <section id="sidebar">
        <div className="inner">
          <nav>
            <ul>
              <li>
                <a href="/" className="scrolly">
                  Home
                </a>
              </li>
              <li>
                <StyledLink className="scrolly" to="/login">
                  Log In
                </StyledLink>
              </li>
              <li>
                <StyledLink to="/register">Sign Up</StyledLink>
              </li>
              <li>
                <StyledLink to="/dashboard">Dashboard</StyledLink>
              </li>
            </ul>
            {/* <div id="sidebar" className="scrolly">
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/login">Log In</StyledLink>
            <StyledLink to="/register">Sign Up</StyledLink>
            <StyledLink to="/dashboad">Dashboard</StyledLink>
          </div> */}
          </nav>
        </div>
      </section>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

const StyledLink = styled(Link)`
  /* text-decoration: none; */
  font-size: 2rem;
  padding: 0.5rem;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    /* text-decoration: none; */
  }
`;
