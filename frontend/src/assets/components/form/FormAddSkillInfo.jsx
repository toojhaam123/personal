import axiosInstance from "../../../utils/axiosPrivate";
import { useState } from "react";

function FormAddSkillInfo({
  setAddMode,
  loading,
  setLoading,
  setStatus,
  setSkillInfo,
}) {
  const [addSkillInfo, setAddSkillInfo] = useState({
    skill_info: "",
  });

  // Hàm xử lý khi nhập thông tin
  const handleChangAddSkillInfo = (e) => {
    setAddSkillInfo({
      ...addSkillInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Hàm xử lý khi thêm thông tin kỹ năng
  const handleSubmitAddSkillInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("skills", addSkillInfo);

      // Reset lại form
      setAddSkillInfo({
        skill_info: "",
      });

      setStatus({
        type: "success",
        message: res.data.message,
      });
      setAddMode(false);
      setSkillInfo((prev) => [res.data.data, ...prev]);
    } catch (e) {
      setStatus({
        type: "error",
        message: "Lỗi khi thêm thông tin kỹ năng!",
        e,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form action="" method="post" onSubmit={handleSubmitAddSkillInfo}>
      <div>
        <textarea
          name="skill_info"
          rows={10}
          id="skill_info"
          onChange={(e) => handleChangAddSkillInfo(e)}
          className="w-full text-black bg-white rounded p-2 mb-2 text-lg"
        ></textarea>
      </div>

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

export default FormAddSkillInfo;
