import axiosInstance from "../../../config/axios";
import { useState } from "react";
function FormAddPortfolio({
  loading,
  setLoading,
  addMode,
  setAddMode,
  setStatus,
  setPort,
  previewImage,
  setPreviewImage,
}) {
  const [formData, setFormData] = useState({
    avatarPort: null,
    title: "",
    description: "",
    link: "",
  });

  // Xủa lý nhâp thông tin dự án
  const handleChangePortfolio = (e) => {
    const { name, value, files } = e.target; // Lấy file từ input
    const file = files && files.length > 0 ? files[0] : null;
    setFormData((prev) => ({
      ...prev,
      [name]: file || value, // Nếu là file thì lấy file đầu tiên, ko thì lấy value
    }));
    // Nếu là input file thì tạo URL preview
    if (name === "avatarPort" && file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // submit gửi form dự án để tạo dự án mới
  const handleSubmitPortfolio = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const res = await axiosInstance.post("portfolios", data);
      setStatus({ type: "success", message: res.data.message });
      // reset lại form
      setFormData({
        avatarPort: null,
        title: "",
        description: "",
        link: "",
      });
      setAddMode(false);
      setPort((prev) => [...prev, res.data]);
    } catch (e) {
      console.error("Lỗi khi gửi dự án: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      action=""
      onSubmit={handleSubmitPortfolio}
      method="post"
      className="p-2 rounded"
    >
      {previewImage && (
        <img
          src={previewImage}
          // src="../../public/1696433119267khunghinh.net.png"
          alt=""
          className="border rounded w-[30%] mx-auto object-cover"
        />
      )}
      <label className="float-start text-lg p-2" htmlFor="avatarPort">
        Ảnh dự án
      </label>
      <input
        key={addMode ? "editOn" : "editOff"} // reset input khi thoát edit
        type="file"
        id="avatarPort"
        name="avatarPort"
        onChange={(e) => handleChangePortfolio(e)}
        className="w-full bg-white text-black rounded text-lg p-2"
      />
      <label className="float-start text-lg mt-1 p-2" htmlFor="title">
        Tiêu đề
      </label>
      <input
        className="w-full bg-white text-black mt-1 text-lg rounded p-2"
        type="text"
        name="title"
        onChange={(e) => handleChangePortfolio(e)}
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
        onChange={(e) => handleChangePortfolio(e)}
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
        onChange={(e) => handleChangePortfolio(e)}
        className="w-full bg-white text-black mt-1 text-lg rounded p-2"
        type="url"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition duration-500 mt-2 scroll-hidden"
        disabled={loading}
      >
        {loading ? (
          <>
            <i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...
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
export default FormAddPortfolio;
