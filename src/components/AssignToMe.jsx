"use client";
import { useEffect, useState } from "react";
import Card from "./ui/Card";
import TaskDetailsSidebar from "./TaskDetailsSidebar";
import { useSelector, useDispatch } from "react-redux";
import { setAssignToMeTasks } from "@/store/slices/taskSlice";
import { fetchAssignToMeTasks } from "@/store/services/taskService";

const AssignToMe = () => {
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const tasksData = useSelector((state) => state.task.assignToMeTasks) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      
      try {
        const fetchedTasks = await fetchAssignToMeTasks();
        dispatch(setAssignToMeTasks(fetchedTasks.data.data));
        console.log(fetchedTasks.data.data); // This will show the raw fetched data.
        
      } catch (error) {
        setError("Error fetching tasks. Please try again later.");
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-foreground font-bold mb-4">
        Assign to Me Tasks
      </h1>
      <div className="space-y-2">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : tasksData.length > 0 ? (
          <div
            className="overflow-y-auto space-y-1"
            style={{
              maxHeight: "calc(100vh - 150px)",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onScroll={handleScroll}
          >
            {tasksData.map((task) => (
              <Card
                key={task._id}
                task={task}
                onClick={() => {
                  setIsSidebarOpen(false); // Close first
                  setTimeout(() => {
                    // Add slight delay for state update
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
              src="/icons/userTaskIcon.png"
              alt="checklist icon"
              width="100"
              height="100"
              title="checklist icon"
              className="mx-auto mb-4"
            />
            <h3 className="text-foreground text-xl font-semibold mb-2">
              Task assign to you will show here{" "}
            </h3>
          </div>
        )}
      </div>

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

export default AssignToMe;
