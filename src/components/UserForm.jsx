"use client";
import { updateUserData } from "@/store/services/userService";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./ui/Input";
import { Toaster, toast } from "react-hot-toast";

const UserForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [formError, setFormError] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        photo: user.photo,
      });
    }
  }, [user, reset]);
  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await updateUserData(data);
      toast.success("User updated successfully!");

      return result;
    } catch (error) {
      toast.error("Fail to update user!");

      setFormError(error.message);
    }
  };

  return (
    <>
      {" "}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-md mx-auto bg-background p-6 opacity-80 mt-10 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            name="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            onChange={(e) => setValue("name", e.target.value)}
            defaultValue={user?.name}
            error={errors.name?.message}
            className="text-dark"
          />
          <Input
            name="email"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            placeholder="Email"
            onChange={(e) => setValue("email", e.target.value)}
            defaultValue={user?.email}
            error={errors.email?.message}
            className="text-dark"
          />
          <Input
            name="photo"
            type="file"
            {...register("photo")}
            placeholder="Photo"
            error={errors.photo?.message}
          />

          {formError && (
            <span className="text-red-500 text-sm">{formError}</span>
          )}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-foreground bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update Me
          </button>
        </form>
      </div>{" "}
    </>
  );
};

export default UserForm;
