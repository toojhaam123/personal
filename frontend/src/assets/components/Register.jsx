import React, { useState } from "react";
import axiosPublic from "@/utils/axiosPublic";
import { NavLink, useNavigate } from "react-router-dom";
function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axiosPublic.post("/auth/register", {
        username,
        email,
        password,
      });
      setUserName("");
      setEmail("");
      setPassword("");
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto my-auto bg-gray-900 rounded-3xl">
      <form
        method="post"
        onSubmit={handleRegister}
        className="p-6 rounded-md mx-auto my-auto w-80"
      >
        <h1 className="text-3xl font-bold mb-4">Đăng ký</h1>
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          placeholder="Tên người dùng"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full rounded-lg p-2 border mb-2 bg-gray-700 text-white"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg p-2 border mb-2 bg-gray-700 text-white"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg p-2 border mb-2 bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg mt-5 mb-2"
        >
          <>
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <>
                <i className="fa-regular fa-registered"></i> Đăng ký
              </>
            )}
          </>
        </button>
        <p>
          <NavLink to="/login">Đã có tài khoản</NavLink>
        </p>
      </form>
    </div>
  );
}

export default Register;
