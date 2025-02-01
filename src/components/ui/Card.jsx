import React from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Card = ({ task, onClick }) => {
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
      <div className="z-10">
        {task.priority==='high' ? <FaStar /> : <FaRegStar />}
      </div>
    </div>
  );
};

export default Card;
