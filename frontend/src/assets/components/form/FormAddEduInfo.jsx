import axiosInstance from "../../../utils/axiosPrivate";
import { useState } from "react";
function FormAddEduInfo({
  setAddMode,
  loading,
  setLoading,
  setStatus,
  setEduInfo,
}) {
  const [addEduInfo, setAddEduInfo] = useState({
    edu_info: "",
  });

  // Xử lý khi nhập thông tin
  const handleChangAddEduInfo = (e) => {
    setAddEduInfo({ ...addEduInfo, [e.target.name]: e.target.value });
  };

  // Xử lý submit thêm thông tin học vấn
  const handleSubmitAddEduInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("educations", addEduInfo);

      // Reset lại form
      setAddEduInfo({
        edu_info: "",
      });

      setStatus({
        type: "success",
        message: res.data.message,
      });

      setAddMode(false);
      setEduInfo((prev) => [res.data.data, ...prev]);
    } catch (e) {
      setStatus({
        type: "error",
        message: "Lỗi khi thêm thông tin học vấn!",
        e,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form action="" method="post" onSubmit={handleSubmitAddEduInfo}>
      <textarea
        name="edu_info"
        rows={10}
        onChange={(e) => handleChangAddEduInfo(e)}
        id="edu_info"
        className="w-full rounded-lg bg-white text-black p-2 text-lg whitespace-pre-line"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition duration-500 scroll-hidden"
        disabled={loading}
      >
        {loading ? (
          <>
            <i className="fa-solid fa-spinner fa-spin"></i> Đang thêm...
          </>
        ) : (
          <>
            <i className="fa-solid fa-floppy-disk"></i> Thêm{" "}
          </>
        )}
      </button>
    </form>
  );
}
export default FormAddEduInfo;
