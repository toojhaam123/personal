import axiosPrivate from "@/utils/axiosPrivate";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function FormAddPortfolio({
  loading,
  setLoading,
  setAddMode,
  setStatus,
  setPort,
  previewImage,
  setPreviewImage,
}) {
  const { username } = useParams();
  //Dọn URL preview
  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  const [formData, setFormData] = useState({
    avatarPort: null,
    title: "",
    description: "",
    link: "",
  });

  // Xủa lý nhâp thông tin dự án
  const handleChangePortfolio = (e) => {
    const { name, value, files } = e.target; // Lấy file từ input

    // Nếu là input file thì tạo URL preview
    if (name === "avatarPort" && files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        avatarPort: file,
      }));
      // Tạo preview mói
      const url = URL.createObjectURL(file);
      setPreviewImage(url);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // submit gửi form dự án để tạo dự án mới
  const handleSubmitPortfolio = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          data.append(key, formData[key]);
        }
      });

      const res = await axiosPrivate.post(`${username}/portfolios`, data);
      setStatus({ type: "success", message: res.data.message });
      setPort((prev) => [res.data.data || res.data, ...prev]);
      // reset lại form
      setFormData({
        avatarPort: null,
        title: "",
        description: "",
        link: "",
      });
      setAddMode(false);
      setPreviewImage(null);
    } catch (e) {
      console.log("Lỗi khi thêm dự án: ", e.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmitPortfolio}
      method="post"
      className="p-2 rounded"
    >
      {previewImage && (
        <div className="mb-4 text-center">
          <img
            src={previewImage}
            alt="Ảnh xem trước"
            className="border rounded w-[200px] h-[150px] mx-auto object-cover"
          />
        </div>
      )}
      <label className="float-start text-lg p-2" htmlFor="avatarPort">
        Ảnh dự án
      </label>
      <input
        type="file"
        id="avatarPort"
        name="avatarPort"
        accept="image/*"
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
        value={formData.title}
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
        value={formData.description}
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
        value={formData.link}
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
