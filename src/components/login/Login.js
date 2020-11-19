import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { axiosWithAuth } from "../../utils/axiosWithAuth";
import schema from "./loginSchema";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const initialFormValues = {
  email: "",
  password: "",
};
const initialFormErrors = {
  email: "",
  password: "",
};
const initialDisabled = true;

export default function Login() {
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
        localStorage.setItem("token", res.data.token);
        console.log(res.data);
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

const LoginContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
  .formWrapper {
    display: flex;
    justify-content: center;
    padding-left: 40rem;
    align-items: center;
    height: 100vh;
    @media (max-width: 1280px) {
      padding-left: 35rem;
      padding-top: 15rem;
      align-items: flex-start;
      margin-top: 10rem;
    }
    @media (max-width: 900px) {
      padding-left: 0rem;
      padding-top: 0rem;
    }
    form {
      display: flex;
      flex-direction: column;
      width: 75rem;
      @media (max-width: 900px) {
        width: 25rem;
      }
    }
    .inputWrapper {
      display: flex;
      margin: 1rem 0 1rem 0;
      @media (max-width: 900px) {
        flex-direction: column;
      }
      .fields {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 10rem;
        height: 3.7rem;
        font-size: 1.5rem;
        @media (max-width: 900px) {
          justify-content: flex-start;
        }
      }
      input {
        height: 3.7rem;
        width: 25rem;
        font-size: 1.4rem;
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
        @media (max-width: 900px) {
          width: 0rem;
          height: 0rem;
        }
      }
    }
  }
  .submitBtn {
    display: flex;
    margin-left: 10rem;
    height: 3.1rem;
    @media (max-width: 900px) {
      margin-left: 0rem;
    }
    .filler {
      width: 25rem;
      height: 3.7rem;
    }
    button {
      margin-top: 1rem;
      font-size: 1rem;
      @media (max-width: 900px) {
        margin-top: 2.5rem;
      }
    }
  }
`;
