import "./App.css";
import { Route, Link, Switch, BrowserRouter as Router, useHistory } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import styled from "styled-components";
import Dashboard from "./components/Dashboard/Dashboard";
import ProjectForm from "./components/CreateNewProject/ProjectForm";
import PrivateRoute from './utils/PrivateRoute'
import EditProjectForm from './components/EditProject/EditProjectForm';

export default function App() {

  const submitLogout = () => {
    localStorage.removeItem('token');
  }

  return (
    <Router>
    <div className="App">
      <section id="sidebar">
        <div className="inner">
          <nav>
            <ul>
              <li>
                <a href="https://marketing-page-theta.vercel.app" target = "_self" className="scrolly">
                  Home
                </a>
              </li>
              <li>
                <StyledLink className="scrolly" to="/login">
                  Log In
                </StyledLink>
              </li>
              <li>
              <StyledLink to="login" onClick={() =>{submitLogout()}}>Logout</StyledLink>
              </li>
              <li>
                <StyledLink to="/register">Sign Up</StyledLink>
              </li>
              <li>
                <StyledLink to="/dashboard">Dashboard</StyledLink>
              </li>
              <li>
                <StyledLink to="/newproject">Create New Project</StyledLink>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/edit/:id" component={EditProjectForm} />
        <PrivateRoute path="/newproject" component={ProjectForm} />
        <PrivateRoute path="/dashboard" component={Dashboard}/>
      </Switch>
    </div>
    </Router>
  );
}

const StyledLink = styled(Link)`
  /* text-decoration: none; */
  /* /* font-size: 2rem; */
  /* padding: 0.5rem; */

  /* &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  } */
`;
