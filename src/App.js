import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/Home";
import Register from "./components/register/Register";
import styled from 'styled-components';

export default function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <div className="nav-links">
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/login">Log In</StyledLink>
            <StyledLink to="/register">Sign Up</StyledLink>
          </div>
        </nav>
      </header>
      <Switch>
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

    &:focus, &:hover, &:visited, &:link, &:active {
        /* text-decoration: none; */
    }
`;