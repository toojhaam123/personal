import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axiosPublic from "@/utils/axiosPublic";

function Login({ setStatus }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/"; // Lấy state vị trị đã lưu để quay lại

  const minPw = 6;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isDisabled =
    loading ||
    !email ||
    !emailRegex.test(email) ||
    !password ||
    password.length < minPw;
  const handleChangeLogin = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }

    const currentPassword = name === "password" ? value : password;
    const currentEmail = name === "email" ? value : email;

    // Validate
    if (!currentEmail) {
      setError("Nhập đầy đủ email!");
      return;
    }
    if (!emailRegex.test(currentEmail)) {
      setError("Nhập đúng định dạng email!");
      return;
    }
    if (!currentPassword) {
      setError("Nhập đầy đủ mật khẩu!");
      return;
    }
    if (currentPassword.length < minPw) {
      setError("Mật khẩu ít nhất 6 ký tự!");
      return;
    }
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      //   Gửi request đăng nhập
      const res = await axiosPublic.post("/auth/login", {
        email,
        password,
      });

      const token = res.data?.token; // Lấy token vừa đăng nhập
      const expireAt = Date.now() + 24 * 60 * 60 * 1000; // Lấy thời gian đăng nhập là 24h

      if (!token) {
        setError("Đăng nhập thất bại, không nhận được token!");
        return;
      }
      // Lưu token vào localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("expireAt", expireAt);

      setStatus({
        type: "success",
        message: res.data.message,
      });
      navigate(from, { replace: true });
    } catch (error) {
      const status = error.response?.status;

      if (status === 401) {
        setError("Thông tin đăng nhập không chính xác");
        return;
      } else if (status === 429) {
        setError("Đăng nhập quá nhiều lần, thử lại sau!");
        return;
      } else {
        setError("Lỗi hệ thống, thử lại sau nhé!");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-auto bg-gray-900 rounded-3xl">
      <form
        method="POST"
        className="p-6 rounded-md p-4 w-80"
        onSubmit={handleLogin}
      >
        <h1 className="text-3xl font-bold mb-4">Đăng nhập</h1>
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChangeLogin}
          className="w-full rounded-lg p-2 border mb-2 bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          name="password"
          value={password}
          onChange={handleChangeLogin}
          className="w-full rounded-lg p-2 border mb-2 bg-gray-700 text-white"
        />
        <button
          type="submit"
          disabled={isDisabled}
          className={`w-full text-white py-2 px-4 rounded-lg mt-5 mb-2 ${
            isDisabled
              ? "bg-blue-200 cursor-not-allowed text-black"
              : "bg-blue-600"
          }`}
        >
          <>
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <>
                <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập
              </>
            )}
          </>
        </button>
        <p>
          <NavLink to="/register">Đăng ký tài khoản</NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
