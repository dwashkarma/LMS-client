"use client";
import InputField from "../shared/InputField";
import { useState } from "react";
import PasswordField from "../shared/PasswordField";
import ButtonComponent from "../shared/ButtonComponent";
import { useFormik } from "formik";
import * as yup from "yup";

const loginValues = {
  email: "",
  password: "",
};

const loginSchema = yup.object().shape({
  email: yup.string().required("Please fill out the field!"),
  password: yup.string().required("Please fill out the field!"),
});
const LoginPage = () => {
  const { values, handleBlur, handleChange, touched, errors, handleSubmit } =
    useFormik({
      initialValues: loginValues,
      validationSchema: loginSchema,
      onSubmit: () => {
        console.log(values);
      },
    });
  const [passwordType, setPasswordType] = useState(false);

  const handleClickPassword = () => {
    setPasswordType(!passwordType);
  };

  return (
    <div className="shadow-md  shadow-slate-200 rounded p-8 w-fit grid gap-8">
      <InputField
        name="email"
        value={values.email}
        label="Email"
        type="text"
        handleChange={handleChange}
        handleBlur={handleBlur}
        helperText={touched.email ? errors.email : ""}
        errors={touched.email && Boolean(errors.email)}
      />
      <PasswordField
        name="password"
        value={values.password}
        label="Password"
        type={passwordType ? "text" : "password"}
        handleClickPassword={handleClickPassword}
        handleChange={handleChange}
        handleBlur={handleBlur}
        helperText={touched.password ? errors.password : ""}
        errors={touched.password && Boolean(errors.password)}
      />
      <ButtonComponent handleClick={handleSubmit}>Login</ButtonComponent>
    </div>
  );
};

export default LoginPage;
