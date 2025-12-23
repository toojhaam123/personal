import { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "./assets/components/Home";
import Navbar from "./assets/components/Navbar";
import Sidebar from "./assets/components/Sidebar";
import Login from "./assets/components/Login";
import Register from "./assets/components/Register";
import ProtectRoute from "./assets/components/ProtectRoute";
import useStatus from "./hooks/useStatus";
// Các pages
import Introduction from "./assets/components/pages/Introduction";
import Experience from "./assets/components/pages/Experience";
import Skill from "./assets/components/pages/Skill";
import Education from "./assets/components/pages/Education";
import Portfolio from "./assets/components/pages/Portfolio";
import PortfolioDetail from "./assets/components/pages/PortfolioDetail";
import Contact from "./assets/components/pages/Contact";
import Notification from "./assets/components/pages/Notification";
import Notification_Detail from "./assets/components/pages/Notification_Detail";
function App() {
  const token = localStorage.getItem("token");
  const { status, setStatus, visible, setVisible } = useStatus();
  const navigate = useNavigate();

  useEffect(() => {
    const checkExpire = () => {
      const token = localStorage.getItem("token");
      const expireAt = localStorage.getItem("expireAt");

      // nếu chưa login thì thôi
      if (!token || !expireAt) return;

      // Hết hạn login, logout ngay
      if (Date.now() > Number(expireAt)) {
        window.confirm("Hết thời gian đăng nhập, đăng nhập lại!");
        localStorage.removeItem("token");
        localStorage.removeItem("expireAt");
        navigate("/login");
      }
    };
    // Check thời gian đăng nhập khi App load
    checkExpire();

    const intervalId = setInterval(checkExpire, 1000);

    return () => clearInterval(intervalId);
  }, [navigate]);

  return (
    <>
      <div className="status">
        {status && (
          <div
            className={`mb-2 pl-4 rounded-lg transition-opacity duration-100 border flex justify-between items-center
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
      <div>
        <p>Home</p>
        <Home></Home>
      </div>
      <div className="flex h-screen">
        <div className="flex-[2] p-5 bg-gray-900 text-white flex flex-col items-center rounded-3xl overflow-y-auto scroll-hidden">
          <Sidebar token={token} setStatus={setStatus} />
        </div>
        <div className="flex-[8] p-5 bg-gray-900 rounded-3xl text-white ms-5  flex-row flex gap-5">
          <div className="flex-[2] border-r">
            <Navbar token={token} />
          </div>
          <div className="flex-[12] overflow-y-auto scroll-hidden p-1">
            <Routes>
              <Route
                path="/introductions"
                element={<Introduction token={token} setStatus={setStatus} />}
              />
              <Route
                path="/experience"
                element={<Experience token={token} setStatus={setStatus} />}
              />
              <Route
                path="/skill"
                element={<Skill token={token} setStatus={setStatus} />}
              />
              <Route
                path="/education"
                element={<Education token={token} setStatus={setStatus} />}
              />
              <Route
                path="/portfolio"
                element={<Portfolio token={token} setStatus={setStatus} />}
              />
              <Route
                path="/contact"
                element={<Contact setStatus={setStatus} />}
              />
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
                    token={token}
                    setStatus={setStatus}
                  ></PortfolioDetail>
                }
              ></Route>
              <Route
                path="/login"
                element={<Login setStatus={setStatus} />}
              ></Route>
              <Route path="/register" element={<Register />}></Route>
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
    </>
  );
}

export default App;
