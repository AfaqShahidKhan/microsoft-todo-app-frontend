"use client"; // Required for client-side interactivity

import React, { useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { LuAlarmClock } from "react-icons/lu";
import { PiCalculatorLight } from "react-icons/pi";
import { LuSun } from "react-icons/lu";
import { TbSunOff } from "react-icons/tb";
import { MdEventRepeat } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { removeTaskFromMyDay, setTasksToMyDay } from "@/store/slices/taskSlice";

const TaskDetailsSidebar = ({ isOpen, onClose, task }) => {
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [notes, setNotes] = useState(task?.notes || "");
  const dispatch = useDispatch();
  const myDayTasks = useSelector((state) => state.task.myDayTasks);

  if (!isOpen) return null;

  const handleAddToMyDay = (task) => {
    dispatch(setTasksToMyDay(task));
  };

  const handleRemoveFromMyDay = (task) => {
    dispatch(removeTaskFromMyDay(task._id));
  };

  return (
    <div
      className="fixed inset-0 bg-charcoal bg-opacity-50 z-40"
      onClick={onClose}
    >
      <div
        className="fixed right-0 top-0 h-full w-96 bg-charcoal shadow-lg p-6 z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-4 text-foreground"
        >
          <RxCross1 />{" "}
        </button>
        <h2 className="text-xl text-foreground font-semibold mb-4">
          {task?.title}
        </h2>
        <div className="space-y-4">
          <div>
            {myDayTasks.includes(task) ? (
              <Button
                size="lg"
                variant="icon"
                icon={<TbSunOff />}
                onClick={() => handleRemoveFromMyDay(task)}
              >
                Remove From My Day
              </Button>
            ) : (
              <Button
                size="lg"
                variant="icon"
                icon={<LuSun />}
                onClick={() => handleAddToMyDay(task)}
              >
                Add to My Day
              </Button>
            )}
          </div>
          <div className="space-y-1 bg-extragray rounded-md">
            <Button size="lg" variant="icon" icon={<LuAlarmClock />}>
              Remind me
            </Button>
            <div className="border-b border-grays max-w-[80%] mx-auto text-center"></div>

            <Button size="lg" variant="icon" icon={<PiCalculatorLight />}>
              Add Due Date
            </Button>
            <div className="border-b border-grays max-w-[80%] mx-auto text-center"></div>

            <Button size="lg" variant="icon" icon={<MdEventRepeat />}>
              Repeat
            </Button>
          </div>
          <div className="my-2">
            <Button size="lg" variant="icon" icon={<GrAttachment />}>
              Add file
            </Button>
          </div>

          {/* Due Date Input */}
          <div>
            <label className="block text-sm font-medium text-foreground">
              Due Date
            </label>
            <Input
              type="date"
              name="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 border border-gray-300 bg-charcoal text-foreground"
            />
          </div>

          {/* Notes Input */}
          <div>
            <textarea
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add note..."
              className="mt-1 w-full p-2 border border-gray-300 bg-charcoal text-foreground rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
              rows="4" // Adjust number of rows as needed
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsSidebar;
