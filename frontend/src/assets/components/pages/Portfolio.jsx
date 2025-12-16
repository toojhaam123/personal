import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormAddPortfolio from "../form/FormAddPortfolio";
function Portfolio({ token, setStatus }) {
  const [loading, setLoading] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [portfolio, setPortfolio] = useState([]); // Lấy danh sách các dự án
  const [previewImage, setPreviewImage] = useState(null); // preview hình ảnh
  useEffect(() => {
    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/portfolios");
        setPortfolio(res.data.data);
        // console.log("Thông tin dự án: ", res.data.data);
      } catch (e) {
        console.log("Lỗi khi lấy thông tin dự án: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fas fa-folder-open"></i> Dự án
      </h1>
      <div className="flex">
        {token && (
          /* Nút thêm dự án */
          <button
            onClick={() => setAddMode(!addMode)}
            className="bg-blue-600 hover:bg-blue-700 border mb-1 rounded transition duration-500"
          >
            {addMode ? (
              <>
                {" "}
                <i className="fa-solid fa-xmark"></i> Hủy
              </>
            ) : (
              <>
                <i className="fa-solid fa-plus"></i> Thêm dự án
              </>
            )}
          </button>
        )}
      </div>
      <div className="flex">
        <div className="flex-[7]">
          {loading ? (
            <p>
              <i className="fa-solid fa-spinner fa-spin"></i> Đang tải... Vui
              lòng chờ!
            </p>
          ) : addMode ? (
            // Form thêm dự án mới
            <FormAddPortfolio
              token={token}
              loading={loading}
              setLoading={setLoading}
              addMode={addMode}
              setAddMode={setAddMode}
              setStatus={setStatus}
              setPort={setPortfolio}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
            ></FormAddPortfolio>
          ) : (
            // Hiện thị danh sách dự án
            <div className="portfolio text-white">
              {loading ? (
                <p>Đang tải...</p>
              ) : portfolio.length == 0 ? (
                <p className="text-center ">Không có dự án nào!</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 ">
                  {portfolio.map((item, index) => (
                    <Link
                      key={`item.id ?? "STT-" ${index}`}
                      to={`/portfolio_detail/${item.id}`}
                    >
                      <div className="shadow-xl cursor-pointer pb-4 rounded-lg hover:bg-gray-800 m-2 transition duration-500">
                        <img
                          src={`http://127.0.0.1:8000/storage/avatarPort/${item.avatarPort}`}
                          alt=""
                          className="border h-[190px] w-[100%] mx-auto rounded object-cover m-1"
                        />
                        <h2 className="font-bold text-lg mb-1">{item.title}</h2>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex-[3]">
          <img
            src="../../public/portfolio.png"
            alt="Portfolio"
            className="w-100% h-100% mx-auto mb-4"
          />
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
