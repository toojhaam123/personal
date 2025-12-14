import React from "react";
import axios from "axios";
function Logout(isLogedIn) {
  const handleLogout = async () => {
    if (!isLogedIn) {
      alert("Bạn chưa đăng nhập!");
      return;
    }
    localStorage.removeItem("token");
    console.log("TOKEN LOGOUT:", isLogedIn);
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${isLogedIn}`,
            Accept: "application/json",
          },
        }
      );

      // Xóa token khỏi localStorage
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
      <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
    </button>
  );
}

export default Logout;
