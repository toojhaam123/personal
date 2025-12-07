import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import { Form, NavLink } from "react-router-dom";
import useStatus from "../hooks/useStatus";
import { formatDateVN } from "../utils/dateUtils";
import axios from "axios";
function Sidebar() {
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLogedIn = localStorage.getItem("token"); // Lấy token ra
  const { status, setStatus, visible } = useStatus();
  const [previewImage, setPreviewImage] = useState({});

  // Lấy thông tin người dùng từ API về hiện thị
  const [userInfo, setUserInfo] = useState([]);

  // Thêm người dùng
  const [addUserInfo, setAddUserInfo] = useState({
    fullname: "",
    job_title: "",
    birth: "",
    address: "",
    link_address: "",
    email: "",
    phone: "",
    facebook: "",
    link_facebook: "",
    github: "",
    link_github: "",
    avatar: null,
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/get_user_info");
        setUserInfo(Array.isArray(res.data) ? res.data : [res.data]);
        // console.log("Dữ liệu nhận đc:", res.data);
      } catch (e) {
        console.log("Lỗi khi lấy dữ liệu", e);
        setStatus({
          type: "error",
          message: "Lỗi server, không lấy đc dữ liệu!",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  // Hàm xử lý thay đổi khi nhập cập nhập thông tin
  const handleChangeUdateUserInfo = (e, index) => {
    const { name, value, files } = e.target;
    setUserInfo((prev) => {
      const updated = [...prev];
      const file = files && files.length > 0 ? files[0] : value;
      updated[index][name] = file || value;
      return updated;
    });

    // nếu là input file tạo preview
    if (name === "avatar" && files && files.length > 0) {
      setPreviewImage((prev) => ({
        ...prev,
        [index]: URL.createObjectURL(files[0]),
      }));
    }
  };

  // Hàm xử lý chỉnh sửa thông tin người dùng
  const handleUpdateUserInfo = async (e, id) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userToUpdate = userInfo.find((u) => u.id == id);
      const formData = new FormData();

      // Duyệt tất cả các key trong userToUpdate để gửi
      Object.keys(userToUpdate).forEach((key) => {
        let value = userToUpdate[key];

        if (key === "avatar") {
          if (value instanceof File) {
            formData.append("avatar", value);
          }
        } else if (value != null && value !== "null") {
          formData.append(key, value);
        }
      });
      const res = await axios.post(
        `http://127.0.0.1:8000/api/update_user_info/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // cập nhập ngay ảnh mới
      setUserInfo((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, avatar: res.data.data.avatar } : u
        )
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

  // Hàm xử lý nhập thông tin người dùng
  const handleChangeAddUserInfo = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      // Cập nhật file vào state
      setAddUserInfo({
        ...addUserInfo,
        [name]: file,
      });

      // Tạo priview ảnh
      const previewImg = URL.createObjectURL(file);
      setPreviewImage(previewImg);
    } else {
      setAddUserInfo({
        ...addUserInfo,
        [name]: value,
      });
    }
  };

  // Hàm xử lý thêm thông tin
  const handleAddUserInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      for (let key in addUserInfo) {
        formData.append(key, addUserInfo[key]);
      }

      const res = await axios.post(
        "http://127.0.0.1:8000/api/creat_user_info",
        formData,
        {
          headers: { "Content-Type": "multpart/form-data" },
        }
      );
      setUserInfo((prev) => [res.data.data, ...prev]);

      // reset lại form
      setAddUserInfo({
        fullname: "",
        job_title: "",
        birth: "",
        address: "",
        link_address: "",
        email: "",
        phone: "",
        facebook: "",
        link_facebook: "",
        github: "",
        link_github: "",
        avatar: null,
      });
      setAddMode(false);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (err) {
      if (err.response) {
        console.error("Chi tiết lỗi từ server:", err.response.data);
      } else {
        console.error("Lỗi không xác định:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý xóa thông tin người dùng
  const handleDeleteUserInfo = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa không!")) return;
    setLoading(true);
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/delete_user_info/${id}`
      );
      setUserInfo((prev) => prev.filter((item) => item.id !== id));
      setStatus({
        type: "success",
        message: res.data.message,
      });
      setEditMode(false);
    } catch (err) {
      setStatus({
        type: "error",
        message: "Lỗi khi xóa thông tin người dùng!",
        err,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center max-vh-100 flex flex-col">
      <div className="flex gap-2 text-center justify-center">
        {/* Nút thêm thông tin người dùng */}
        {isLogedIn && (!userInfo || userInfo.length === 0) ? (
          <button
            type="button"
            onClick={() => setAddMode(!addMode)}
            className="border bg-blue-600 hover:bg-blue-700 transition duration-500 mb-3"
          >
            {addMode ? (
              <>
                {" "}
                <i className="fa-solid fa-xmark"></i> Hủy
              </>
            ) : (
              <>
                {" "}
                <i className="fa-solid fa-plus"></i> Thêm
              </>
            )}
          </button>
        ) : (
          // {/* Nút chỉnh sửa  */}
          isLogedIn && (
            <>
              <button
                type="button"
                onClick={() => setEditMode(!editMode)}
                className="border bg-blue-600 hover:bg-blue-700 transition duration-500 mb-3"
              >
                {editMode ? (
                  <>
                    {" "}
                    <i className="fa-solid fa-xmark"></i> Hủy
                  </>
                ) : (
                  <>
                    {" "}
                    <i className="fa-solid fa-pen-to-square"></i> Chỉnh sửa
                  </>
                )}
              </button>
              {editMode && (
                <button
                  onClick={() => handleDeleteUserInfo(userInfo[0].id)}
                  className="border bg-red-600 hover:bg-red-700 transition duration-500 mb-3"
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-delete-left"></i> Đang xóa
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-delete-left"></i> Xóa
                    </>
                  )}
                </button>
              )}
            </>
          )
        )}
      </div>
      {/* Nếu ở chế độ thêm thì hiện form thêm thông tin người dùng */}
      {addMode ? (
        <form
          onSubmit={handleAddUserInfo}
          method="post"
          encType="multipart/form-data"
        >
          <img
            src={previewImage}
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
            onChange={handleChangeAddUserInfo}
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
            onChange={handleChangeAddUserInfo}
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
            onChange={handleChangeAddUserInfo}
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
            onChange={handleChangeAddUserInfo}
            className="w-full p-2 rounded-lg border text-black bg-white mb-2"
          />
          <div className="border border-white p-2 rounded-lg">
            <label htmlFor="address" className="float-start">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              onChange={handleChangeAddUserInfo}
              className="w-full p-2 rounded-lg border text-black bg-white mb-2"
              id="address"
              placeholder="Địa chi"
            />
            <label htmlFor="link_address" className="float-start">
              Link
            </label>
            <input
              type="text"
              name="link_address"
              id="link_address"
              onChange={handleChangeAddUserInfo}
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
            onChange={handleChangeAddUserInfo}
            className="w-full p-2 rounded-lg border text-black bg-white mb-2"
          />
          <label htmlFor="phone" className="float-start">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Số điện thoại"
            onChange={handleChangeAddUserInfo}
            className="w-full p-2 rounded-lg border text-black bg-white mb-2"
          />
          <div className="border border-white p-2 rounded-lg">
            <label htmlFor="facebook" className="float-start">
              Facebook
            </label>
            <input
              type="text"
              name="facebook"
              onChange={handleChangeAddUserInfo}
              className="w-full p-2 rounded-lg border text-black bg-white mb-2"
              id="facebook"
              placeholder="Facebook"
            />
            <label htmlFor="" className="float-start">
              Link
            </label>
            <input
              type="text"
              id="link_facebook"
              name="link_facebook"
              onChange={handleChangeAddUserInfo}
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
              onChange={handleChangeAddUserInfo}
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
              onChange={handleChangeAddUserInfo}
              className="w-full p-2 rounded-lg border text-black bg-white mb-2"
              placeholder="Link github"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition duration-500 scroll-hidden"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i> Đang thêm...
              </>
            ) : (
              <>
                <i className="fa-solid fa-plus"></i> Thêm{" "}
              </>
            )}
          </button>
        </form>
      ) : // {/* Nếu ở chế độ chỉnh sửa thì hiện thị form  */}
      editMode ? (
        userInfo.length > 0 &&
        userInfo.map((item, index) => (
          <form
            key={item.id || index}
            onSubmit={(e) => handleUpdateUserInfo(e, item.id)}
            method="post"
          >
            {previewImage[index] ? (
              <img
                src={previewImage[index]}
                alt="Avatar"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
            ) : (
              <img
                src={`http://127.0.0.1:8000/storage/avatars/${item.avatar}`}
                alt="Avatar"
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
            )}
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
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition duration-500 scroll-hidden"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Đang lưu...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-floppy-disk"></i> Lưu{" "}
                </>
              )}
            </button>
          </form>
        ))
      ) : (
        // nếu ko ở trạng thái chỉnh sửa và chế độ thêm thì in ra thông tin
        <div className="infomation">
          {loading ? (
            <p>
              {" "}
              <i className="fa-solid fa-spinner fa-spin"></i> Đăng tải thông
              tin!
            </p>
          ) : userInfo.length > 0 ? (
            userInfo.map((item) => (
              <div key={item.id} className="mt-4 space-y-2 text-sm text-start">
                <img
                  src={`http://127.0.0.1:8000/storage/avatars/${item.avatar}`}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-bold text-center">
                  {item.fullname}
                </h2>
                <p className="text-gray-400 text-center">{item.job_title}</p>
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
                {item.updated_at && (
                  <p className="float-end text-[10px]">
                    <i>Cập nhật lần cuối: {formatDateVN(item.updated_at)}</i>
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="border-b-2">Không có thông tin người dùng</p>
          )}

          <div className="mt-5">
            {!isLogedIn && (
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
                  <i class="fa-solid fa-right-to-bracket"></i> Đăng nhập
                </NavLink>
              </div>
            )}
          </div>
          {isLogedIn && <Logout />}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
