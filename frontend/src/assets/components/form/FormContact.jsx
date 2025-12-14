import React, { useState } from "react";
import axios from "axios";

function FormContact({ loading, setLoading, setStatus }) {
  const [formContact, setFormContact] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Xử lý khi nhập thông tin
  const handleChangeFormContact = (e) => {
    setFormContact({ ...formContact, [e.target.name]: e.target.value });
  };

  // Gửi dữ liệu khi đăng liên hệ
  const handleSubmitContact = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Gửi Request Post tới API bằng axios
      const res = await axios.post(
        "http://127.0.0.1:8000/api/contacts", // endpoint API Laravel
        formContact
      );

      setStatus({ type: "success", message: res.data.message });

      // Reset form
      setFormContact({ name: "", email: "", message: "" });
    } catch (e) {
      if (e.response) {
        setStatus({
          type: "error",
          message: e.response.data.message || "Có lỗi khi gửi liên hệ!",
        });
      } else {
        setStatus({ type: "error", message: e.message });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmitContact} method="post">
      <label htmlFor="name" className="float-start">
        Họ và tên
      </label>
      <input
        type="text"
        name="name"
        value={formContact.name}
        onChange={(e) => handleChangeFormContact(e)}
        placeholder="Họ và tên"
        id="name"
        className="w-full p-2 border rounded-lg bg-white text-black mb-2"
      />
      <label htmlFor="email" className="float-start">
        Email
      </label>
      <input
        type="email"
        name="email"
        value={formContact.email}
        placeholder="Email"
        onChange={(e) => handleChangeFormContact(e)}
        id="email"
        className="w-full p-2 border rounded-lg bg-white text-black mb-2"
      />
      <label htmlFor="content" className="float-start">
        Nội dung tin nhắn
      </label>
      <textarea
        name="message"
        onChange={(e) => {
          handleChangeFormContact(e);
          e.target.style.height = "auto";
          e.target.style.height = e.target.style.scrollHeight + "px";
        }}
        value={formContact.message}
        id="message"
        className="w-full rounded-lg border p-2 bg-white text-black mb-2"
        placeholder="Nội dung tin nhắn..."
        rows={5}
      ></textarea>
      <button
        type="submit"
        disabled={loading}
        className="w-full text-white bg-blue-500 border hover:blue-600 hover:text-white hover:border-white rounded-lg px-4 py-2 transition duration-300"
      >
        {loading ? (
          <>
            <i className="fa-solid fa-spinner fa-spin"></i> Đang gửi...
          </>
        ) : (
          <>
            <i className="fa-solid fa-arrow-right"></i> Gửi
          </>
        )}
      </button>
    </form>
  );
}

export default FormContact;
