import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const isLoggedIn = localStorage.getItem("token");
  return (
    <nav className="flex flex-col text-start gap-6  pb-2">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : " "}`
        }
      >
        <i className="fas fa-home"></i> Trang chủ
      </NavLink>
      <NavLink
        to="/experience"
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : " "}`
        }
      >
        <i className="fas fa-briefcase"></i> Kinh nghiệm
      </NavLink>
      <NavLink
        to="/skill"
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : " "}`
        }
      >
        <i className="fas fa-code"></i> Kỹ năng
      </NavLink>
      <NavLink
        to="/education"
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : " "}`
        }
      >
        <i className="fas fa-graduation-cap"></i> Học vấn
      </NavLink>
      <NavLink
        to="/portfolio"
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : " "}`
        }
      >
        <i className="fas fa-folder-open"></i> Dự án
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : " "}`
        }
      >
        <i className="fas fa-envelope"></i> Liên hệ
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`
          }
        >
          <i className="fas fa-bell"></i> Thông báo
        </NavLink>
      )}
    </nav>
  );
}

export default Navbar;
