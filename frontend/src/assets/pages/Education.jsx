import React, { useEffect, useState } from "react";
import useStatus from "../hooks/useStatus";
import axios from "axios";
import FormAddEduInfo from "../components/form/FormAddEduInfo";
function Education() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { status, setStatus, visible } = useStatus();
  const [eduInfo, setEduInfo] = useState([]);
  const isLogedIn = localStorage.getItem("token");
  const [addMode, setAddMode] = useState(false);

  useEffect(() => {
    const fetchEduInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/get_edu_info");
        setEduInfo(res.data);
        console.log("Thông tin học vấn: ", res.data);
      } catch (e) {
        console.log("Có lỗi khi lấy thông tin học vấn!", e);
      } finally {
        setLoading(false);
      }
    };
    fetchEduInfo();
  }, []);

  // Xử lý thay đổi khi người dùng nhập vào textarea
  const handleChangeUpdateEduInfo = (e, id) => {
    const newValue = e.target.value;

    // cập nhật thông tin với giá trị mới
    setEduInfo((edu) =>
      edu.map((item) =>
        item.id === id ? { ...item, edu_info: newValue } : item
      )
    );
  };

  // Xử lý thông tin submit
  const handleSubmitEduInfoUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const edu = eduInfo[0];
      const res = await axios.post(
        `http://127.0.0.1:8000/api/update_edu_info/${edu.id}`,
        {
          edu_info: edu.edu_info,
        }
      );
      setEditMode(false);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (e) {
      console.log("Lỗi khi lấy thông tin học vấn: ", e);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa thông tin học vấn
  const handleDeleteEduInffo = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa không!")) return;
    setLoading(true);

    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/delete_edu_info/${id}`
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
      {status && (
        <div
          className={`rounded mb-3 transition-opacity duration-500 p-3
            ${visible ? "opacity-100" : "opacity-0"}
            ${
              status.type === "success"
                ? "bg-green-100 text-green-700 font-bolt"
                : "bg-red-100 text-red-700 font-bolt"
            }`}
        >
          {status.message}
        </div>
      )}
      <div className="flex gap-2">
        {/* Nút thêm */}
        {isLogedIn && (!eduInfo || eduInfo.length === 0) ? (
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
              setAddMode={setAddMode}
              setStatus={setStatus}
              setLoading={setLoading}
              loading={loading}
              setEduInfo={setEduInfo}
            ></FormAddEduInfo>
          ) : editMode ? (
            <form action="" method="post" onSubmit={handleSubmitEduInfoUpdate}>
              {eduInfo.map((edu) => (
                <textarea
                  key={edu.id}
                  name="edu_info"
                  rows={10}
                  value={edu.edu_info}
                  onChange={(e) => handleChangeUpdateEduInfo(e, edu.id)}
                  id="edu_info"
                  className="w-full rounded-lg bg-white text-black p-2 text-lg whitespace-pre-line"
                ></textarea>
              ))}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition duration-500 scroll-hidden"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Đang lưu...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-floppy-disk"></i> Lưu{" "}
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="edu_info">
              {loading ? (
                <p>
                  <i className="fa-solid fa-spinner fa-spin"></i> Đang tải...
                  Vui lòng chờ!
                </p>
              ) : (
                eduInfo.map((edu) => (
                  <p
                    key={edu.id}
                    className="text-start text-lg mb-4 whitespace-pre-line"
                  >
                    {edu.edu_info}
                  </p>
                ))
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
