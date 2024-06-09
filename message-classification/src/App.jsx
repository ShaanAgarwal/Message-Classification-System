import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import MessageRouting from "./pages/MessageRouting";
import DepartmentDashboard from "./pages/DepartmentDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/message-routing" element={<MessageRouting />} />
        <Route path="/department/:id" element={<DepartmentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
