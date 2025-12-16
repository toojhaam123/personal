import React, { useEffect, useState } from "react";
import axios from "axios";
import FormAddEduInfo from "../../components/form/FormAddEduInfo";
import FormUpdateEduInfo from "../form/FormUpdateEduInfo";
function Education({ token, setStatus }) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [eduInfo, setEduInfo] = useState([]);

  // Gọi API thông tin học vấn
  useEffect(() => {
    const fetchEduInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http:///127.0.0.1:8000/api/educations");
        setEduInfo(res.data);
      } catch (e) {
        console.log("Có lỗi khi lấy thông tin học vấn!", e);
      } finally {
        setLoading(false);
      }
    };
    fetchEduInfo();
  }, []);

  // Xử lý xóa thông tin học vấn
  const handleDeleteEduInffo = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa không!")) return;
    setLoading(true);

    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/educations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEduInfo((prev) => prev.filter((item) => item.id != id));
      setEditMode(false);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (e) {
      setStatus({
        type: "error",
        message: "Xóa thông tin học vấn thất bại!",
        e,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fas fa-graduation-cap"></i> Học vấn
      </h1>
      <div className="flex gap-2">
        {/* Nút thêm */}
        {token && (!eduInfo || eduInfo.length === 0) ? (
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
                  onClick={() => handleDeleteEduInffo(eduInfo[0].id)}
                  className="bg-red-600 border hover:bg-red-700 mb-3 transition duration-500"
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
          {/* Form thêm thông tin học vấn */}
          {addMode ? (
            <FormAddEduInfo
              token={token}
              setAddMode={setAddMode}
              setStatus={setStatus}
              setLoading={setLoading}
              loading={loading}
              setEduInfo={setEduInfo}
            ></FormAddEduInfo>
          ) : editMode ? (
            // Form chỉnh sửa
            <FormUpdateEduInfo
              token={token}
              loading={loading}
              setLoading={setLoading}
              setEditMode={setEditMode}
              setStatus={setStatus}
              eduInfo={eduInfo}
              setEduInfo={setEduInfo}
            ></FormUpdateEduInfo>
          ) : (
            <div className="edu_info">
              {loading ? (
                <p>
                  <i className="fa-solid fa-spinner fa-spin"></i> Đang tải...
                  Vui lòng chờ!
                </p>
              ) : eduInfo.length === 0 ? (
                <p className="text-center">Không có thông tin học vấn!</p>
              ) : (
                eduInfo?.[0]?.edu_info && (
                  <p
                    key={eduInfo[0].id}
                    className="text-start text-lg mb-4 whitespace-pre-line"
                  >
                    {eduInfo[0].edu_info}
                  </p>
                )
              )}
            </div>
          )}
        </div>
        <div className="flex-[3]">
          <img
            src="../../public/education.png"
            alt="Education"
            className="w-100% h-100% mx-auto mb-4"
          />
        </div>
      </div>
    </section>
  );
}
export default Education;
