import axiosPrivate from "@/utils/axiosPrivate";

function FormUpdateExpInfo({
  loading,
  setLoading,
  setEditMode,
  setStatus,
  expInfo,
  setExpInfo,
}) {
  // Xử lý thay đổi khi chỉnh sửa thông tin kinh nghiệm
  const handleChangeUpdateExpInfo = (e) => {
    const { name, value } = e.target;

    // Cập nhật thông tin với giá trị mới
    setExpInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý submit khi chỉnh sửa thông tin kinh nghiệm
  const handleSubmitUpdateExpInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosPrivate.post("experiences", {
        exp_info: expInfo.exp_info,
      });
      setEditMode(false);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (e) {
      console.log("Lỗi khi cập nhật thông tin kinh nghiệm!", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmitUpdateExpInfo} method="post">
      {expInfo && (
        <div key={expInfo?.id}>
          <textarea
            name="exp_info"
            id="exp_info"
            onChange={(e) => handleChangeUpdateExpInfo(e)}
            rows={10}
            value={expInfo?.exp_info || ""}
            className="text-black bg-white w-full rounded-lg p-2 text-lg whitespace-pre-line"
          ></textarea>
        </div>
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
export default FormUpdateExpInfo;
