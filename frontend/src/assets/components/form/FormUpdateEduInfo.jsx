import axiosInstance from "../../../utils/axiosPrivate";

function FormUpdateEduInfo({
  loading,
  setLoading,
  setEditMode,
  setStatus,
  eduInfo,
  setEduInfo,
}) {
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

  // Xử lý thông tin submit khi chỉnh sửa thoogn tin học vând
  const handleSubmitEduInfoUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const edu = eduInfo[0];
      const res = await axiosInstance.post(`educations/${edu.id}`, {
        edu_info: edu.edu_info,
      });
      setEditMode(false);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (e) {
      console.log("Lỗi khi chỉnh sửa thông tin học vấn!", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form action="" method="post" onSubmit={handleSubmitEduInfoUpdate}>
      {eduInfo?.[0]?.edu_info && (
        <textarea
          key={eduInfo[0].id}
          name="edu_info"
          rows={10}
          value={eduInfo[0].edu_info}
          onChange={(e) => handleChangeUpdateEduInfo(e, eduInfo[0].id)}
          id="edu_info"
          className="w-full rounded-lg bg-white text-black p-2 text-lg whitespace-pre-line"
        ></textarea>
      )}
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

export default FormUpdateEduInfo;
