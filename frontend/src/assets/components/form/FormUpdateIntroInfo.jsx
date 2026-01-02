import React from "react";
import axiosPrivate from "@/utils/axiosPrivate";
function FormUpdateHomeInfo({
  loading,
  setLoading,
  setEditMode,
  setStatus,
  introInfo,
  setIntroInfo,
}) {
  // hàm xử lý update
  const handleSubmiUpdatetHomeInfo = async (e) => {
    e.preventDefault(); // Ngăn reload trang
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("intro_info", introInfo.intro_info);

      // Lấy file từ input
      const file = e.target.cv_path.files[0];
      if (file) {
        formData.append("cv_path", file);
      }

      const res = await axiosPrivate.post(`introductions`, formData);
      setStatus({
        type: "success",
        message: res.data.message,
      });

      // Cập nhật ngay sao khi update
      setIntroInfo(res.data.data);
      setEditMode(false);
    } catch (e) {
      console.log("Lỗi khi cập nhật thông tin trang chủ!", e.response?.data);
    } finally {
      setLoading(false);
    }
  };

  //Hàm xử lý thay đối khi người dùng thông tin
  const handleChangeUpdatIntroInfo = (e) => {
    const { name, value } = e.target;

    // cập nhập thông tin vói giá trị mới
    setIntroInfo((prev) => ({
      ...prev, // Giữ lại các trường cũ
      [name]: value, // cập nhật trường đang nhập
    }));
  };

  return (
    <form onSubmit={handleSubmiUpdatetHomeInfo}>
      <div key={introInfo?.id}>
        <textarea
          name="intro_info"
          id="intro_info"
          rows={10}
          value={introInfo?.intro_info}
          onChange={(e) => handleChangeUpdatIntroInfo(e)}
          className="w-full bg-white text-black rounded-lg p-2 border text-lg"
        ></textarea>
        <label htmlFor="cv" className="block text-left mt-2">
          Cập nhật CV
        </label>
        <input
          className="w-full rounded bg-white text-black mb-4"
          name="cv_path"
          id="cv_path"
          type="file"
          accept=".pdf, .doc, .docx"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-500 scroll-hidden"
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

export default FormUpdateHomeInfo;
