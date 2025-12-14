import React, { useState } from "react";
import axios from "axios";

function FormAddHomeInfo({
  loading,
  setLoading,
  setAddMode,
  setStatus,
  setHomeInfo,
}) {
  const [addHomeInfo, setAddHomeInfo] = useState({
    home_info: "",
    cv_path: "",
  });

  // Hàm xử lý khi nhật thông tin
  const handleChangeAddHomeInfo = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      // Cập nhật file vào state
      setAddHomeInfo({
        ...addHomeInfo,
        [name]: file,
      });
    } else {
      // Cập nhật file vào state
      setAddHomeInfo({
        ...addHomeInfo,
        [name]: value,
      });
    }
  };

  //   Hàm thêm thông tin trang chủ
  const handleSubmitAddHomeInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      for (let key in addHomeInfo) {
        formData.append(key, addHomeInfo[key]);
      }

      const res = await axios.post(
        "http://127.0.0.1:8000/api/creat_home_info",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // reset lại form
      setAddHomeInfo({
        home_info: "",
        cv_path: "",
      });
      setAddMode(false);
      setHomeInfo((prev) => [res.data.data, ...prev]);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (err) {
      console.log("Lỗi khi tạo thông tin trang chủ", err);
      setStatus({
        type: "error",
        message: "Lỗi khi tạo thông tin trang chủ!",
        err,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      action=""
      onSubmit={handleSubmitAddHomeInfo}
      encType="multipart/form-data"
    >
      <div>
        <textarea
          name="home_info"
          id="home_info"
          rows={10}
          onChange={handleChangeAddHomeInfo}
          className="w-full bg-white text-black rounded-lg p-2 border text-lg"
        ></textarea>
        <label htmlFor="cv_path" className="float-start">
          Thêm CV
        </label>
        <input
          className="w-full rounded bg-white text-black m-2"
          name="cv_path"
          id="cv_path"
          type="file"
          onChange={handleChangeAddHomeInfo}
          accept=".pdf, .doc"
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
  );
}

export default FormAddHomeInfo;
