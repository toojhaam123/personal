import React from "react";
import { useState } from "react";
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loadding, setLoadding] = useState(false);
  const [status, setStatus] = useState(null); // Để lưu trạng thái gửi form
  const isLoggedIn = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadding(true);
    setStatus(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/formcontact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Có lỗi khi gửi liên hệ!");
      }

      const data = await res.json();
      setStatus({ type: "success", message: data.message });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (e) {
      setStatus({ type: "error", message: e.message });
    } finally {
      setLoadding(false);
    }
  };

  return (
    <section>
      <h1 className="font-bold text-red-600 text-3xl mb-4">
        <i className="fas fa-envelope"></i> Liên hệ
      </h1>
      <p className=" text-lg mb-4">
        Nếu bạn quan tâm đến mình hoặc dự án của mình, hãy liên hệ qua các kênh
        dưới đây:
      </p>

      <div className="flex">
        <div className="flex-[7]">
          <div className="space-y-4 mb-5">
            <p className="text-start text-lg">
              <i class="fa-solid fa-envelope"></i> Email:
              <a href="mailto:toojhaam123@gmail.com" className="">
                {" "}
                Toojhaam123@gmail.com
              </a>
            </p>
            <p className="text-start text-lg">
              <i class="fa-solid fa-phone"></i> SĐT:{" "}
              <a className="" href="tel:0345312083">
                0345312083
              </a>
            </p>
            <p className="text-start text-lg">
              <i className="fa-brands fa-github"></i> Github:{" "}
              <a href="https://github.com/toojhaam123" target="_blank">
                github.com/toojhaam123
              </a>
            </p>
            <p className="text-start text-lg">
              <i className="fa-brands fa-linkedin-in"></i> Linkedin:{" "}
              <a
                href="https://www.linkedin.com/in/hangatung123/"
                target="_blank"
              >
                linkedin.com/in/hangatung123/
              </a>
            </p>
          </div>
        </div>
        <div className="flex-[3]">
          <img
            src="../../public/contact.png"
            alt="Contact"
            className="w-100% h-100% mx-auto mb-4"
          />
        </div>
      </div>
      {!isLoggedIn && (
        <div className="">
          <p className="text-2xl">Form liên hệ</p>

          {status && (
            <div
              className={`mb-3 p-3 rounded ${
                status.type === "success"
                  ? "bg-green-100 text-green-700 font-bold"
                  : "bg-red-100 text-red-700 font-bold"
              }`}
            >
              {status.message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="float-start">
              Họ và tên
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              id="email"
              className="w-full p-2 border rounded-lg bg-white text-black mb-2"
            />
            <label htmlFor="content" className="float-start">
              Nội dung tin nhắn
            </label>
            <textarea
              name="message"
              onChange={handleChange}
              value={formData.message}
              id="message"
              className="w-full rounded-lg border p-2 bg-white text-black mb-2"
              placeholder="Nội dung tin nhắn..."
              rows={5}
            ></textarea>
            <button
              type="submit"
              disabled={loadding}
              className="w-full text-white bg-blue-500 border hover:blue-600 hover:text-white hover:border-white rounded-lg px-4 py-2 transition duration-300"
            >
              {loadding ? "Đang gửi..." : "Gửi liên hệ"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
export default Contact;
