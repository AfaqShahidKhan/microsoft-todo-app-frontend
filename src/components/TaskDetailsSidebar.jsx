"use client";

import React, { useEffect, useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { LuAlarmClock, LuSun } from "react-icons/lu";
import { PiCalculatorLight } from "react-icons/pi";
import { TbSunOff } from "react-icons/tb";
import { MdEventRepeat } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  removeTaskFromMyDay,
  setTasksToMyDay,
  updateTaskInStore,
} from "@/store/slices/taskSlice";
import { useForm } from "react-hook-form";
import { updateTaskData } from "@/store/services/taskService";
import { Toaster, toast } from "react-hot-toast";

const TaskDetailsSidebar = ({ isOpen, onClose, task }) => {
  const dispatch = useDispatch();
  const myDayTasks = useSelector((state) => state.task.myDayTasks);
  const [showDueDate, setShowDueDate] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showRecurring, setShowRecurring] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(
    task?.reminder || ""
  );

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        dueDate: task.dueDate,
        recurring: task.recurring,
        description: task.description,
        reminder: task.reminder,
      });
      setSelectedReminder(task.reminder || ""); // Ensure initial reminder state
    }
  }, [task, reset]);

  if (!isOpen) return null;

  const handleAddToMyDay = () => {
    dispatch(setTasksToMyDay(task));
  };

  const handleRemoveFromMyDay = () => {
    dispatch(removeTaskFromMyDay(task._id));
  };


  const handleReminderChange = (e) => {
    const value = e.target.value;
    setSelectedReminder(value); 
    let reminderDate = new Date(); 
    if (value === "daily") {
      reminderDate.setHours(18, 0, 0, 0);
    } 
    else if (value === "tomorrow") {
      reminderDate.setDate(reminderDate.getDate() + 1);
      reminderDate.setHours(9, 0, 0, 0); // Set time to 9:00 AM
    } 
    else if (value === "monday") {
      const dayOfWeek = reminderDate.getDay(); // Get current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
      const daysUntilMonday = (1 - dayOfWeek + 7) % 7 || 7; // Calculate days until next Monday
      reminderDate.setDate(reminderDate.getDate() + daysUntilMonday);
      reminderDate.setHours(9, 0, 0, 0); // Set time to 9:00 AM
    } 
    // else {
    //   return; // Do nothing for "None" or "Custom"
    // }
  
    // Format the date for the datetime-local input (YYYY-MM-DDTHH:MM)
    const formattedDate = reminderDate.toISOString().slice(0, 16);
  
    // Update the form value
    setValue("reminder", formattedDate);
  };

  const onSubmit = async (data) => {
    try {
      const result = await updateTaskData(task._id, data);
      toast.success("Task updated successfully!");
      dispatch(updateTaskInStore(result.task));
      return result;
    } catch (error) {
      toast.error("Failed to update task.");
      console.error("Update Error:", error.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div
        className="fixed inset-0 bg-charcoal bg-opacity-50 z-40 overflow-auto"
        onClick={onClose}
      >
        <form
          className="fixed right-0 top-0 h-full w-96 bg-charcoal shadow-lg p-6 z-50"
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit(onSubmit)}
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-4 text-foreground"
          >
            <RxCross1 />
          </button>
          <Input
            type="text"
            defaultValue={task?.title}
            {...register("title")}
            onChange={(e) => setValue("title", e.target.value)}
            className="my-2 max-w-[60%] outline-none p-2  border-charcoal bg-charcoal text-foreground rounded-md"
          />

          <div className="space-y-4">
            <div>
              {myDayTasks.some((t) => t._id === task._id) ? (
                <Button
                  size="lg"
                  variant="icon"
                  icon={<TbSunOff />}
                  onClick={handleRemoveFromMyDay}
                >
                  Remove From My Day
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="icon"
                  icon={<LuSun />}
                  onClick={handleAddToMyDay}
                >
                  Add to My Day
                </Button>
              )}
            </div>

            <div className="space-y-1 bg-extragray rounded-md p-2">
              <Button
                size="lg"
                variant="icon"
                icon={<LuAlarmClock />}
                onClick={() => setShowReminder(!showReminder)}
              >
                Remind me
              </Button>
              {showReminder && (
                <>
                  <select
                    value={selectedReminder} // Make it controlled
                    onChange={handleReminderChange}
                    className="mt-2 w-full p-2 border border-gray-300 bg-charcoal text-foreground rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                  >
                    <option value="">None</option>
                    <option value="daily">Daily at 6 PM</option>
                    <option value="tomorrow">Tomorrow at 9 AM</option>
                    <option value="monday">Monday at 9 AM</option>
                    <option value="custom">Set Custom</option>
                  </select>

                  {selectedReminder === "custom" && (
                    <input
                      type="datetime-local"
                      value={task?.reminder} // Ensure value is controlled here as well
                      onChange={(e) => setValue("reminder", e.target.value)}
                      {...register("reminder")}
                      className="mt-2 w-full border border-gray-300 bg-charcoal text-foreground p-2 rounded-md"
                    />
                  )}
                </>

              )}
              {/* Due Date Input with Toggle */}
              <Button
                size="lg"
                variant="icon"
                icon={<PiCalculatorLight />}
                onClick={() => setShowDueDate(!showDueDate)}
              >
                Add Due Date
              </Button>
              {showDueDate && (
                <Input
                  type="date"
                  defaultValue={task?.dueDate}
                  onChange={(e) => setValue("dueDate", e.target.value)}
                  {...register("dueDate")}
                  className="mt-2 w-full border border-gray-300 bg-charcoal text-foreground p-2 rounded-md"
                />
              )}

              {/* Recurring Dropdown with Toggle */}
              <Button
                size="lg"
                variant="icon"
                icon={<MdEventRepeat />}
                onClick={() => setShowRecurring(!showRecurring)}
              >
                Repeat
              </Button>
              {showRecurring && (
                <select
                  defaultValue={task?.recurring}
                  onChange={(e) => setValue("recurring", e.target.value)}
                  {...register("recurring")}
                  className="mt-2 w-full p-2 border border-gray-300 bg-charcoal text-foreground rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  <option value="none">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              )}
            </div>

            <div>
              <textarea
                defaultValue={task?.description}
                onChange={(e) => setValue("description", e.target.value)}
                {...register("description")}
                placeholder="Add note..."
                className="mt-1 w-full p-2 border border-gray-300 bg-charcoal text-foreground rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                rows="2"
              ></textarea>
            </div>
          </div>
          <Button
            type="submit"
            size="lg"
            className="w-full items-center justify-center"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default TaskDetailsSidebar;
