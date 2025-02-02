"use client";

import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { LuAlarmClock, LuSun } from "react-icons/lu";
import { PiCalculatorLight } from "react-icons/pi";
import { TbSunOff } from "react-icons/tb";
import { MdEventRepeat } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { removeTaskFromMyDay, setTasksToMyDay } from "@/store/slices/taskSlice";
import { useForm } from "react-hook-form";
import { updateTaskData } from "@/store/services/taskService";
import { Toaster, toast } from "react-hot-toast";

const TaskDetailsSidebar = ({ isOpen, onClose, task }) => {
  const dispatch = useDispatch();
  const myDayTasks = useSelector((state) => state.task.myDayTasks);
  const [showDueDate, setShowDueDate] = useState(false);
  const [showRecurring, setShowRecurring] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  if (!isOpen) return null;

  const handleAddToMyDay = () => {
    dispatch(setTasksToMyDay(task));
  };

  const handleRemoveFromMyDay = () => {
    dispatch(removeTaskFromMyDay(task._id));
  };

  const onSubmit = async (data) => {
    try {
      const result = await updateTaskData(task._id, data);
      toast.success("Task updated successfully!");
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
        className="fixed inset-0 bg-charcoal bg-opacity-50 z-40"
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
            className="my-2 w-[80%] outline-none p-2  border-charcoal bg-charcoal text-foreground rounded-md"
          />

          <div className="space-y-4">
            <div>
              {myDayTasks.includes(task) ? (
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
              <Button size="lg" variant="icon" icon={<LuAlarmClock />}>
                Remind me
              </Button>

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
                rows="4"
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
