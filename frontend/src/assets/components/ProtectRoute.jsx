import { Navigate } from "react-router-dom";

function ProtectRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token");

  if (!isLoggedIn) {
    // nếu chưa login thì chuyển sang trang chủ
    return <Navigate to="/" replace></Navigate>;
  }
  // Nếu Login rồi thì cho render component con
  return children;
}

export default ProtectRoute;
