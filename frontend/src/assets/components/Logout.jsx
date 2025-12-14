import React from "react";
import axios from "axios";
function Logout() {
  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
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
      alert("Có lỗi khi đăng xuất!");
    } finally {
      // Xóa token khỏi localStorage
      localStorage.removeItem("token");
      alert("Đăng xuất thành công!");
      window.location.href = "/"; // Chuyển về trang chủ
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
