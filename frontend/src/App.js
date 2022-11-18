import React, { useState, useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
function App() {
  const [username, setUserName] = useState("");
  useEffect(async () => {
    setUserName(await JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  const [currentId, setCurrentId] = useState(0);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/*"
          element={<Home currentId={currentId} setCurrentId={setCurrentId} />}
        />
      </Routes>
    </div>
  );
}

export default App;
