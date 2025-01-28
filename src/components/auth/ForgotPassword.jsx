"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import { sendResetPasswordEmail } from "@/store/services/authService";
import Link from "next/link";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data) => {    
    try {
     const result =  await sendResetPasswordEmail(data);
      setSuccessMessage(
        "If an account with this email exists, we have sent a password reset link."
      );
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background p-6 opacity-80 mt-10 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center text-foreground mb-4">
          Forgot Password
        </h2>

        <Input
          name="email"
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Enter your email"
          error={errors.email?.message}
        />

        {formError && <span className="text-red-500 text-sm">{formError}</span>}
        {successMessage && (
          <span className="text-green-500 text-sm">{successMessage}</span>
        )}

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-foreground bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Send Reset Link
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm text-foreground">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-blue-500 font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
