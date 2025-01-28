import React from "react";
import LeftSidebar from "./LeftSidebar";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex-[2.5]">
        <LeftSidebar />
      </div>
      <div className="flex-[9.5]">other thing</div>
    </div>
  );
};

export default Home;
