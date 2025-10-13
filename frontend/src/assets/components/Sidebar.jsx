import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import { Form, NavLink } from "react-router-dom";
import axios from "axios";
function Sidebar() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLoggedIn = localStorage.getItem("token"); // Lấy token ra
  const [status, setStatus] = useState(false);

  // Lấy thông tin người dùng từ API về hiện thị
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/get_user_info");
        setUserInfo(Array.isArray(res.data) ? res.data : [res.data]);
        console.log("Dữ liệu nhận đc:", res.data);
      } catch (e) {
        console.log("Lỗi khi lấy dữ liệu", e);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  // Hàm xử lý chỉ sửa thông tin người dùng
  const handleUpdateUserInfo = async (e, id) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userToUpdate = userInfo.find((u) => u.id == id);
      const formData = new FormData();

      // Duyệt tất cả các key trong userToUpdate để gửi
      Object.keys(userToUpdate).forEach((key) => {
        if (key === "avatar") {
          if (userToUpdate[key] instanceof File) {
            formData.append("avatar", userToUpdate);
          }
        } else {
          formData.append(key, userToUpdate[key]);
        }
      });
      const res = await axios.post(
        `http://127.0.0.1:8000/api/update_user_info/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setStatus({
        type: "success",
        message: res.data.message,
      });
      setEditMode(false);
    } catch (e) {
      setStatus({
        type: "error",
        message: "Cập nhật bị lỗi!",
        e,
      });
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý thay đổi khi nhập
  const handleChangeUdateUserInfo = (e, index) => {
    const { name, value, files } = e.target;
    setUserInfo((prev) => {
      const updated = [...prev];
      updated[index][name] = files && files.length > 0 ? files[0] : value;
      return updated;
    });
  };
  return (
    <div className="text-center max-vh-100 flex flex-col">
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
      {status && (
        <div
          className={`mb-3 p-3 rounded 
        ${
          status.type === "success"
            ? "bg-green-100 text-green-700 folt-bold "
            : "bg-red-100 text-red-700 folt-bolt"
        }`}
        >
          {status.message}
        </div>
      )}
      {/* Nếu ở chế độ chỉnh sửa thì hiện thị form  */}
      {editMode ? (
        userInfo.length > 0 &&
        userInfo.map((item, index) => (
          <form
            key={item.id || index}
            onSubmit={(e) => handleUpdateUserInfo(e, item.id)}
            method="post"
          >
            <img
              src={`http://127.0.0.1:8000/storage/avatars/${item.avatar}`}
              alt="Avatar"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <label htmlFor="avatar" className="float-start">
              Chọn ảnh
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={(e) => handleChangeUdateUserInfo(e, index)}
              className="w-full p-2 border bg-white text-black mb-2 rounded-lg"
            />
            <label htmlFor="fullname" className="float-start">
              Họ và tên
            </label>
            <input
              id="fullname"
              name="fullname"
              className="w-full p-2 border rounded-lg bg-white text-black mb-2"
              type="text"
              onChange={(e) => handleChangeUdateUserInfo(e, index)}
              value={item.fullname ? item.fullname : ""}
              placeholder="Họ và tên"
            />
            <label htmlFor="jobtitle" className="float-start">
              Chức danh
            </label>
            <input
              id="jobtitle"
              name="job_title"
              className="w-full p-2 border rounded-lg bg-white text-black mb-2"
              type="text"
              onChange={(e) => handleChangeUdateUserInfo(e, index)}
              value={item.job_title ? item.job_title : ""}
              placeholder="Chức danh"
            />
            <label htmlFor="birth" className="float-start">
              Năm sinh
            </label>
            <input
              type="text"
              id="birth"
              name="birth"
              placeholder="Năm sinh"
              onChange={(e) => handleChangeUdateUserInfo(e, index)}
              value={item.birth ? item.birth : ""}
              className="w-full p-2 rounded-lg border text-black bg-white mb-2"
            />
            <div className="border border-white p-2 rounded-lg">
              <label htmlFor="address" className="float-start">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                onChange={(e) => handleChangeUdateUserInfo(e, index)}
                className="w-full p-2 rounded-lg border text-black bg-white mb-2"
                id="address"
                value={item.address ? item.address : ""}
                placeholder="Địa chi"
              />
              <label htmlFor="link_address" className="float-start">
                Link
              </label>
              <input
                type="text"
                name="link_address"
                id="link_address"
                onChange={(e) => handleChangeUdateUserInfo(e, index)}
                value={item.link_address ? item.link_address : ""}
                className="w-full p-2 rounded-lg border text-black bg-white mb-2"
                placeholder="Link địa chỉ"
              />
            </div>
            <label htmlFor="email" className="float-start">
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              onChange={(e) => handleChangeUdateUserInfo(e, index)}
              value={item.email ? item.email : ""}
              className="w-full p-2 rounded-lg border text-black bg-white mb-2"
            />
            <label htmlFor="phone" className="float-start">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={item.phone ? item.phone : ""}
              placeholder="Số điện thoại"
              onChange={(e) => handleChangeUdateUserInfo(e, index)}
              className="w-full p-2 rounded-lg border text-black bg-white mb-2"
            />
            <div className="border border-white p-2 rounded-lg">
              <label htmlFor="facebook" className="float-start">
                Facebook
              </label>
              <input
                type="text"
                name="facebook"
                value={item.facebook ? item.facebook : ""}
                className="w-full p-2 rounded-lg border text-black bg-white mb-2"
                id="facebook"
                onChange={(e) => handleChangeUdateUserInfo(e, index)}
                placeholder="Facebook"
              />
              <label htmlFor="" className="float-start">
                Link
              </label>
              <input
                type="text"
                id="link_facebook"
                name="link_facebook"
                onChange={(e) => handleChangeUdateUserInfo(e, index)}
                value={item.link_facebook ? item.link_facebook : ""}
                className="w-full p-2 rounded-lg border text-black bg-white mb-2"
                placeholder="Link facebook"
              />
            </div>
            <div className="border border-white p-2 rounded-lg my-2">
              <label htmlFor="github" className="float-start">
                Github
              </label>
              <input
                type="text"
                name="github"
                onChange={(e) => handleChangeUdateUserInfo(e, index)}
                value={item.github ? item.github : ""}
                className="w-full p-2 rounded-lg border text-black bg-white mb-2"
                id="github"
                placeholder="Github"
              />
              <label htmlFor="" className="float-start">
                Link
              </label>
              <input
                type="text"
                id="link_github"
                name="link_github"
                onChange={(e) => handleChangeUdateUserInfo(e, index)}
                value={item.link_github ? item.link_github : ""}
                className="w-full p-2 rounded-lg border text-black bg-white mb-2"
                placeholder="Link github"
              />
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 transition duration-500
              "
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </button>
          </form>
        ))
      ) : (
        // nếu ko ở trạng thái chỉnh sửa thì in ra thoogn tin
        <div className="infomation">
          {userInfo.map((item) => (
            <div key={item.id} className="mt-4 space-y-2 text-sm text-start">
              <img
                src={`http://127.0.0.1:8000/storage/avatars/${item.avatar}`}
                alt="Avatar"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-center">{item.fullname}</h2>
              <p className="text-gray-400">{item.job_title}</p>
              {item.birth && (
                <p>
                  <i className="fa-solid fa-cake-candles"></i> Năm sinh:{" "}
                  {item.birth}
                </p>
              )}
              {item.address && (
                <p>
                  <i className="fa-solid fa-location-dot"></i> Địa chỉ:{" "}
                  <a href={item.link_address} target="_blank">
                    {item.address}
                  </a>
                </p>
              )}
              {item.email && (
                <p>
                  <i className="fa-solid fa-envelope"></i> Email:{" "}
                  <a href={`mailto:${item.email}`}>{item.email}</a>
                </p>
              )}
              {item.phone && (
                <p>
                  <i className="fa-solid fa-phone"></i> Phone:{" "}
                  <a href={`tel:${item.phone}`}>{item.phone}</a>
                </p>
              )}
              {item.facebook && (
                <p>
                  <i className="fa-brands fa-facebook"></i> Facebook:{" "}
                  <a href={item.link_facebook} target="_blank">
                    {item.facebook}
                  </a>
                </p>
              )}
              {item.github && (
                <p>
                  <i className="fa-brands fa-github"></i> Github:{" "}
                  <a href={item.link_github} target="_blank">
                    {item.github}
                  </a>
                </p>
              )}
            </div>
          ))}

          <div className="mt-5">
            {!isLoggedIn && (
              <div className="login">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `hover:text-white bg-blue-600 py-2 px-4 rounded mt-5 ${
                      isActive
                        ? "text-white "
                        : "bg-blue-600 text-white rounded w-100 p-2"
                    }`
                  }
                >
                  Đăng nhập
                </NavLink>
              </div>
            )}
          </div>
          {isLoggedIn && <Logout />}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
