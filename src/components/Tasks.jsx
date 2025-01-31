'use client'
import { useEffect, useState } from "react";
import { fetchAllTasks } from "@/store/services/taskService";
import Card from "./ui/Card";
import TaskDetailsSidebar from "./TaskDetailsSidebar";
import AddTask from "./AddTask";
import { useSelector, useDispatch } from "react-redux";
import { setTasks } from "@/store/slices/taskSlice"; // Import your slice action

const Tasks = () => {
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const tasksData = useSelector((state) => state.task.tasks) || []; // tasks from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await fetchAllTasks();
        dispatch(setTasks(fetchedTasks.data.data)); // Dispatch to Redux store
      } catch (error) {
        setError("Error fetching tasks. Please try again later.");
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [dispatch]); // Added dispatch as dependency

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-foreground font-bold mb-4">My Tasks</h1>
      <div className="space-y-2">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          tasksData &&
          tasksData.map((task) => (
            <Card
              key={task._id}
              task={task}
              onClick={() => handleTaskClick(task)}
            />
          ))
        )}
      </div>
      <AddTask tasks={tasksData}/>

      <TaskDetailsSidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        task={selectedTask}
      />
    </div>
  );
};

export default Tasks;
