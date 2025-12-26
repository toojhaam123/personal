import { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import useStatus from "./hooks/useStatus";
import Home from "./assets/components/Home";
import Users from "./assets/components/Users";
import Login from "./assets/components/Login";
import Register from "./assets/components/Register";

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
            className={`pl-4 rounded-lg transition-opacity duration-100 border flex justify-between items-center
            ${visible ? "opacity-100" : "opacity-0"} ${
              status.type === "success"
                ? "bg-green-100 text-green-700 font-bold"
                : "bg-red-100 text-red-700 font-bold"
            }`}
          >
            <div className="me-2">
              {status.type == "success" ? (
                <i className="text-3xl fa-regular fa-circle-check"></i>
              ) : (
                <i class="text-3xl fa-solid fa-xmark"></i>
              )}
            </div>
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
      <div className="home flex justify-center">
        <Routes>
          <Route path="/" element={<Home token={token} />} />
          <Route
            path="/:username/*"
            element={<Users token={token} setStatus={setStatus} />}
          />
          <Route
            path="/login"
            element={<Login setStatus={setStatus} />}
          ></Route>
          <Route path="register" element={<Register />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
