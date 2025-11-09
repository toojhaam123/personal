import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStatus from "../hooks/useStatus";
import { useNavigate } from "react-router-dom";

export default function PortfolioDetail() {
  const { id } = useParams();
  const isLogedIn = localStorage.getItem("token");
  const [portfolioDetail, setPortfolioDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); // preview hình ảnh
  const { status, setStatus, visible } = useStatus();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/portfolio_detail/${id}`)
      .then((res) => setPortfolioDetail(res.data))
      .catch((e) => console(console.log("Lỗi khi lấy chi tiết dự án!", e)));
  }, [id]);

  if (!portfolioDetail) return <p>Đang tải...</p>;

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
    } catch (e) {
      console.log("Lỗi khi chỉnh sửa thông tin dự án!", e);
    } finally {
      setLoading(false);
      setEditMode(false);
    }
  };

  // Xử lý thay đôi khi cập nhật
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

  // Xử lý xóa dự án
  const handleDeletePortfolio = async (id) => {
    const ok = window.confirm("Xác nhận xóa dự án này!");

    if (!ok) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/delete_portfolio_info/${id}`
      );
      if (res.data.success) {
        setStatus({
          type: "success",
          message: res.data.message,
        });
        navigate("/portfolio");
        setStatus({
          type: "success",
          message: res.data.message,
        });
      }
    } catch (e) {
      console.log("Lỗi khi xóa dự án!", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <h1 className="font-bolt text-3xl, text-red-600 mb-4">Chi tiết dự án</h1>
      {status && (
        <div
          className={`mb-3 p-3 rounded transition-opacity duration-100 
            ${visible ? "opacity-100" : "opacity-0"} ${
            status.type === "success"
              ? "bg-green-100 text-green-700 font-bold"
              : "bg-red-100 text-red-700 font-bold"
          }`}
        >
          {status.message}
        </div>
      )}
      {isLogedIn && (
        <div className="btn flex gap-2">
          {/* Nút chỉnh sửa */}
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-600 hover:bg-blue-700 border mb-1 rounded transition duration-500"
          >
            {editMode ? (
              <>
                <i class="fa-solid fa-xmark"></i> Hủy
              </>
            ) : (
              <>
                <i className="fa-solid fa-pen-to-square"></i> Chỉnh sửa
              </>
            )}
          </button>
          {
            /* Nút xóa */
            !editMode && (
              <button
                onClick={() => handleDeletePortfolio(portfolioDetail.id)}
                className="bg-blue-600 hover:bg-blue-700 border mb-1 rounded transition duration-500"
              >
                <i className="fa-solid fa-trash"></i> Xóa
              </button>
            )
          }
        </div>
      )}
      <div className="flex">
        <div className="flex-[7]">
          {editMode ? (
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
                    <i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...
                  </>
                ) : (
                  <>
                    <i class="fa-solid fa-floppy-disk"></i> Lưu{" "}
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="portfolioDetail">
              {loading ? (
                <p>
                  <i class="fa-solid fa-spinner fa-spin"></i> Đang tải... Vui
                  lòng chờ!
                </p>
              ) : (
                <>
                  <h1 className="text-3xl font-bolt">
                    {portfolioDetail.title}
                  </h1>
                  <p className="text-lg text-start my-2 whitespace-pre-line">
                    {portfolioDetail.description}
                  </p>
                </>
              )}
            </div>
          )}
        </div>
        <div className="flex-[3]">
          <div className="previewImage">
            {previewImage ? (
              <img
                src={previewImage}
                className="border w-100 rounded"
                alt="Preview ảnh dự án"
              />
            ) : (
              <>
                <img
                  src={`http://127.0.0.1:8000/storage/avatarPort/${portfolioDetail.avatarPort}`}
                  // src="../../public/1696433119267khunghinh.net.png"
                  alt="Hình ảnh dự án"
                  title="Hình ảnh dự án"
                  className="border w-100 rounded mb-5"
                />
                <a
                  href={portfolioDetail.link}
                  target="_blank"
                  onClick={(e) => {
                    if (!portfolioDetail.link || portfolioDetail.link === 0) {
                      e.preventDefault();
                      setStatus({
                        type: "error",
                        message: "Không có link github!",
                      });
                    }
                  }}
                  className="border border-blue-600 text-white rounded-lg hover:bg-blue-600 hover:text-white 
                  transition duration-500 hover:border-white px-2 mt-5 py-1"
                >
                  <i className="fa-brands fa-github"></i> Xem dự án trên github
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
