import React from "react";
import axios from "axios";
function FormUpdateHomeInfo({
  loading,
  setLoading,
  setEditMode,
  setStatus,
  homeInfo,
  setHomeInfo,
}) {
  // hàm xử lý update
  const handleSubmiUpdatetHomeInfo = async (e) => {
    e.preventDefault(); // Ngăn reload trang
    setLoading(true);

    try {
      const i = homeInfo[0];
      const formData = new FormData();

      formData.append("home_info", i.home_info);

      const file = e.target.cv_path.files[0];

      if (file) {
        formData.append("cv_path", file);
      }

      const res = await axios.post(
        `http://127.0.0.1:8000/api/home/${i.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setEditMode(false);
      setLoading(false);
      setStatus({
        type: "success",
        message: res.data.message,
      });
      // Cập nhật ngay sao khi update
      setHomeInfo([res.data.data]);
    } catch (e) {
      console.log("Lỗi khi cập nhật thông tin trang chủ!", e);
      // alert("Có lỗi khi cập nhập thông tin trang chủ!", e);
    }
  };

  //Hàm xử lý thay đối khi người dùng thông tin
  const handleChangeUpdatHomeInfo = (e, id) => {
    const newValue = e.target.value;

    // cập nhập thông tin vói giá trị mới
    setHomeInfo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, home_info: newValue } : item
      )
    );
  };

  return (
    <form action="" onSubmit={handleSubmiUpdatetHomeInfo}>
      {homeInfo.map((i) => (
        <div key={i.id}>
          <textarea
            name="home_info"
            id="home_info"
            rows={10}
            value={i.home_info}
            onChange={(e) => handleChangeUpdatHomeInfo(e, i.id)}
            className="w-full bg-white text-black rounded-lg p-2 border text-lg"
          ></textarea>
          <label htmlFor="cv" className="float-start">
            Thêm CV
          </label>
          <input
            className="w-full rounded bg-white text-black m-2"
            name="cv_path"
            id="cv_path"
            type="file"
            accept=".pdf, .doc"
          />
        </div>
      ))}
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

export default FormUpdateHomeInfo;
