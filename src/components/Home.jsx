"use client";
import React, { useState } from "react";
import LeftSidebar from "./LeftSidebar";
import Card from "./ui/Card";
import Input from "./ui/Input";
import { GoPlus } from "react-icons/go";

const Home = () => {
  const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState("");



  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="flex-[2.5]">
        <LeftSidebar />
      </div>

      <div className="flex-[9.5] relative mx-14">
        <div>
          <Card />
        </div>

        <div className="absolute bottom-6 left-0 w-full flex justify-center">
          <Input
            type="text"
            placeholder="Enter the Task"
            className="bg-charcoal"
            icon={<GoPlus />}
            iconPosition="left"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
