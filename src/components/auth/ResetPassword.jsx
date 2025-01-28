"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import { resetUserPassword } from "@/store/services/authService";
import { useParams } from "next/navigation";
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [formError, setFormError] = useState("");
  const { token } = useParams();

  
  console.log(`token is ${token}`);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await resetUserPassword(token, data);
      return result;
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background p-6 opacity-80 mt-10 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          name="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          placeholder="Password"
          error={errors.password?.message}
        />
        <Input
          name="passwordConfirm"
          type="Password"
          {...register("passwordConfirm", {
            required: "PasswordConfirm is required",
            minLength: {
              value: 6,
              message: "PasswordConfirm must be at least 6 characters",
            },
            validate: (value) => {
              const { password } = getValues();
              return password === value || "Passwords do not match";
            },
          })}
          placeholder="Confirm Password"
          error={errors.passwordConfirm?.message}
        />
        {formError && <span className="text-red-500 text-sm">{formError}</span>}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-foreground bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
