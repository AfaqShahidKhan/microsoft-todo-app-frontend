'use client'
import React, { useState } from 'react'
import Input from "./ui/Input";
import { GoPlus } from "react-icons/go";
import { addNewTask } from "@/store/services/taskService";
import { setTasks } from "@/store/slices/taskSlice";
import { useDispatch } from 'react-redux';

const AddTask = ({tasks}) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);
    const dispatch = useDispatch();


    const handleSubmit = async () => {
        if (!title.trim()) return;
    
        const taskData = { title }; 
          try {
          const response = await addNewTask(taskData);
          console.log('i am here');
          
          const updatedTasks = [...tasks, response.task];
          dispatch(setTasks(updatedTasks));
          setTitle("");
        } catch (err) {
          setError("Failed to add task. Please try again.");
          console.error("Error adding task:", err);
        }
      };

  return (
    <div className="absolute bottom-6 left-0 w-full flex justify-center border border-gray-400 rounded-lg">
        <Input
          type="text"
          placeholder="Enter the Task"
          className="bg-charcoal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onSubmit={handleSubmit}
          icon={<GoPlus />}
          iconPosition="left"
        />
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </div>
  )
}

export default AddTask
