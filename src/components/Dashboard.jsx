"use client";
import React from "react";
import Card from "./ui/Card";
import { useSelector } from "react-redux";
import AddTask from "./AddTask";

const Dashboard = () => {
  const tasks = useSelector((state) => state.task.tasks) || [];

  return (
    <div>
      <div className="space-y-2">
        {tasks && tasks.map((task) => <Card key={task._id} task={task} />)}
      </div>

      <AddTask tasks={tasks} />
    </div>
  );
};

export default Dashboard;
