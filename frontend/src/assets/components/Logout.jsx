import axiosInstance from "../../config/axios";
import { useNavigate } from "react-router-dom";
function Logout({ setStatus }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const handleLogout = async () => {
    if (!token) {
      setStatus({
        type: "error",
        message: "Bạn chưa đăng nhập!",
      });
    }
    try {
      await axiosInstance.post("auth/logout");
    } catch (error) {
      console.error(error);
      setStatus({
        type: "error",
        message: "Có lỗi khi đăng xuất!",
      });
    } finally {
      // Xóa token khỏi localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("expireAt");
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
      className="w-100 bg-red-600 text-white rounded duration-500 hover:bg-red-700 transition"
    >
      <i className="fa-solid fa-right-from-bracket"></i> Đăng xuất
    </button>
  );
}

export default Logout;
