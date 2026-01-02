import axiosPrivate from "@/utils/axiosPrivate";

function FormUpdateSkillInfo({
  loading,
  setLoading,
  setEditMode,
  setStatus,
  skillInfo,
  setSkillInfo,
}) {
  // Xử lý thay đổi nhập thông tin cập nhập
  const handleChangUpdateSkillInfo = (e) => {
    const { name, value } = e.target;

    // Cập nhật thông tin với giá trị mới
    setSkillInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý Submit gửi cập nhật
  const handleSubmitUpdateSkillInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosPrivate.post(`skills`, {
        skill_info: skillInfo.skill_info,
      });
      setEditMode(false);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (e) {
      console.log("Lỗi cập nhật thông tin kỹ năng:", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form method="post" onSubmit={handleSubmitUpdateSkillInfo}>
      <div key={skillInfo?.id}>
        <textarea
          name="skill_info"
          rows={10}
          id="skill_info"
          value={skillInfo?.skill_info}
          onChange={(e) => handleChangUpdateSkillInfo(e)}
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
            <i className="fa-solid fa-spinner fa-spin"></i> Đang lưu...
          </>
        ) : (
          <>
            <i className="fa-solid fa-floppy-disk"></i> Lưu{" "}
          </>
        )}
      </button>
    </form>
  );
}
export default FormUpdateSkillInfo;
