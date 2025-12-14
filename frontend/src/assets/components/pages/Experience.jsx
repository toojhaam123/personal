import axios from "axios";
import React, { useEffect, useState } from "react";
import FormAddExpInfo from "../../components/form/FormAddExpInfo";
import FormUpdateExpInfo from "../../components/form/FormUpdateExpInfo";
function Experience({
  loading,
  setLoading,
  editMode,
  setEditMode,
  isLogedIn,
  setStatus,
  addMode,
  setAddMode,
}) {
  const [expInfo, setExpInfo] = useState([]);
  useEffect(() => {
    // Lấy thông tin kinh nghiệm từ API gửi về
    const fetcExpInfo = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/get_exp_info");
        setExpInfo(Array.isArray(res.data) ? res.data : [res.data]);
        // console.log("Thông tin kinh nghiệm", res.data);
      } catch (e) {
        console.log("Có lỗi khi lấy thông tin kinh nghiệm!", e);
      } finally {
        setLoading(false);
      }
    };
    fetcExpInfo();
  }, []);

  // Hàm xử lý xóa thông tin kinh nghiệm
  const handleDeleteExperience = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa không!")) return;
    setLoading(true);
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/delete_exp_info/${id}`
      );
      setExpInfo((prev) => prev.filter((item) => item.id != id));
      setStatus({
        type: "success",
        message: res.data.message,
      });
      setEditMode(false);
    } catch (e) {
      console.log("Lỗi khi xóa thông tin kinh nghiệm");
      setStatus({
        type: "error",
        message: "Lỗi khi xóa thông tin kinh nghiệm!",
        e,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fas fa-briefcase"></i> Kinh nghiệm
      </h1>
      <div className="flex gap-2">
        {/* Nú thêm thông tin người dùng */}
        {isLogedIn && (!expInfo || expInfo.length === 0) ? (
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
          /* Nút chỉnh sửa  */
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
                <button
                  onClick={() => handleDeleteExperience(expInfo[0].id)}
                  className="bg-red-600 border hover:bg-red-700 transition duration-500 mb-3"
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
        <div className="flex-[7]">
          {/* Hiện thị form thêm thông tin kinh nghiệm */}
          {addMode ? (
            <FormAddExpInfo
              setAddMode={setAddMode}
              setStatus={setStatus}
              setLoading={setLoading}
              loading={loading}
              setExpInfo={setExpInfo}
            ></FormAddExpInfo>
          ) : editMode ? (
            // Chế độ chỉnh sửa thì hiện thị form chỉnh sửa
            <FormUpdateExpInfo
              loading={loading}
              setLoading={setLoading}
              setEditMode={setEditMode}
              setStatus={setStatus}
              expInfo={expInfo}
              setExpInfo={setExpInfo}
            ></FormUpdateExpInfo>
          ) : (
            // Hiện thị thông tin kinh nghiệm
            <div className="exp_info">
              {loading ? (
                <p>
                  <i className="fa-solid fa-spinner fa-spin"></i> Đang tải...
                  Vui lòng chờ!
                </p>
              ) : expInfo.length === 0 ? (
                <p className="text-center">
                  Không có thông tin kinh nghiệm nào!
                </p>
              ) : (
                expInfo[0]?.exp_info && (
                  <p
                    key={expInfo[0].id}
                    className="text-start text-lg mb-4 whitespace-pre-line"
                  >
                    {expInfo[0].exp_info}
                  </p>
                )
              )}
            </div>
          )}
        </div>
        <div className="flex-[3]">
          <img
            src="../../public/experience.png"
            alt="Experience"
            className="w-100% h-100% mx-auto mb-4"
          />
        </div>
      </div>
    </section>
  );
}

export default Experience;
