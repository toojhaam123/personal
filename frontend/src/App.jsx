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
        window.confirm("Hết phiên đăng nhập, mời đăng nhập lại!");
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
      <div className="fixed shrink-0 top-5 left-1/2 -translate-x-1/2 z-50 min-w-[320px] w-auto">
        {status && (
          <div
            className={`ralative rounded-xl overflow-hidden shadow-2xl border transition-all duration-500 transform
            ${
              visible
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "-translate-y-20 opacity-0 pointer-events-none"
            } ${
              status.type === "success"
                ? "bg-white dark:bg-slate-900 border-green-200 dark:border-green-900"
                : "bg-white dark:bg-slate-900 border-red-200 dark:border-red-900"
            }`}
          >
            <div className="flex items-center gap-4 p-4">
              {/* icon nền tròn */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  status.type === "success"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {status.type === "success" ? (
                  <i className="text-xl fa-regular fa-circle-check"></i>
                ) : (
                  <i className="text-xl fa-solid fa-circle-exclamation"></i>
                )}
              </div>
              {/* Nội dung tin nhắn */}
              <div className="flex-1 text-satrt">
                <p
                  className={`font-bold text-sm ${
                    status.type === "success"
                      ? "text-green-800 dark:text-green-400"
                      : "text-red-800 dark:text-red-400"
                  } `}
                >
                  {status.type === "success" ? "Thành công!" : "Có lỗi xảy ra!"}
                </p>
                <p className="text-slate-500 dark:text-slate-500 text-xs leading-tight">
                  {status.message}
                </p>
              </div>
              {/* Nút đóng */}
              <button
                onClick={() => setVisible(false)}
                className="text-slate-400 hover:text-slate-600 dark:bg-slate-200 dark:hover:text-slate-200 transition-colors p-1"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            {/* Thanh progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-slate-100 dark:bg-slate-800">
              <div
                className={`h-full transition-all duration-[5000ms] linear ${
                  status.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
                style={{ width: visible ? "0%" : "100%" }}
              ></div>
            </div>
          </div>
        )}
      </div>
      {/* Nơi hiện thị các giao diện trỏ tới */}
      <div className="home flex justify-center overflow-hidden">
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
