import axios from "axios";
import React, { useEffect, useState } from "react";
import useUserInfo from "../hooks/useUserInfo";
import useStatus from "../hooks/useStatus";
function Home() {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const isLogedIn = localStorage.getItem("token");
  const { userInfo } = useUserInfo();
  const { status, setStatus, visible } = useStatus();

  // Lấy thông tin trang chủ từ API
  const [homeInfo, setHomeInfo] = useState([]);

  // console.log("Thông tin trang chủ: ", useUserInfo);
  useEffect(() => {
    const fetchHomeInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/get_home_info");
        setHomeInfo(Array.isArray(res.data) ? res.data : [res.data]);
        console.log("Thôn tin trang chủ: ", res.data);
      } catch (e) {
        console.log("Lỗi khi lấy thông tin trang chủ!", e);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeInfo();
  }, []);
  //Hàm xử lý thay đối khi người dùng thông tin
  const handleChangeUpdatHomeInfo = (e, id) => {
    const newValue = e.target.value;

    // cập nhập thông tin vói giá trị mới
    setHomeInfo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, home_info: newValue } : item
      )
    );
  };

  // hàm xử lý update
  const handleSubmitHomeInfo = async (e) => {
    e.preventDefault(); // Ngăn reload trang
    setLoading(true);

    try {
      const i = homeInfo[0];
      const formData = new FormData();

      formData.append("home_info", i.home_info);

      const file = e.target.cv_path.files[0];

      if (file) {
        formData.append("cv_path", file);
      }

      const res = await axios.post(
        `http://127.0.0.1:8000/api/update_home_info/${i.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setEditMode(false);
      setLoading(false);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (e) {
      console.log("Lỗi khi cập nhật thông tin trang chủ!", e);
      // alert("Có lỗi khi cập nhập thông tin trang chủ!", e);
    }
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fa-solid fa-hand"></i> Xin chào
      </h1>
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
      <div className="flex gap-2">
        {/* Nút chỉnh sửa  */}
        {isLogedIn && (
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
        )}
      </div>
      <div className="flex">
        <div className="flex-[6]">
          {editMode ? (
            <>
              <form action="" onSubmit={handleSubmitHomeInfo}>
                {homeInfo.map((i) => (
                  <div key={i.id}>
                    <textarea
                      name="home_info"
                      id="home_info"
                      rows={10}
                      value={i.home_info}
                      onChange={(e) => handleChangeUpdatHomeInfo(e, i.id)}
                      className="w-full bg-white text-black rounded-lg p-2 border text-lg"
                    ></textarea>
                    <label htmlFor="cv" className="float-start">
                      Thêm CV
                    </label>
                    <input
                      className="w-full rounded bg-white text-black m-2"
                      name="cv_path"
                      id="cv_path"
                      type="file"
                      accept=".pdf, .doc"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 transition duration-500 scroll-hidden"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Đang
                      lưu...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-floppy-disk"></i> Lưu{" "}
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="home_info">
              {loading ? (
                <p>
                  <i className="fa-solid fa-spinner fa-spin"></i> Đang tải...
                  Vui lòng chờ!
                </p>
              ) : (
                homeInfo.map((item) => (
                  <p
                    key={item.id}
                    className="text-start text-lg mb-4 whitespace-pre-line"
                  >
                    {item.home_info}
                  </p>
                ))
              )}
              {!editMode && homeInfo.length > 0
                ? homeInfo.map((i) => (
                    <a
                      key={i.id}
                      href={`http://127.0.0.1:8000${i.cv_path}`}
                      target="_blank"
                      className="px-4 py-2 border border-blue-600 text-white 
                   rounded-lg hover:bg-blue-600 hover:text-white transition duration-500 
                     hover:border-white float-end"
                    >
                      <i className="fa-regular fa-file"></i> Xem CV
                    </a>
                  ))
                : !loading && <p>Không có thông tin trang chủ</p>}
            </div>
          )}
        </div>
        <div className="flex-[4]">
          {userInfo.map((item) => (
            <img
              key={item.id}
              src={`http://127.0.0.1:8000/storage/avatars/${item.avatar}`}
              alt="Avatar"
              className="w-100% h-100% rounded-full mx-auto mb-4"
            />
          ))}
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
