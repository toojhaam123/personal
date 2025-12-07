import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormAddPortfolio from "../form/FormAddPortfolio";
function Portfolio({
  loading,
  setLoading,
  isLogedIn,
  addMode,
  setAddMode,
  setStatus,
}) {
  const [port, setPort] = useState([]); // Lấy danh sách các dự án
  const [previewImage, setPreviewImage] = useState(null); // preview hình ảnh
  useEffect(() => {
    const fetchPort = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/get_portfolio_info"
        );
        setPort(res.data.data);
        // console.log("Thông tin dự án: ", res.data.data);
      } catch (e) {
        console.log("Lỗi khi lấy thông tin dự án: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPort();
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fas fa-folder-open"></i> Dự án
      </h1>
      <div className="flex">
        {isLogedIn && (
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
              loading={loading}
              setLoading={setLoading}
              addMode={addMode}
              setAddMode={setAddMode}
              setStatus={setStatus}
              setPort={setPort}
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
            ></FormAddPortfolio>
          ) : (
            // Hiện thị danh sách dự án
            <div className="portfolio text-white">
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 ">
                {port.map((item) => (
                  <Link key={item.id} to={`/portfolio_detail/${item.id}`}>
                    <div
                      className="shadow-xl cursor-pointer pb-4 rounded-lg hover:bg-gray-800 m-2 transition duration-500"
                      key={item.id}
                    >
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
