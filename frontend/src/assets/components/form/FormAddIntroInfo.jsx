import { useState } from "react";
import axiosInstance from "../../../config/axios";

function FormAddIntroInfo({
  loading,
  setLoading,
  setAddMode,
  setStatus,
  setIntroInfo,
}) {
  const [addIntroInfo, setAddIntroInfo] = useState({
    intro_info: "",
    cv_path: "",
  });

  // Hàm xử lý khi nhật thông tin
  const handleChangeAddIntroInfo = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];

      // Cập nhật file vào state
      setAddIntroInfo({
        ...addIntroInfo,
        [name]: file,
      });
    } else {
      // Cập nhật file vào state
      setAddIntroInfo({
        ...addIntroInfo,
        [name]: value,
      });
    }
  };

  //   Hàm thêm thông tin trang chủ
  const handleSubmitAddIntroInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      if (addIntroInfo.intro_info) {
        formData.append("intro_info", addIntroInfo.intro_info);
      }

      if (addIntroInfo.cv_path) {
        formData.append("cv_path", addIntroInfo.cv_path);
      }

      const res = await axiosInstance.post("introductions", formData);

      // reset lại form
      setAddIntroInfo({
        intro_info: "",
        cv_path: "",
      });
      setAddMode(false);
      setIntroInfo((prev) => [res.data.data, ...prev]);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (err) {
      console.log("Lỗi khi tạo thông tin giới thiệu!", err);
      setStatus({
        type: "error",
        message: "Lỗi khi tạo thông tin giới thiệu!",
        err,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      action=""
      onSubmit={handleSubmitAddIntroInfo}
      encType="multipart/form-data"
    >
      <div>
        <textarea
          name="intro_info"
          id="intro_info"
          rows={10}
          onChange={handleChangeAddIntroInfo}
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
          onChange={handleChangeAddIntroInfo}
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

export default FormAddIntroInfo;
