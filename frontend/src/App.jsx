import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Home from "./assets/pages/Home";
import Experience from "./assets/pages/Experience";
import Skill from "./assets/pages/Skill";
import Education from "./assets/pages/Education";
import Portfolio from "./assets/pages/Portfolio";
import Sidebar from "./assets/components/Sidebar";
import Contact from "./assets/pages/Contact";

function App() {
  return (
    <div className="flex h-screen">
      {/* Cột trái (3/10) */}
      <div className="flex-[3] bg-gray-900 text-white p-6 flex flex-col items-center">
        <Sidebar />
      </div>

      {/* Cột phải (7/10) */}
      <div className="flex-[7] p-8 overflow-y-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skill" element={<Skill />} />
          <Route path="/education" element={<Education />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
