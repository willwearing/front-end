import React, { useEffect } from "react";
import ProjectPanel from "./ProjectPanel";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

import { connect } from "react-redux";
//import { axiosWithAuth } from './../../utils/axiosWithAuth';

import { fetchProjects } from "./../../actions";

const Dashboard = (props) => {
  useEffect(() => {
    props.fetchProjects();
  }, []);

  return (
    <Header>
      <div id="wrapper">
        <section id="intro" className="wrapper style1 fade-up">
          <div className="innerStuff">
            {/*Here we will greet the user and display their details*/}
            <p>Hello, welcome to your dashboard!</p>
          </div>
        </section>
        <YourProjects>Your Projects</YourProjects>
        {props.isLoading
          ? "Loading Projects..."
          : props.projects.map((proj) => {
              return <ProjectPanel key={uuid()} project={proj} />;
            })}
      </div>
    </Header>
  );
};

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    user: state.user,
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps, { fetchProjects })(Dashboard);

const YourProjects = styled.div`
  font-size: 4rem;
  background-color: #b74e91;
  @media (max-width: 1280px) {
    padding-left: 0;
    font-size: 3rem;
  }
`;

const Header = styled.div`
  display: flex;
  /* flex-direction: column; */
  margin-left: 15rem;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  width: 100%;
  @media (max-width: 1280px) {
    width: 100%;
    margin-left: 0;
    font-size: 4rem;
  }
  @media (max-width: 850px) {
    font-size: 3rem;
  }
  .innerStuff {
    width: 100vw;
    display: flex;
    justify-content: center;
    padding-top: 9.5rem;
    p {
      @media (max-width: 850px) {
        padding: 0 10% 0 10%;
      }
    }
  }
`;
