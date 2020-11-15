import * as yup from "yup";

export default yup.object().shape({
    email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Please enter a valid email address"),
    password: yup
        .string()
        .required("Enter a password")
        .min(6, "Password must be at least 6 characters"),
    username: yup
        .string()
        .required("Enter a username")
        .min(6, "Username must be at least 6 characters"),
    role: yup
        .string()
        .oneOf(["0", "1"], "Please select a role"),
  });