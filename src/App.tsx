import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./ui-components/Home";
import ViewPage from "./ui-components/viewpage";
import { Toaster } from "react-hot-toast";
import Preloader from "./ui-components/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Routes>
        <Route element={loading ? <Preloader /> : <HomePage />} path="/" />
        <Route element={<ViewPage />} path="/viewtask" />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
