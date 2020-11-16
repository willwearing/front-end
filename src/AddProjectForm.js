import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { addProject } from './actions';

const AddProjectForm = props => {

    //initial values for new project
    initialValues = {
        project_name: '',
        project_description: '',
        project_funding: '',
        funded: false,
        user_id: ''
    }

    //setting up state for a new project
    const [newProject, setNewProject] = useState(initialValues);

    //handle changes in the form
    const handleChanges = e => {
        setNewProject({
            ...newProject,
            [e.target.name]: e.target.value
        })
    }

    //handle submit to add the project
    const handleAdd = e => {
        e.preventDefault();
        props.addProject(newProject);
        setNewProject({
            ...newProject,
            project_name: '',
            project_description: '',
            project_funding: '',
            funded: false,
            user_id: ''
        })
    }

    return(
        <div>
            <h2>Create a New Project</h2>
            <form onSubmit={handleAdd}>
                Project Name: 
                <input
                name='project_name'
                type='text'
                value={newProject.project_name}
                onChange={handleChanges}
                />
                Project Description: 
                <input
                name='project_description'
                type='text'
                value={newProject.project_description}
                onChange={handleChanges}
                />
                Project Funding ($): 
                <input
                name='project_funding'
                type='text'
                value={newProject.project_funding}
                onChange={handleChanges}
                />
                <button>Create!</button>
            </form>
        </div>

    )


}

export default connect(null, { addProject })(AddProjectForm);