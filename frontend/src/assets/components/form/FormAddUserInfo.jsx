import axios from "axios";
import React, { useState } from "react";

function FormAddUserInfo({
  token,
  loading,
  setLoading,
  setAddMode,
  setStatus,
  setUserInfo,
  previewImage,
  setPreviewImage,
}) {
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

  // Hàm xử lý thêm thông tin người dùng
  const handleAddUserInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      for (let key in addUserInfo) {
        formData.append(key, addUserInfo[key]);
      }
      const res = await axios.post(
        "http://127.0.0.1:8000/api/user-info",
        formData,
        {
          headers: {
            "Content-Type": "multpart/form-data",
            Authorization: `Bearer ${token}`,
          },
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

  return (
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
          type="url"
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
        <label htmlFor="link_facebook" className="float-start">
          Link
        </label>
        <input
          type="url"
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
          type="url"
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
  );
}
export default FormAddUserInfo;
