import * as yup from "yup";

export default yup.object().shape({
    project_name: yup
        .string()
        .required("Please enter a project name"),
    project_description: yup
        .string()
        .required("Please enter a project description"),
    project_funding: yup
        .number()
        .typeError("Please enter a dollar amount")
        .min(1, "Please enter a dollar amount")
        .required("Please enter a dollar amount"),
    funded: yup
        .boolean()
        .typeError("Please specify if your project has been funded")
        .oneOf([true, false], "Please specify if your project has been funded")
  });