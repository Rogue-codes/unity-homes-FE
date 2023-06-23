"use client";
import React, { useState } from "react";
import { welcome } from "../../../public/assets";
import Image from "next/image";
import Link from "next/link";
import { FormValues } from "@/app/interface/formInterface";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
interface Authprops {
  type: string;
}

export default function Auth({ type }: Authprops) {
  const [formData, setFormdata] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Clear the error message for the input being changed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const isValidEmail = (email: string) => {
    // Perform email validation using regular expressions or any other method
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    // let isValid = true;
    const { name, email, password, confirmPassword } = formData;
    const errors: FormValues = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!name) {
      errors.name = "Name is required";
      // isValid = false;
    }

    if (!password) {
      errors.password = "Password is required";
      // isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
      // isValid = false;
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Confirm password must match with Password";
    }

    if (!email) {
      errors.email = "Email is required";
      // isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email format";
      // isValid = false;
    }

    setErrors(errors);
    return errors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      // Clear the form values
      setFormdata({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setErrors(validationErrors);
    }
  };

  // password vissibility

  const [passwordType, setPasswordType] = useState<string>("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState<string>("password");

  return (
    <div className="w-full h-full lg:h-screen flex">
      <div className="w-full  p-3 lg:p-0 lg:w-[50%] mt-8 h-full flex flex-col justify-center items-center bg-white">
        <p className="text-lg lg:text-2xl font-bold text-primary text-center">
          Welcome {type === "sign-in" ? "Back" : "To Unity Homes"}
        </p>
        <p className="text-center text-xs text-secondary">
          Please {type} your Account.
        </p>
        <form
          action=""
          className="mx-auto mt-4 lg:mt-8 w-full"
          onSubmit={handleSubmit}
        >
          {type === "sign-up" && (
            <div className="mx-auto w-full lg:w-[22rem]">
              <label
                htmlFor=""
                className="block text-sm text-primary font-medium"
              >
                Name
              </label>
              <input
                type="text"
                className="w-full lg:w-[22rem] h-[2.8rem] border border-[#E4E4E4] focus:outline-none pl-2 text-md leading-6 text-primary rounded-[10px] "
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <div className="text-red-500 text-xs">{errors.name}</div>
              )}
            </div>
          )}

          <div className="mx-auto w-full lg:w-[22rem] mt-4">
            <label
              htmlFor=""
              className="block  text-sm text-primary  font-medium"
            >
              Email
            </label>
            <input
              type="text"
              className="w-full lg:w-[22rem] h-[2.8rem] border  border-[#E4E4E4] focus:outline-none pl-2 rounded-[10px] text-md leading-6 text-primary "
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="text-red-500 text-xs">{errors.email}</div>
            )}
          </div>

          <div className="mx-auto relative w-full lg:w-[22rem] mt-4">
            <label
              htmlFor=""
              className="block  text-sm text-primary  font-medium"
            >
              Password
            </label>
            <input
              type={passwordType}
              className="w-full lg:w-[22rem] h-[2.8rem] border  border-[#E4E4E4] focus:outline-none pl-2 rounded-[10px] text-md leading-6 text-primary"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />

            {passwordType === "password" ? (
              <AiFillEye
                className="absolute text-primary right-2 top-9 cursor-pointer"
                onClick={() =>
                  setPasswordType(
                    passwordType === "password" ? "text" : "password"
                  )
                }
              />
            ) : (
              <AiFillEyeInvisible
                className="absolute text-primary right-2 top-9 cursor-pointer"
                onClick={() =>
                  setPasswordType(
                    passwordType === "password" ? "text" : "password"
                  )
                }
              />
            )}
            {errors.password && (
              <div className="text-red-500 text-xs">{errors.password}</div>
            )}
          </div>

          {type === "sign-up" && (
            <div className="mx-auto w-full relative lg:w-[22rem] mt-4">
              <label
                htmlFor=""
                className="block text-sm text-primary  font-medium"
              >
                Confirm Password
              </label>
              <input
                type={confirmPasswordType}
                className="w-full lg:w-[22rem] h-[2.8rem] border border-[#E4E4E4] focus:outline-none pl-2  rounded-[10px] text-md leading-6 text-primary"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {passwordType === "password" ? (
              <AiFillEye
                className="absolute text-primary right-2 top-9 cursor-pointer"
                onClick={() =>
                  setConfirmPasswordType(
                    confirmPasswordType === "password" ? "text" : "password"
                  )
                }
              />
            ) : (
              <AiFillEyeInvisible
                className="absolute text-primary right-2 top-9 cursor-pointer"
                onClick={() =>
                  setConfirmPasswordType(
                    confirmPasswordType === "password" ? "text" : "password"
                  )
                }
              />
            )}
              {errors.confirmPassword && (
                <div className="text-red-500 text-xs">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
          )}

          <div className="flex mt-3 justify-between items-center w-full lg:w-[22rem] mx-auto">
            <div className="flex gap-2  items-center">
              <div className="w-3 h-3 rounded-sm border border-blue"></div>
              <p className="text-sm font-medium">Remember for 30 days</p>
            </div>

            <p className="leading-[22px] text-blue text-sm font-medium">
              Forgot Password
            </p>
          </div>

          <button className="w-full lg:w-[22rem] mx-auto flex justify-center py-3 text-white mt-5 bg-blue rounded-[10px]">
            Sign up
          </button>
        </form>

        {type === "sign-in" ? (
          <p className="text-sm text-secondary mt-3">
            Don’t have an account?{" "}
            <span className="text-blue font">
              <Link href="/sign-up">Sign up</Link>
            </span>
          </p>
        ) : (
          <p className="text-sm text-secondary mt-3">
            Already have an account?{" "}
            <span className="text-blue font">
              <Link href="/sign-in">Sign in</Link>
            </span>
          </p>
        )}
      </div>

      <div className="w-[50%] fixed right-0 top-0 hidden lg:block h-full">
        <Image className="w-full h-full object-cover" src={welcome} alt="" />
      </div>
    </div>
  );
}
