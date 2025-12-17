import React, { useState } from "react";
import axiosInstance from "../../config/axios";
import { NavLink, Navigate } from "react-router-dom";
function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("http://127.0.0.1:8000/api/register", {
        username,
        email,
        password,
      });
      alert("Đã đăng ký thành công! Quay lại đăng nhập!");
      Navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi đăng ký");
    }
  };
  return (
    <form
      method="post"
      onSubmit={handleRegister}
      className="p-6 border rounded-md mx-auto my-auto w-80"
    >
      <h1 className="text-3xl font-bold mb-4">Đăng ký</h1>
      {error && <p className="text-red-600">{error}</p>}
      <input
        type="text"
        placeholder="Tên người dùng"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
        className="w-full p-2 border mb-2 bg-gray-700"
      />
      <input
        type="email"
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
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Đăng ký
      </button>
      <p>
        <NavLink to="/login">Đã có tài khoản</NavLink>
      </p>
    </form>
  );
}

export default Register;
