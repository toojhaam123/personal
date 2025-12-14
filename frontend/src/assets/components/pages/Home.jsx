import axios from "axios";
import React, { useEffect, useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import FormAddHomeInfo from "../../components/form/FormAddHomeInfo";
import FormUpdateHomeInfo from "../../components/form/FormUpdateHomeInfo";
function Home({ isLogedIn, setStatus }) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const { userInfo } = useUserInfo(); // Thông tin người dùng
  // Lấy thông tin trang chủ từ API
  const [homeInfo, setHomeInfo] = useState([]);
  // console.log("Thông tin trang chủ: ", useUserInfo);
  useEffect(() => {
    const fetchHomeInfo = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/get_home_info");
        setHomeInfo(Array.isArray(res.data) ? res.data : [res.data]);
        // console.log("Thôn tin trang chủ: ", res.data);
      } catch (e) {
        console.log("Lỗi khi lấy thông tin trang chủ!", e);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeInfo();
  }, []);

  // Xóa thông tin trang chủ
  const handleDeleteHomeInfo = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa không!")) return;
    setLoading(true);
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/delete_home_info/${id}`
      );
      setHomeInfo((prev) => prev.filter((item) => item.id !== id));
      setStatus({
        type: "success",
        message: res.data.message,
      });
      setEditMode(false);
    } catch (err) {
      setStatus({
        type: "error",
        message: "Lỗi khi xóa thông tin trang chủ!",
        err,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fa-solid fa-hand"></i> Xin chào
      </h1>
      <div className="flex gap-2">
        {/* Thêm thông tin trang chủ */}
        {isLogedIn && (!homeInfo || homeInfo.length === 0) ? (
          <button
            type="button"
            onClick={() => setAddMode(!addMode)}
            className="border bg-blue-600 hover:bg-blue-700 transition duration-500 mb-3"
          >
            {addMode ? (
              <>
                {" "}
                <i className="fa-solid fa-xmark"></i> Hủy
              </>
            ) : (
              <>
                {" "}
                <i className="fa-solid fa-add"></i> Thêm
              </>
            )}
          </button>
        ) : (
          // {/* Nút chỉnh sửa  */}
          isLogedIn && (
            <>
              <button
                type="button"
                onClick={() => setEditMode(!editMode)}
                className="border bg-blue-600 hover:bg-blue-700 transition duration-500 mb-3"
              >
                {editMode ? (
                  <>
                    {" "}
                    <i className="fa-solid fa-xmark"></i> Hủy
                  </>
                ) : (
                  <>
                    {" "}
                    <i className="fa-solid fa-pen-to-square"></i> Chỉnh sửa
                  </>
                )}
              </button>
              {editMode && (
                // Nút xóa thông tin trang chủ
                <button
                  onClick={() => handleDeleteHomeInfo(homeInfo[0].id)}
                  className="border bg-red-600 hover:bg-red-700 transition duration-500 mb-3"
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
              )}
            </>
          )
        )}
      </div>
      <div className="flex">
        <div className="flex-[6]">
          {/* Form thêm thông tin trang chủ */}
          {addMode ? (
            <FormAddHomeInfo
              loading={loading}
              setLoading={setLoading}
              setAddMode={setAddMode}
              setStatus={setStatus}
              setHomeInfo={setHomeInfo}
            />
          ) : editMode ? (
            <>
              {/* Form update thông tin trang chủ */}
              <FormUpdateHomeInfo
                loading={loading}
                setLoading={setLoading}
                setEditMode={setEditMode}
                setStatus={setStatus}
                homeInfo={homeInfo}
                setHomeInfo={setHomeInfo}
              />
            </>
          ) : (
            // Hiện thị thông tin trang chủ
            <div className="home_info">
              {loading ? (
                <p>
                  <i className="fa-solid fa-spinner fa-spin"></i> Đang tải...
                  Vui lòng chờ!
                </p>
              ) : (
                homeInfo[0]?.home_info && (
                  <p className="text-start text-lg mb-4 whitespace-pre-line">
                    {homeInfo[0].home_info}
                  </p>
                )
              )}
              {!editMode && homeInfo.length > 0
                ? homeInfo[0]?.cv_path && (
                    <a
                      href={`http://127.0.0.1:8000${homeInfo[0].cv_path}`}
                      target="_blank"
                      className="px-4 py-2 border border-blue-600 text-white 
                    rounded-lg hover:bg-blue-600 hover:text-white transition duration-500 
                      hover:border-white float-end"
                    >
                      <i className="fa-regular fa-file"></i> Xem CV
                    </a>
                  )
                : !loading && <p>Không có thông tin trang chủ nào!</p>}
            </div>
          )}
        </div>
        <div className="flex-[4]">
          {userInfo[0]?.avatar && (
            <img
              src={`http://127.0.0.1:8000/storage/avatars/${userInfo[0].avatar}`}
              alt="Avatar"
              className="w-full h-50 rounded-full mx-auto mb-4 object-cover"
            />
          )}
          <img
            src="../../public/laptop.svg"
            alt="Laptop"
            className="w-32 h-32 ms-auto mt-4 animate-bounce"
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
