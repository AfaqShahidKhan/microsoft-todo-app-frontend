"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../ui/Input";
import { login } from "@/store/services/authService";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await login(data);
      router.push('/')
      return result;
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-background p-6 opacity-80 mt-10 rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          name="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          error={errors.email?.message}
        />
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
        {formError && <span className="text-red-500 text-sm">{formError}</span>}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-foreground bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm text-foreground">
            Have not any account?{" "}
            <Link
              href="/signup"
              className="text-blue-500 font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <p className="text-sm text-foreground mt-2">
            <Link
              href="/forgot-password"
              className="text-blue-500 font-bold hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => alert("Continue with Google clicked!")}
            className="flex items-center justify-center w-full bg-foreground text-black text-lg py-2 rounded-md hover:text-blue-600 hover:font-semibold focus:outline-none"
          >
            <FcGoogle className="mr-2 size-8" /> Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
