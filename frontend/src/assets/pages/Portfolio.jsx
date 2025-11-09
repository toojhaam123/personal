import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Link } from "react-router-dom";
import useStatus from "../hooks/useStatus";
function Portfolie() {
  const [loading, setLoading] = useState(false);
  const [port, setPort] = useState([]); // Lấy danh sách các dự án
  const [editMode, setEditMode] = useState(false);
  const isLogedIn = localStorage.getItem("token");
  const { status, setStatus, visible } = useStatus();
  const [previewImage, setPreviewImage] = useState(null); // preview hình ảnh
  const [formData, setFormData] = useState({
    avatarPort: null,
    title: "",
    description: "",
    link: "",
  });

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

      const res = await axios.post(
        "http://127.0.0.1:8000/api/creat_portfolio_info",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        setStatus({ type: "success", message: "Thêm dự án thành công!" });
        setFormData({
          avatarPort: null,
          title: "",
          description: "",
          link: "",
        });
        setEditMode(false);
        console.log("Dữ lieeuuj nhận đc: ", res.data);

        setPort((prev) => [...prev, res.data]);
      }
    } catch (e) {
      console.error("Lỗi khi gửi dự án: ", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fas fa-folder-open"></i> Dự án
      </h1>
      {status && (
        <div
          className={`mb-3 p-3 rounded transition-opacity duration-500
                ${visible ? "opacity-100" : "opacity-0"}
                ${
                  status.type === "success"
                    ? "bg-green-100 text-green-700 font-bold"
                    : "bg-red-100 text-red-700 font-bold"
                }`}
        >
          {status.message}
        </div>
      )}
      <div className="flex">
        {isLogedIn && (
          /* Nút thêm dự án */
          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-blue-600 hover:bg-blue-700 border mb-1 rounded transition duration-500"
          >
            {editMode ? (
              <>Hủy</>
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
          ) : editMode ? (
            <form
              action=""
              onSubmit={handleSubmitPortfolio}
              method="post"
              className="p-2 rounded"
            >
              <img
                src={previewImage}
                // src="../../public/1696433119267khunghinh.net.png"
                alt=""
                className="border rounded w-25 h-25"
              />
              <label className="float-start text-lg p-2" htmlFor="avatarPort">
                Ảnh dự án
              </label>
              <input
                key={editMode ? "editOn" : "editOff"} // reset input khi thoát edit
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
                    <i className="fa-solid fa-floppy-disk"></i> Lưu{" "}
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="portfolio text-white">
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 ">
                {port.map((item) => (
                  <Link key={item.id} to={`/portfolio_detail/${item.id}`}>
                    <div
                      className="shadow-xl cursor-pointer pb-4 rounded-lg hover:bg-gray-800 m-2 transition duration-500"
                      key={item.id}
                    >
                      {!previewImage ? (
                        <img
                          src={`http://127.0.0.1:8000/storage/avatarPort/${item.avatarPort}`}
                          // src="../../public/1696433119267khunghinh.net.png"
                          alt=""
                          className="border rounded"
                        />
                      ) : (
                        <img
                          src={`http://127.0.0.1:8000/storage/avatarPort/${item.avatarPort}`}
                          // src="../../public/1696433119267khunghinh.net.png"
                          alt=""
                          className="border rounded"
                        />
                      )}
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

export default Portfolie;
