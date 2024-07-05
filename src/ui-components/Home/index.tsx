import React from "react";
import Header from "../Taskcomponent/header";
import TaskBox from "../Taskcomponent/taskbox";

const HomePage = () => {
  return (
    <main className="lg:px-24 px-6 py-12">
      <div className="flex flex-col ">
        <span className="font-medium lg:text-3xl text-lg text-gray-800">
          Task Scheduler 😊
        </span>
        <span className="font-normal lg:text-lg text-xs text-gray-600">
          Schedule and view your tasks here 📑
        </span>
      </div>
      <div className="lg:mx-10 -mx-3 mt-7">
        <Header />
        <TaskBox />
      </div>
    </main>
  );
};

export default HomePage;
