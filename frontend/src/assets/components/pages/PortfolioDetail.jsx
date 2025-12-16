import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormUpdatePortfolio from "../form/FormUpdatePortfolio";
function PortfolioDetail({ token, setStatus }) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { id } = useParams();
  const [portfolioDetail, setPortfolioDetail] = useState({
    avatarPort: "",
    title: "",
    description: "",
    link: "",
  });
  const [previewImage, setPreviewImage] = useState(null); // preview hình ảnh
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolioDetail = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/portfolios/${id}`
        );
        setPortfolioDetail(res.data);
      } catch (e) {
        console.log("Lỗi khi lấy chi tiết dự án!", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioDetail();
  }, [id]);

  // Xử lý xóa dự án
  const handleDeletePortfolio = async (id) => {
    const ok = window.confirm("Xác nhận xóa dự án này!");

    if (!ok) {
      return;
    }

    try {
      setLoading(true);
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/portfolios/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      {token && (
        <div className="btn flex gap-2">
          {/* Nút chỉnh sửa */}
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-600 hover:bg-blue-700 border mb-1 rounded transition duration-500"
          >
            {editMode ? (
              <>
                <i className="fa-solid fa-xmark"></i> Hủy
              </>
            ) : (
              <>
                <i className="fa-solid fa-pen-to-square"></i> Chỉnh sửa
              </>
            )}
          </button>
          {
            /* Nút xóa */
            editMode && (
              <button
                onClick={() => handleDeletePortfolio(portfolioDetail.id)}
                className="bg-red-600 hover:bg-red-700 border mb-1 rounded transition duration-500"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-delete-left"></i> Đang xóa
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-delete-left"></i> Xóa
                  </>
                )}
              </button>
            )
          }
        </div>
      )}
      <div className="flex">
        <div className="flex-[7]">
          {editMode ? (
            // Form chỉnh sửa dự án
            <FormUpdatePortfolio
              token={token}
              loading={loading}
              setLoading={setLoading}
              editMode={editMode}
              setEditMode={setEditMode}
              setStatus={setStatus}
              portfolioDetail={portfolioDetail}
              setPortfolioDetail={setPortfolioDetail}
              setPreviewImage={setPreviewImage}
            ></FormUpdatePortfolio>
          ) : (
            // Hiện thị thông tun dự án
            <div className="portfolioDetail">
              {portfolioDetail ? (
                loading ? (
                  <p>
                    <i className="fa-solid fa-spinner fa-spin"></i> Đang tải...
                    Vui lòng chờ!
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
                )
              ) : (
                <p>Không có dự án nào!</p>
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
                {portfolioDetail?.link && (
                  <a
                    href={portfolioDetail.link}
                    target="_blank"
                    className="border border-blue-600 text-white rounded-lg hover:bg-blue-600 hover:text-white 
                  transition duration-500 hover:border-white px-2 mt-5 py-1"
                  >
                    <i className="fa-brands fa-github"></i> Xem dự án trên
                    github
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default PortfolioDetail;
