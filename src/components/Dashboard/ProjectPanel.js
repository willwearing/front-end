import React from "react";
import { connect } from 'react-redux';
import { deleteProject, updateProject } from './../../actions';
import { useHistory } from 'react-router-dom';

function ProjectPanel(props) {

  const history = useHistory();

  const handleDelete = e => {
    e.preventDefault();
    props.deleteProject(props.project.id);
    history.push('/dashboard');
  }

  const handleEdit = e => {
    e.preventDefault();
    history.push(`/edit/${props.project.id}`)
  }

  return (
    <section id="one" className="wrapper style2 spotlights">
      <section>
        <div className="content">
          <div className="inner">
              <div>Project Name: {props.project.project_name}</div>
              <p>Project Description: {props.project.project_description}</p>
              <div>Project Funding: {props.project.project_funding}</div>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default connect(null, { deleteProject, updateProject })(ProjectPanel);