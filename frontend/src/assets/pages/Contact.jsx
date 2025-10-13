import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // Để lưu trạng thái gửi form
  const isLoggedIn = localStorage.getItem("token");
  const [editMode, setEditMode] = useState(false); // Trạng Thái chỉnh sửa

  // Lấy API từ Laravel để hiện thị
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://127.0.0.1:8000/api/get_information_contacts"
        );
        setContactInfo(res.data);
      } catch (e) {
        console.error("Lỗi khi lấy dữ liệu", e);
      } finally {
        setLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // xử lý khi nhập thông tin update
  const handleChangeUpdateInfor = (e, id) => {
    const newValue = e.target.value;

    //Cập nhập thông tin với giá trị mới
    setContactInfo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, information_contacts: newValue } : item
      )
    );
  };

  // xử lý submit lưu thay đổi
  const handleSubmitUpdateInfor = async (e) => {
    e.preventDefault(); // Ngăn reload trang

    try {
      const i = contactInfo[0];
      const res = await axios.put(
        `http://127.0.0.1:8000/api/contacts/${i.id}`,
        {
          information_contacts: i.information_contacts,
        }
      );

      setStatus({ type: "success", message: res.data.message });
      setEditMode(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật", error.response?.data || error.message);
      alert("Có lỗi khi cập nhật!");
    }
  };

  // Gửi dữ liệu khi đăng liên hệ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Gửi Request Post tới API bằng axios
      const res = await axios.post(
        "http://127.0.0.1:8000/api/formcontact", // endpoint API Laravel
        formData
      );

      setStatus({ type: "success", message: res.data.message });

      // Reset form
      setFormData({ name: "", email: "", message: "" });
    } catch (e) {
      if (e.response) {
        setStatus({
          type: "error",
          message: e.response.data.message || "Có lỗi khi gửi liên hệ bạn ơi!",
        });
      } else {
        setStatus({ type: "error", message: e.message });
      }
    } finally {
      setLoading(false);
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
          {/* Nút chỉnh sửa */}
          {isLoggedIn && (
            <div className="float-end">
              <button
                type="button"
                onClick={() => setEditMode(!editMode)}
                className="border bg-blue-600 hover:bg-blue-700 transition duration-500 mb-3"
              >
                {editMode ? "Hủy" : "Chỉnh sửa"}
              </button>
            </div>
          )}

          {/* Nếu ở chế độ chinh sửa thì hiện form */}
          {editMode ? (
            <form onSubmit={handleSubmitUpdateInfor}>
              {contactInfo.map((i) => (
                <div key={i.id}>
                  <textarea
                    name=""
                    id=""
                    onChange={(e) => handleChangeUpdateInfor(e, i.id)}
                    value={i.information_contacts}
                    className="w-full p-2 border rounded-lg bg-white text-black mb-2"
                    rows="5"
                  ></textarea>
                </div>
              ))}
              <button
                className="bg-blue-600 hover:bg-blue-700 transition duration-500
              "
                disabled={loading}
              >
                {loading ? "Đang lưu..." : "Lưu"}
              </button>
            </form>
          ) : (
            //  Nếu ko ở chế độ chỉnh sửa thì hiện thông tin
            <div className="space-y-4 mb-5">
              {contactInfo.map((iterm) => (
                <p
                  key={iterm.id}
                  className="text-start text-lg whitespace-pre-line"
                >
                  {iterm.information_contacts}
                </p>
              ))}
            </div>
          )}
        </div>
        {/* Ảnh minh họa */}
        <div className="flex-[3]">
          <img
            src="/contact.png"
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
              disabled={loading}
              className="w-full text-white bg-blue-500 border hover:blue-600 hover:text-white hover:border-white rounded-lg px-4 py-2 transition duration-300"
            >
              {loading ? "Đang gửi..." : "Gửi liên hệ"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
export default Contact;
