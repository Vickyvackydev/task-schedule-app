import React from "react";

import ViewBox from "./viewbox";
import { useSearchParams } from "react-router-dom";

const ViewPage = () => {
  const [urlParams] = useSearchParams();
  const taskId = urlParams.get("idref");
  return (
    <main className="lg:px-24 px-9 py-12 ">
      <span className="font-medium text-3xl text-gray-800">
        Task details 📄
      </span>
      <ViewBox taskId={taskId} />
    </main>
  );
};

export default ViewPage;
