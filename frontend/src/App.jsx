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
import Notification_Detail from "./assets/pages/Notification_Detail";
import Login from "./assets/components/Login";
import Register from "./assets/components/Register";
import Logout from "./assets/components/Logout";
import ProtectRoute from "./assets/components/ProtectRoute";
import PortfolioDetail from "./assets/pages/PortfolioDetail";

function App() {
  return (
    <div className="flex h-screen">
      <div className="flex-[2] p-5 bg-gray-900 text-white flex flex-col items-center rounded-3xl overflow-y-auto scroll-hidden">
        <Sidebar />
      </div>

      <div className="flex-[8] p-5 bg-gray-900 rounded-3xl text-white ms-5  flex-row flex gap-5">
        <div className="flex-[2] border-r">
          <Navbar />
        </div>
        <div className="flex-[12] overflow-y-auto scroll-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skill" element={<Skill />} />
            <Route path="/education" element={<Education />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            {/* Nếu chưa login thì ko thể vào được qua đường link */}
            <Route
              path="/notifications"
              element={
                <ProtectRoute>
                  <Notification />
                </ProtectRoute>
              }
            />
            <Route
              path="/portfolio_detail/:id"
              element={<PortfolioDetail></PortfolioDetail>}
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            {/* <Route path="/register" element={<Register />}></Route>  */}
            <Route path="/logout" element={<Logout />}></Route>
            <Route
              path="/notification_detail/:id"
              element={
                <ProtectRoute>
                  <Notification_Detail />
                </ProtectRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
