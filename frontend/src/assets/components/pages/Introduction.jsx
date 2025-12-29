import axiosInstance from "../../../utils/axiosPrivate";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import FormAddIntroInfo from "../form/FormAddIntroInfo";
import FormUpdateIntroInfo from "../form/FormUpdateIntroInfo";
function Home({ token, setStatus }) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const { user } = useUser(); // Thông tin người dùng

  // Lấy thông tin trang chủ từ API
  const [introInfo, setIntroInfo] = useState([]);
  // console.log("User in intro: ", user);
  useEffect(() => {
    const fetchHomeInfo = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("introductions");
        setIntroInfo(Array.isArray(res.data) ? res.data : [res.data]);
        // console.log("Thôn tin trang chủ: ", res.data);
      } catch (e) {
        console.log("Lỗi khi lấy thông tin giới thiệu!", e);
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
      const res = await axiosInstance.delete(`home/${id}`);
      setIntroInfo((prev) => prev.filter((item) => item.id !== id));
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
        {token && (!introInfo || introInfo.length === 0) ? (
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
          token && (
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
                  onClick={() => handleDeleteHomeInfo(introInfo[0].id)}
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
            <FormAddIntroInfo
              token={token}
              loading={loading}
              setLoading={setLoading}
              setAddMode={setAddMode}
              setStatus={setStatus}
              setIntroInfo={setIntroInfo}
            />
          ) : editMode ? (
            <>
              {/* Form update thông tin trang chủ */}
              <FormUpdateIntroInfo
                token={token}
                loading={loading}
                setLoading={setLoading}
                setEditMode={setEditMode}
                setStatus={setStatus}
                introInfo={introInfo}
                setIntroInfo={setIntroInfo}
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
                introInfo[0]?.home_info && (
                  <p className="text-start text-lg mb-4 whitespace-pre-line">
                    {introInfo[0].home_info}
                  </p>
                )
              )}
              {!editMode && introInfo.length > 0
                ? introInfo[0]?.cv_path && (
                    <a
                      href={`http://127.0.0.1:8000${introInfo[0].cv_path}`}
                      target="_blank"
                      className="px-4 py-2 border border-blue-600 text-white 
                    rounded-lg hover:bg-blue-600 hover:text-white transition duration-500 
                      hover:border-white float-end"
                    >
                      <i className="fa-regular fa-file"></i> Xem CV
                    </a>
                  )
                : !loading && <p>Không có thông tin giới thiệu nào!</p>}
            </div>
          )}
        </div>
        <div className="flex-[4]">
          <div className="w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] md:w-[300px] md:h-[300px] rounded-full border flex justify-center items-center bg-gray-400 overflow-hidden">
            {user?.avatar ? (
              <img
                src={`http://127.0.0.1:8000/storage/avatars/${user?.avatar}`}
                alt="Avatar"
                className="mb-4 object-cover"
              />
            ) : (
              <p className="text-gray-100">Ảnh</p>
            )}
          </div>

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
