import React, { useState, useEffect } from "react";
import * as yup from "yup";
import {axiosWithAuth} from "../../utils/axiosWithAuth";
import schema from "./loginSchema";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { connect } from 'react-redux';
import { setUserDetails } from './../../actions';

const initialFormValues = {
  email: "",
  password: "",
};
const initialFormErrors = {
  email: "",
  password: "",
};
const initialDisabled = true;

function Login(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  // const [user, setUser] = useState([]);

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

  const checkUser = (loginInfo) => {
    axiosWithAuth()
    .post("/api/auth/login", loginInfo)
      .then((res) => {
        //debugger;
        localStorage.setItem('token', res.data.token)
        console.log(res.data);
        props.setUserDetails(res.data.user);
        setFormValues(initialFormValues);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formSubmit = () => {
    const loginInfo = {
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    };
    checkUser(loginInfo);
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
    <LoginContainer>
      <div className="formWrapper">
        <div className="inputWrapper">
          <form onSubmit={submit}>
            <div className="inputWrapper">
              <div className="fields">Email</div>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={change}
              />
              {formErrors.email ? (
                <div className="error">{formErrors.email}</div>
              ) : (
                <div className="emptyDiv"></div>
              )}
            </div>
            <div className="inputWrapper">
              <div className="fields">Password</div>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={change}
              />
              {formErrors.password ? (
                <div className="error">{formErrors.password}</div>
              ) : (
                <div className="emptyDiv"></div>
              )}
            </div>
            <div className="submitBtn">
              <div className="filler">
                <button disabled={disabled}>Log In</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </LoginContainer>
  );
}

export default connect(null, { setUserDetails })(Login);

const LoginContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-top: 10rem;
  .formWrapper {
    display: flex;
    justify-content: center;
    padding-left: 40rem;
    padding-top: 18rem;
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
        justify-content: center;
        width: 10rem;
        height: 3.7rem;
        font-size: 1.5rem;
      }
      input {
        height: 3.1rem;
        width: 17.7rem;
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
        width: 18.5rem;
        height: 3.7rem;
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
    }
  }
`;