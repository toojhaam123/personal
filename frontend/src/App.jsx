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
import Notification from "./assets/pages/Notification";

function App() {
  return (
    <div className="flex h-screen">
      <div className="flex-[2] p-5 bg-gray-900 text-white flex flex-col items-center rounded-3xl">
        <Sidebar />
      </div>

      <div className="flex-[8] p-5 bg-gray-900 rounded-3xl text-white ms-5  flex-row flex gap-5">
        <div className="flex-[2] border-r">
          <Navbar />
        </div>
        <div className="flex-[12] overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skill" element={<Skill />} />
            <Route path="/education" element={<Education />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/notification" element={<Notification />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
