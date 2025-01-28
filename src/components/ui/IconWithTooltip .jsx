import React from "react";

const IconWithTooltip = ({ icon: Icon, tooltip }) => (
  <div className="relative group">
    <Icon
      size={24}
      className="text-gray-300 hover:text-blue-500 cursor-pointer"
    />
    <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-12 mb-2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-sm rounded-md px-2 py-1 shadow-lg transition-opacity duration-200 whitespace-nowrap">
      {tooltip}
    </span>
  </div>
);

export default IconWithTooltip;
