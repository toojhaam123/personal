import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Logout({ setStatus }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Có lỗi khi đăng xuất!",
      });
    } finally {
      // Xóa token khỏi localStorage
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      setStatus({
        type: "success",
        message: "Đã đăng xuất!",
      });
      navigate("/"); // Chuyển về trang chủ
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded mt-5"
    >
      <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
    </button>
  );
}

export default Logout;
