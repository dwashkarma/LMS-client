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
  fullname: "",
};

const loginSchema = yup.object().shape({
  email: yup.string().required("Please enter your email !"),
  password: yup.string().required("Please enter your password !"),
  fullname: yup.string().required("Please enter your name!"),
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
      <h2 className="text-center font-normal text-xl uppercase text-primary">
        Login Page
      </h2>
      <InputField
        name="fullname"
        value={values.fullname}
        label="Full Name"
        type="text"
        handleChange={handleChange}
        handleBlur={handleBlur}
        helperText={touched.fullname ? errors.fullname : ""}
        errors={touched.fullname && Boolean(errors.fullname)}
      />
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
      <div className="text-end grid gap-2">
        <ButtonComponent handleClick={handleSubmit}>Login</ButtonComponent>
        <div>
          <span className="text-end text-sky-800 hover:border-b cursor-pointer hover:border-b-sky-800 text-xs font-normal">
            Already have an account
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
