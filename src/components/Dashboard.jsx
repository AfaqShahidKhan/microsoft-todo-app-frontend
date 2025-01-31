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
        {tasks.length > 0 ? (
          tasks.map((task) => <Card key={task._id} task={task} />)
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgba(54,54,54,0.6)] p-6 rounded-lg text-center shadow-lg">
            <img
              src="/images/calenderMyDay.png"
              alt="Calendar Basic Accent Lineal Color icon"
              width="100"
              height="100"
              title="Calendar Basic Accent Lineal Color icon"
              className="mx-auto mb-4"
            />
            <h3 className="text-foreground text-xl font-semibold mb-2">
              Focus on your day
            </h3>
            <span className="text-foreground text-xs">
              Get things done with MY DAY,
              <br />a list that refreshes every day
            </span>
          </div>
        )}
      </div>

      <AddTask tasks={tasks} />
    </div>
  );
};

export default Dashboard;
