import axios from "axios";
import React from "react";
function FormUpdatePortfolio({
  loading,
  setLoading,
  editMode,
  setEditMode,
  setStatus,
  portfolioDetail,
  setPortfolioDetail,
  setPreviewImage,
}) {
  // Xử lý thay đổi khi cập nhật
  const handleChangeUpdatePort = (e) => {
    const { name, value, files } = e.target;
    const file = files && files.length > 0 ? files[0] : null;

    setPortfolioDetail((prev) => ({
      ...prev,
      [name]: file || value,
    }));

    // nếu là input file thì tạo URL preview
    if (name === "avatarPort" && file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Xử lý gửi cập nhật thông tin dự án
  const handleSubmitPortfolioUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Nếu có ảnh cũ thì append, không thì bỏ qua
      if (portfolioDetail.avatarPort instanceof File) {
        formData.append("avatarPort", portfolioDetail.avatarPort);
      }

      // Append các trường khác
      Object.keys(portfolioDetail).forEach((key) => {
        if (key !== "avatarPort") {
          formData.append(key, portfolioDetail[key]);
        }
      });
      // console.log("Dữ liệu gửi đi:", Object.fromEntries(formData.entries()));
      const res = await axios.post(
        `http://127.0.0.1:8000/api/update_portfolio_info/${portfolioDetail.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Cập nhật lại state
      setPortfolioDetail(res.data.data);
      setStatus({
        type: "success",
        message: "Cập nhật thông tin dự án thành công!",
      });
      // console.log("Cập nhật thành công!");
      setEditMode(false);
    } catch (e) {
      console.log("Lỗi khi chỉnh sửa thông tin dự án!", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      action=""
      onSubmit={handleSubmitPortfolioUpdate}
      method="post"
      className="p-2 rounded"
    >
      <label className="float-start text-lg p-2" htmlFor="avatarPort">
        Ảnh dự án
      </label>
      <input
        key={editMode ? "editOn" : "editOff"} // reset input khi thoát edit
        type="file"
        id="avatarPort"
        name="avatarPort"
        onChange={(e) => handleChangeUpdatePort(e)}
        className="w-full bg-white text-black rounded text-lg p-2"
      />
      <label className="float-start text-lg mt-1 p-2" htmlFor="title">
        Tiêu đề
      </label>
      <input
        className="w-full bg-white text-black mt-1 text-lg rounded p-2"
        type="text"
        name="title"
        onChange={(e) => handleChangeUpdatePort(e)}
        value={portfolioDetail.title || ""}
        id="title"
      />
      <label
        htmlFor="description"
        id="description"
        className="text-lg float-start mt-1"
      >
        Nội dung
      </label>
      <textarea
        name="description"
        id="description"
        onChange={(e) => handleChangeUpdatePort(e)}
        value={portfolioDetail.description || ""}
        rows={10}
        className="text-black bg-white w-full mt-1 text-lg p-2 rounded"
      ></textarea>
      <label
        htmlFor="description"
        id="description"
        className="text-lg float-start mt-1"
      >
        Link
      </label>
      <input
        name="link"
        id="link"
        onChange={(e) => handleChangeUpdatePort(e)}
        value={portfolioDetail.link || ""}
        className="w-full bg-white text-black mt-1 text-lg rounded p-2"
        type="text"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition duration-500 mt-2 scroll-hidden"
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

export default FormUpdatePortfolio;
