import React, { useState, useEffect } from 'react';
import * as yup from "yup";
import schema from "./EditProjectFormSchema";
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';

import { updateProject, fetchProjects } from './../../actions'


const EditProjectForm = (props) => {

    const initialFormValues = {
        project_name: "",
        project_description: "",
        project_funding: "",
        funded: "",
      };
      const initialFormErrors = {
        project_name: "",
        project_description: "",
        project_funding: "",
        funded: "",
      };
      const initialDisabled = true;

    const [updatedProject, setUpdatedProject] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);
    
    const { id } = useParams();
    const history = useHistory();

    const inputChange = (name, value) => {
        yup
          .reach(schema, name)
          .validate(value)
          .then(() => {
            setFormErrors({
              ...formErrors,
              [name]: "",
            });
          })
          .catch((err) => {
            setFormErrors({
              ...formErrors,
              [name]: err.errors[0],
            });
          });
        setUpdatedProject({
          ...updatedProject,
          [name]: value,
        });
      };
    
      const change = (evt) => {
        const { name, value } = evt.target;
        inputChange(name, value);
      };


      useEffect(() => {
        schema.isValid(updatedProject).then((valid) => {
          setDisabled(!valid);
        });
      }, [updatedProject]);

      const updateButton = e => {
        e.preventDefault();
        props.updateProject(id, updatedProject);
        setUpdatedProject({...updatedProject,
            project_name: "",
            project_description: "",
            project_funding: "",
            funded: "",
        })
        history.push('/dashboard'); 
      }

    return(
        <div>
            <h2>Edit Project</h2>
            <ProjectFormContainer>
                <div className="formWrapper">
                    <form onSubmit={updateButton}>
                    <div className="inputWrapper">
                        <div className="fields">Project Name</div>
                        <input
                        type="text"
                        name="project_name"
                        value={updatedProject.project_name}
                        onChange={change}
                        />
                        {formErrors.project_name ? (
                        <div className="error">{formErrors.project_name}</div>
                        ) : (
                        <div className="emptyDiv"></div>
                        )}
                    </div>

                    <div className="inputWrapper">
                        <div className="fields">Project Description</div>
                        <textarea
                        type="text"
                        name="project_description"
                        value={updatedProject.project_description}
                        onChange={change}
                        />
                        {formErrors.project_description ? (
                        <div className="error">{formErrors.project_description}</div>
                        ) : (
                        <div className="emptyDiv"></div>
                        )}
                    </div>

                    <div className="inputWrapper">
                        <div className="fields">Project Funding</div>
                        <input
                        type="text"
                        name="project_funding"
                        value={updatedProject.project_funding}
                        onChange={change}
                        />
                        {formErrors.project_funding ? (
                        <div className="error">{formErrors.project_funding}</div>
                        ) : (
                        <div className="emptyDiv"></div>
                        )}
                    </div>

                    <div className="inputWrapper">
                        <div className="fields">Funded</div>
                        <select name="funded" value={updatedProject.funded} onChange={change}>
                        <option value="">-</option>
                        <option value="0">Yes</option>
                        <option value="1">No</option>
                        </select>
                        {formErrors.funded ? (
                        <div className="error">{formErrors.funded}</div>
                        ) : (
                        <div className="emptyDiv"></div>
                        )}
                    </div>

                    <div className="submitBtn">
                        <div className="filler">
                        <button disabled={disabled}>Create New Project</button>
                        </div>
                    </div>
                    </form>
                </div>
            </ProjectFormContainer>

        </div>
    )

}

export default connect(null, {updateProject, fetchProjects})(EditProjectForm);

const ProjectFormContainer = styled.div`
  /* border: 1px solid black; */
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-top: 10rem;
  .formWrapper {
    display: flex;
    justify-content: center;
    padding-left: 40rem;
    padding-top: 17.5rem;
    form {
      display: flex;
      flex-direction: column;
      width: 75rem;
    }
    .inputWrapper {
      display: flex;
      margin: 1rem 0 1rem 0;
      .fields {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 10rem;
        height: 3.7rem;
        font-size: 1rem;
      }
      input {
        height: 3.1rem;
        width: 17.7rem;
      }
      textarea {
        width: 17.7rem;
        height: 8rem;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: flex-start;
        font-size: 0.8rem;
        overflow-wrap: break-word;
      }
      .error {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
        color: red;
        font-size: 1.1rem;
        padding-left: 1.5rem;
      }
      .emptyDiv {
        width: 17.7rem;
        height: 3.1rem;
      }
      select {
        width: 17.7rem;
        height: 3rem;
      }
    }
  }
  .submitBtn {
    display: flex;
    margin-left: 10rem;
    height: 3.1rem;
    .filler {
      width: 17.7rem;
      height: 3.7rem;
    }
    button {
      /* width: 10rem; */
      margin-top: 0.7rem;
      font-size: 0.7rem;
    }
  }
`;