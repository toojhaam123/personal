import React from "react";
import Logout from "./Logout";
import { NavLink } from "react-router-dom";
function Sidebar() {
  const isLoggedIn = localStorage.getItem("token"); // Lấy token ra
  return (
    <div className="text-center max-vh-100">
      <div className="infomation">
        <img
          src="../../../public/1696433119267khunghinh.net.png"
          alt="Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold">Hạng A Tùng</h2>
        <p className="text-gray-400">Lập trình viên Web Fullstack (Fresher)</p>
        <div className="mt-4 space-y-2 text-sm text-start">
          <p>
            <i className="fa-solid fa-cake-candles"></i> Năm sinh: 11/6/2000
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> Email:{" "}
            <a href="mailto:toojhaam123@gmail.comm">toojhaam123@gmail.com</a>
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> Phone:{" "}
            <a href="tel:0345-312-083">0345-312-083</a>
          </p>
          <p>
            <i className="fa-solid fa-location-dot"></i> Địa chỉ:{" "}
            <a href="https://maps.app.goo.gl/A374C8vxKxbDYLqV9" target="_blank">
              Sín Chải - Điện Biên
            </a>
          </p>
          <p>
            <i className="fa-brands fa-github"></i> Github:{" "}
            <a href="https://github.com/toojhaam123" target="_blank">
              github.com/toojhaam123
            </a>
          </p>
        </div>
        <div className="mt-5">
          {!isLoggedIn && (
            <div className="login">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hover:text-white bg-blue-600 py-2 px-4 rounded mt-5 ${
                    isActive
                      ? "text-white "
                      : "bg-blue-600 text-white rounded w-100 p-2"
                  }`
                }
              >
                Đăng nhập
              </NavLink>
            </div>
          )}
        </div>
        {isLoggedIn && <Logout />}
      </div>
    </div>
  );
}

export default Sidebar;
