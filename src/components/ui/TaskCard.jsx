import React from "react";

const TaskCard = ({ task }) => {
  return (
    <div className="bg-charcoal text-white rounded-md shadow-lg p-4 w-64 mr-4 flex-shrink-0">
      <h4 className="font-semibold">{task.title}</h4>
    </div>
  );
};

export default TaskCard;
