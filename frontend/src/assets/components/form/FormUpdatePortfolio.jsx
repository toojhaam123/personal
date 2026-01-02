import axiosPrivate from "@/utils/axiosPrivate";
import { useParams } from "react-router-dom";
function FormUpdatePortfolio({
  loading,
  setLoading,
  setEditMode,
  setStatus,
  portfolioDetail,
  setPortfolioDetail,
  setPreviewImage,
}) {
  const { username } = useParams();
  // Xử lý thay đổi khi cập nhật
  const handleChangeUpdatePort = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatarPort") {
      const file = files[0];
      if (file) {
        setPortfolioDetail((prev) => ({
          ...prev,
          avatarPort: file,
        }));
        setPreviewImage(URL.createObjectURL(file));
      }
    } else {
      setPortfolioDetail((prev) => ({ ...prev, [name]: value }));
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
        if (key === "avatarPort") return;
        const value = portfolioDetail[key];

        if (value === null || value === "null" || value === undefined) return; // Để tránh ghi string "null" vào CSDL

        formData.append(key, portfolioDetail[key]);
      });
      console.log("id gửi đi: ", formData.get("id"));
      const res = await axiosPrivate.post(`${username}/portfolio`, formData);

      // Cập nhật lại state
      setPortfolioDetail(res.data.data);
      setStatus({
        type: "success",
        message: res.data.message,
      });
      setEditMode(false);
    } catch (e) {
      console.log("Lỗi khi chỉnh sửa thông tin dự án!", e.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmitPortfolioUpdate}
      method="post"
      className="p-2 rounded"
    >
      <label className="float-start text-lg p-2" htmlFor="avatarPort">
        Ảnh dự án
      </label>
      <input
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
        value={portfolioDetail?.title || ""}
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
        value={portfolioDetail?.description || ""}
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
        value={portfolioDetail?.link || ""}
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
