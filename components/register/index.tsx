"use client";
import InputField from "../shared/InputField";
import { useState } from "react";
import PasswordField from "../shared/PasswordField";
import ButtonComponent from "../shared/ButtonComponent";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

const loginValues = {
  email: "",
  password: "",
  confirm: "",
  fullname: "",
};

const loginSchema = yup.object().shape({
  email: yup.string().required("Please enter your email !"),
  password: yup.string().required("Please enter your password !"),
  confirm: yup.string().required("Please enter your password !"),
  fullname: yup.string().required("Please enter your name!"),
});
const RegisterComponent = () => {
  const [passwordType, setPasswordType] = useState({
    password: false,
    confirm: false,
  });
  const router = useRouter();

  const {
    values,
    handleBlur,
    handleChange,
    touched,
    errors,
    handleSubmit,
    resetForm,
    setFieldError,
  } = useFormik({
    initialValues: loginValues,
    validationSchema: loginSchema,
    onSubmit: async () => {
      try {
        if (values.confirm === values.password) {
          const res = await axios.post("/api/auth/register", {
            email: values.email,
            name: values.fullname,
            password: values.password,
          });
          resetForm();
        } else {
          setFieldError("confirm", "Must be same as password");
        }
      } catch (errors: any) {
        return NextResponse.json({ message: errors.message }, { status: 500 });
      }
    },
  });
  const handleClickPassword = (fieldName: "password" | "confirm") => {
    setPasswordType((prev) => ({ ...prev, [fieldName]: !prev[fieldName] }));
  };

  return (
    <div className="shadow border w-[30%] shadow-slate-200 rounded-lg p-8  grid gap-8">
      <h2 className="text-center font-normal text-xl uppercase text-primary">
        Register Page
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
        type={passwordType.password ? "text" : "password"}
        handleClickPassword={(e: any) => handleClickPassword("password")}
        handleChange={handleChange}
        handleBlur={handleBlur}
        helperText={touched.password ? errors.password : ""}
        errors={touched.password && Boolean(errors.password)}
      />
      <PasswordField
        name="confirm"
        value={values.confirm}
        label="Confirm Password"
        type={passwordType.confirm ? "text" : "password"}
        handleClickPassword={() => handleClickPassword("confirm")}
        handleChange={handleChange}
        handleBlur={handleBlur}
        helperText={touched.confirm ? errors.confirm : ""}
        errors={touched.confirm && Boolean(errors.confirm)}
      />
      <div className="text-end grid gap-2">
        <ButtonComponent handleClick={handleSubmit}>Register</ButtonComponent>
        <div>
          <span
            onClick={() => router.push("/")}
            className="text-end text-sky-800 hover:border-b cursor-pointer hover:border-b-sky-800 text-xs font-normal"
          >
            Already have an account
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
