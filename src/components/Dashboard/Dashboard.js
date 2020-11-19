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
      <div className="greeting">
        <p>Hello {props.user.name}, welcome to your dashboard!</p>
      </div>
      <div className="yourProjects">Your Projects</div>
      {props.isLoading
        ? "Loading Projects..."
        : props.projects.map((proj) => {
            return <ProjectPanel key={uuid()} project={proj} />;
          })}
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30rem;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  @media (max-width: 1280px) {
    width: 100%;
    margin-left: 0;
    font-size: 4rem;
  }
  @media (max-width: 850px) {
    font-size: 3rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
  .greeting {
    width: 100%;
    display: flex;
    justify-content: center;
    padding-top: 9.5rem;
    background-color: #5e42a6;
    @media (max-width: 480px) {
      padding-top: 5rem;
    }
    p {
      @media (max-width: 850px) {
        padding: 0 10% 0 10%;
      }
      @media (max-width: 300px) {
        padding: 0;
      }
    }
  }
  .yourProjects {
    width: 100%;
    font-size: 4rem;
    background-color: #b74e91;
    @media (max-width: 1280px) {
      padding-left: 0;
      font-size: 3rem;
    }
    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
`;
