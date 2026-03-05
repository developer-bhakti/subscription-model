import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PublicationPages from "./pages/PublicationPages";
import Login from "./pages/Login";

const App = () => {
  return (
    // <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/pages" element={<PublicationPages />} />
      </Routes>
    // </Router>
  );
};

export default App;
