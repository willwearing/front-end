import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import schema from "./ProjectFormSchema";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { axiosWithAuth } from './../../utils/axiosWithAuth';
import { addProject } from './../../actions';
import { connect } from 'react-redux';

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

function ProjectForm(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

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
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const change = (evt) => {
    const { name, value } = evt.target;
    inputChange(name, value);
  };

  const newProject = (projectInfo) => {
    props.addProject(projectInfo);
    history.push('/dashboard');
  };

  const formSubmit = () => {
    const projectInfo = {
      project_name: formValues.project_name.trim(),
      project_description: formValues.project_description.trim(),
      project_funding: formValues.project_funding,
      funded: formValues.funded === 0 ? true : false,
    };
    newProject(projectInfo);
  };

  const submit = (evt) => {
    evt.preventDefault();
    formSubmit();
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <ProjectFormContainer>
      <div className="formWrapper">
        <form onSubmit={submit}>
          <div className="inputWrapper">
            <div className="fields">Project Name</div>
            <input
              type="text"
              name="project_name"
              value={formValues.project_name}
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
              value={formValues.project_description}
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
              value={formValues.project_funding}
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
            <select name="funded" value={formValues.funded} onChange={change}>
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
  );
}



export default connect(null, { addProject })(ProjectForm)

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
