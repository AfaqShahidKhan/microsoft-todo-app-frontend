import React from "react";

const Card = ({ task, onClick }) => {
  return (
    <div
      className="bg-charcoal p-4 border border-gray-500 rounded-lg shadow-md flex justify-between items-center cursor-pointer hover:bg-gray-800 transition"
      onClick={onClick}
    >
      <div>
        <div className="font-medium text-foreground">{task.title}</div>
        {task.dueDate && (
          <div className="text-sm text-foreground">Due: {task.dueDate}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
