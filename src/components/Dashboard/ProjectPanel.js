import React from "react";
import { connect } from "react-redux";
import { deleteProject, updateProject } from "./../../actions";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function ProjectPanel(props) {
  const history = useHistory();

  const handleDelete = (e) => {
    e.preventDefault();
    props.deleteProject(props.project.id);
    history.push("/dashboard");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    history.push(`/edit/${props.project.id}`);
  };

  return (
    <Project>
      <div className="content">
        <div className="inner">
          <div className="title">
            Project Name: {props.project.project_name}
          </div>
          <p>Project Description: {props.project.project_description}</p>
          <div>Project Funding: ${props.project.project_funding}</div>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </Project>
  );
}

export default connect(null, { deleteProject, updateProject })(ProjectPanel);

const Project = styled.section`
  .inner {
    /* background-color: #5052b5; */
    margin-top: 10rem;
    margin-bottom: 15px;
    padding-bottom: 1rem;

    .title {
      display: flex;
      justify-content: center;
      font-size: 3rem;
      @media (max-width: 1280px) {
        width: 100%;
      }
      @media (max-width: 600px) {
        font-size: 2rem;
      }
    }
    p {
      font-size: 2rem;
      margin-bottom: 0;
      @media (max-width: 600px) {
        font-size: 1.5rem;
        /* padding: 0 10% 0 10%; */
      }
    }
    span {
      color: rgba(255, 255, 255, 0.55);
    }
    div {
      font-size: 2rem;
      @media (max-width: 600px) {
        font-size: 1.5rem;
      }
    }
    button {
      margin-top: 1rem;
      height: 5rem;
      font-size: 1rem;
      &:nth-of-type(1) {
        margin-right: 10px;
      }
      @media (max-width: 600px) {
        font-size: 0.8rem;
      }
    }
  }
`;
