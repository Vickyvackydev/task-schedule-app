import React from "react";
import "./preloader.css";
function Preloader() {
  return (
    <div className="preloader flex flex-col gap-2">
      <div className="spinner"></div>
      <p className="lg:text-xl text-sm font-medium text-gray-500">Loading...</p>
    </div>
  );
}

export default Preloader;
