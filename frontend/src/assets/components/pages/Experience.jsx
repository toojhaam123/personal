import axiosInstance from "../../../utils/axiosPrivate";
import { useEffect, useState } from "react";
import FormAddExpInfo from "../../components/form/FormAddExpInfo";
import FormUpdateExpInfo from "../../components/form/FormUpdateExpInfo";
function Experience({ token, setStatus }) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [expInfo, setExpInfo] = useState([]);
  useEffect(() => {
    // Lấy thông tin kinh nghiệm từ API gửi về
    const fetcExpInfo = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("experiences");
        setExpInfo(Array.isArray(res.data) ? res.data : [res.data]);
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
      const res = await axiosInstance.delete(`experiences/${id}`);
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
        {token && (!expInfo || expInfo.length === 0) ? (
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
