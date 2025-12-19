import axiosInstance from "../../../config/axios";

function FormUpdateSkillInfo({
  loading,
  setLoading,
  setEditMode,
  setStatus,
  skillInfo,
  setSkillInfo,
}) {
  // Xử lý thay đổi nhập thông tin cập nhập
  const handleChangUpdateSkillInfo = (e, id) => {
    const newValue = e.target.value;

    // Cập nhật thông tin với giá trị mới
    setSkillInfo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, skill_info: newValue } : item
      )
    );
  };

  // Xử lý Submit gửi cập nhật
  const handleSubmitSkillInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const skill = skillInfo[0];
      const res = await axiosInstance.post(`skills/${skill.id}`, {
        skill_info: skill.skill_info,
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
    <form action="" method="post" onSubmit={handleSubmitSkillInfo}>
      {skillInfo.map((item) => (
        <div key={item.id}>
          <textarea
            name="skill_info"
            rows={10}
            id="skill_info"
            value={item.skill_info}
            onChange={(e) => handleChangUpdateSkillInfo(e, item.id)}
            className="w-full text-black bg-white rounded p-2 mb-2 text-lg"
          ></textarea>
        </div>
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
  );
}
export default FormUpdateSkillInfo;
