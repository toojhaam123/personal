import React from "react";
import axios from "axios";
function Logout() {
  const handleLogout = async () => {
    const token = localStorage.getItem("token"); // Lấy token hiện tại
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
          },
        }
      );

      // Xóa token khỏi localStorage
      localStorage.removeItem("token");
      alert("Đăng xuất thành công!");
      window.location.href = "/"; // Chuyển về trang chủ
    } catch (error) {
      console.error(error);
      alert("Có lỗi khi đăng xuất!");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-2 px-4 rounded mt-5"
    >
      Đăng xuất
    </button>
  );
}

export default Logout;
