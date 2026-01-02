import { useEffect, useState } from "react";
import axiosPublic from "@/utils/axiosPublic";
import axiosPrivate from "@/utils/axiosPrivate";
import FormAddEduInfo from "../../components/form/FormAddEduInfo";
import FormUpdateEduInfo from "../form/FormUpdateEduInfo";
import { useParams } from "react-router-dom";
function Education({ token, setStatus }) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [eduInfo, setEduInfo] = useState(null);
  const { username } = useParams();
  // Gọi API thông tin học vấn
  useEffect(() => {
    const fetchEduInfo = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(`educations/${username}`);
        setEduInfo(res.data);
      } catch (e) {
        console.log("Có lỗi khi lấy thông tin học vấn!", e.response?.data);
        let error;
        let status = e.response.status;
        if (status === 404) {
          error = e.response.data.message;
        } else if (status === 500) {
          error = "Lỗi hệ thống (Server Error)!";
        }
        setStatus({ type: "error", message: error });
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
      const res = await axiosPrivate.delete(`educations/${id}`);

      setEduInfo("");
      setEditMode(false);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (e) {
      console.log("Lỗi xóa ducation: ", e.response?.data);
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
        {token && !eduInfo ? (
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
                  onClick={() => handleDeleteEduInffo(eduInfo?.id)}
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
            // Form chỉnh sửa
            <FormUpdateEduInfo
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
              ) : eduInfo ? (
                <p
                  key={eduInfo?.id}
                  className="text-start text-lg mb-4 whitespace-pre-line"
                >
                  {eduInfo?.edu_info}
                </p>
              ) : (
                <p className="text-center">Không có thông tin học vấn!</p>
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
