import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //   Gửi request đăng nhập
      const res = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      alert("Đã đăng nhập thành công!");
      // Lưu token vào localStorage
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi đăng nhập!");
    }
  };

  return (
    <form
      action=""
      method="POST"
      className="p-6 border rounded-md mx-auto my-auto p-4 w-80"
      onSubmit={handleLogin}
    >
      <h1 className="text-2xl font-bold mb-4">Đăng nhập</h1>
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border mb-2 bg-gray-700"
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border mb-2 bg-gray-700"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded mt-5"
      >
        <i class="fa-solid fa-right-to-bracket"></i> Đăng nhập
      </button>
      {/* <p className="mt-5">
        <NavLink to="/register">Đăng ký tài khoản</NavLink>
      </p> */}
    </form>
  );
}

export default Login;
