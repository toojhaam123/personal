import { Navigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    // nếu chưa login thì chuyển sang trang chủ
    return <Navigate to="http://localhost:5173/" replace></Navigate>;
  }
  // Nếu Login rồi thì cho render component con
  return children;
}

export default ProtectRoute;
