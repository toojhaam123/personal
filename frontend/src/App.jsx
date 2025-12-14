import { React, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./assets/components/Navbar";
import Sidebar from "./assets/components/Sidebar";
import Login from "./assets/components/Login";
// import Register from "./assets/components/Register";
import Logout from "./assets/components/Logout";
import ProtectRoute from "./assets/components/ProtectRoute";
import useStatus from "./assets/hooks/useStatus";
// Các pages
import Home from "./assets/components/pages/Home";
import Experience from "./assets/components/pages/Experience";
import Skill from "./assets/components/pages/Skill";
import Education from "./assets/components/pages/Education";
import Portfolio from "./assets/components/pages/Portfolio";
import PortfolioDetail from "./assets/components/pages/PortfolioDetail";
import Contact from "./assets/components/pages/Contact";
import Notification from "./assets/components/pages/Notification";
import Notification_Detail from "./assets/components/pages/Notification_Detail";
function App() {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const isLogedIn = localStorage.getItem("token");
  const { status, setStatus, visible, setVisible } = useStatus();
  const [addMode, setAddMode] = useState(false);
  return (
    <>
      <div className="status">
        {status && (
          <div
            className={`mb-2 pl-2 rounded-lg transition-opacity duration-100 border flex justify-between items-center
            ${visible ? "opacity-100" : "opacity-0"} ${
              status.type === "success"
                ? "bg-green-100 text-green-700 font-bold"
                : "bg-red-100 text-red-700 font-bold"
            }`}
          >
            <span>{status.message}</span>
            <button
              onClick={() => setVisible(false)}
              className={`fonlt-bolt text-black hover:text-red-500 transition duration-500 float-end ${
                status.type === "success" ? "bg-green-100" : "bg-red-100"
              } border-0 hover:border-0`}
            >
              <i className="fa-regular fa-circle-xmark text-xl"></i>
            </button>
          </div>
        )}
      </div>
      <div className="flex h-screen">
        <div className="flex-[2] p-5 bg-gray-900 text-white flex flex-col items-center rounded-3xl overflow-y-auto scroll-hidden">
          <Sidebar setStatus={setStatus} />
        </div>
        <div className="flex-[8] p-5 bg-gray-900 rounded-3xl text-white ms-5  flex-row flex gap-5">
          <div className="flex-[2] border-r">
            <Navbar />
          </div>
          <div className="flex-[12] overflow-y-auto scroll-hidden">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    loading={loading}
                    setLoading={setLoading}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    isLogedIn={isLogedIn}
                    setStatus={setStatus}
                    addMode={addMode}
                    setAddMode={setAddMode}
                  />
                }
              />
              <Route
                path="/experience"
                element={
                  <Experience
                    loading={loading}
                    setLoading={setLoading}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    isLogedIn={isLogedIn}
                    setStatus={setStatus}
                    addMode={addMode}
                    setAddMode={setAddMode}
                  />
                }
              />
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
                element={
                  <PortfolioDetail
                    loading={loading}
                    setLoading={setLoading}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    isLogedIn={isLogedIn}
                    setStatus={setStatus}
                  ></PortfolioDetail>
                }
              ></Route>
              <Route path="/login" element={<Login />}></Route>
              {/* <Route path="/register" element={<Register />}></Route>  */}
              <Route path="/logout" element={<Logout />}></Route>
              <Route
                path="/notification_detail/:id"
                element={
                  <ProtectRoute>
                    <Notification_Detail
                      loading={loading}
                      setLoading={setLoading}
                      editMode={editMode}
                      setEditMode={setEditMode}
                      isLogedIn={isLogedIn}
                      setStatus={setStatus}
                      addMode={addMode}
                      setAddMode={setAddMode}
                    />
                  </ProtectRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
