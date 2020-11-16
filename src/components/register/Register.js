import React, { useState, useEffect } from "react";
import * as yup from "yup";
import {axiosWithAuth} from "../../utils/axiosWithAuth";
import schema from "./registerSchema";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const initialFormValues = {
  email: "",
  password: "",
  username: "",
  role: "",
};
const initialFormErrors = {
  email: "",
  password: "",
  username: "",
  role: "",
};
const initialDisabled = true;

export default function Register() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  // const [newUser, setNewUser] = useState([]);

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

  const checkUser = (userInfo) => {
    axiosWithAuth()
    .post("/api/users", userInfo)
      .then((response) => {
        // debugger;
        console.log("registration resopnse", response);
        // setNewUser(userInfo);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formSubmit = () => {
    const userInfo = {
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      name: formValues.username.trim(),
      role: formValues.role,
    };
    checkUser(userInfo);
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

  // useEffect(() => {
  //   console.log(newUser);
  // }, [newUser]);

  return (
    <RegistrationContainer>
      <div className="formWrapper">
        <form onSubmit={submit}>
          <div className="inputWrapper">
            <div className="fields">Username</div>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={change}
            />
            {formErrors.username ? (
              <div className="error">{formErrors.username}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
          </div>

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

          <div className="inputWrapper">
            <div className="fields">Role</div>
            <select
              name="role"
              value={formValues.role}
              onChange={change}
              required
            >
              <option value="">Select Role</option>
              <option value="0">Project Owner</option>
              <option value="1">Investor</option>
            </select>
            {formErrors.role ? (
              <div className="error">{formErrors.role}</div>
            ) : (
              <div className="emptyDiv"></div>
            )}
          </div>

          <div className="submitBtn">
            <div className="filler">
              <button disabled={disabled}>Register</button>
            </div>
          </div>
        </form>
      </div>
    </RegistrationContainer>
  );
}

const RegistrationContainer = styled.div`
  /* border: 1px solid black; */
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-top: 10rem;
  .formWrapper {
    display: flex;
    justify-content: center;
    padding-left: 37.5rem;
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
      width: 10rem;
      margin-top: 0.7rem;
    }
  }
`;
