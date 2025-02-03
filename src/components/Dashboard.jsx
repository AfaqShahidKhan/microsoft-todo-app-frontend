"use client";
import React, { useState } from "react";
import Card from "./ui/Card";
import { useSelector } from "react-redux";
import AddTask from "./AddTask";
import TaskDetailsSidebar from "./TaskDetailsSidebar";

const Dashboard = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const myDayTasks = useSelector((state) => state.task.myDayTasks) || [];
  console.log("my day tasks", myDayTasks.length, myDayTasks);
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
  };
  return (
    <div>
      <div className="space-y-2 mt-4">
        {myDayTasks.length > 0 ? (
          <div
            className="overflow-y-auto space-y-1"
            style={{
              maxHeight: "calc(100vh - 150px)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onScroll={handleScroll}
          >
            {myDayTasks.map((task) => (
              <Card
                key={task._id}
                task={task}
                onClick={() => {
                  setIsSidebarOpen(false); // Close first
                  setTimeout(() => { // Add slight delay for state update
                    setSelectedTask(task);
                    setIsSidebarOpen(true);
                  }, 50);
                }}
                
              />
            ))}
          </div>
        ) : (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgba(54,54,54,0.6)] p-6 rounded-lg text-center shadow-lg">
            <img
              src="/icons/calenderMyDayIcon.png"
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

      <AddTask myDayTasks={myDayTasks} />
      <TaskDetailsSidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
      />
    </div>
  );
};

export default Dashboard;
