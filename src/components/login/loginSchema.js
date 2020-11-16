import * as yup from "yup";

export default yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Please enter a valid email address"),
    password: yup
        .string()
        .required("Enter your password")
        .min(6, "Password must be at least 6 characters"),
  });