import { updateTaskData } from "@/store/services/taskService";
import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateTaskInStore } from "@/store/slices/taskSlice";

const Card = ({ task, onClick }) => {
  const dispatch = useDispatch();

  const togglePriority = async (task) => {
    console.log("ia amm");

    const updatedTask = {
      ...task,
      priority: task.priority === "high" ? "low" : "high",
    };

    try {
      const result = await updateTaskData(task._id, updatedTask);
      toast.success("Task updated successfully!");
      dispatch(updateTaskInStore(result.task));
      return result;
    } catch (error) {
      toast.error("Failed to update task.");
      console.error("Update Error:", error.message);
    }
  };
  return (
    <div
      className="bg-charcoal p-4 border border-gray-500 rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-800 transition"
      onClick={onClick}
    >
      <div className="">
        <div className="font-medium text-foreground">{task.title}</div>
        {task.dueDate && (
          <div className="text-sm text-foreground">Due: {task.dueDate}</div>
        )}
      </div>
      <div
        className="z-10"
        onClick={(e) => {
          e.stopPropagation(); // Prevents modal from opening
          togglePriority(task); // Function to update priority
        }}
      >
        {task.priority === "high" ? <FaStar /> : <FaRegStar />}
      </div>
    </div>
  );
};

export default Card;
