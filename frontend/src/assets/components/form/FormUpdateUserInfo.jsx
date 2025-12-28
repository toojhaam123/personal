import axiosInstance from "../../../config/axios";

function FormUpdateUserInfo({
  loading,
  setLoading,
  setStatus,
  setEditMode,
  user,
  setUser,
  previewImage,
  setPreviewImage,
}) {
  // Dùng để hiện thị avatar
  const avatarSrc = previewImage
    ? previewImage
    : user?.avatar
    ? `http://127.0.0.1:8000/storage/avatars/${user?.avatar}`
    : null;

  // Hàm xử lý thay đổi khi nhập cập nhập thông tin
  const handleChangeUdateUserInfo = (e) => {
    const { name, value, files } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: files && files.length > 0 ? files[0] : value,
    }));

    // nếu là input file tạo preview avatr
    if (name === "avatar" && files && files.length > 0) {
      setPreviewImage(URL.createObjectURL(files[0]));
    }
  };

  // Hàm xử lý chỉnh sửa thông tin người dùng
  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Duyệt tất cả các key trong userToUpdate để gửi
      Object.keys(user).forEach((key) => {
        const value = user[key];

        if (key === "avatar") {
          if (value instanceof File) {
            formData.append("avatar", value);
          }
        } else if (value != null && value !== "null" && value !== undefined) {
          formData.append(key, value);
        }
      });

      const res = await axiosInstance.post("users", formData);

      // cập nhập ngay ảnh mới
      setUser((prev) => ({
        ...prev,
        avatar: res.data.data.avatar,
      }));

      setStatus({
        type: "success",
        message: res.data.message,
      });
      setEditMode(false);
    } catch (e) {
      setStatus({
        type: "error",
        message: "Cập nhật bị lỗi!",
        e,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {user && (
        <div className="px-5">
          <form
            key={user.id}
            onSubmit={(e) => handleUpdateUserInfo(e)}
            method="post"
          >
            <div className="w-32 h-32 rounded-full mx-auto flex justify-center items-center bg-gray-400 overflow-hidden">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt="Ảnh xem trước"
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className="text-sm select-none text-gray-100">Ảnh</p>
              )}
            </div>
            <label htmlFor="avatar" className="float-start">
              Chọn ảnh
            </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              onChange={(e) => handleChangeUdateUserInfo(e)}
              className="w-full p-2 border bg-white text-black mb-2 rounded-lg"
            />
            <label htmlFor="fullname" className="float-start">
              Họ và tên
            </label>
            <input
              id="fullname"
              name="fullname"
              className="w-full p-2 border rounded-lg bg-white text-black mb-2"
              type="text"
              onChange={(e) => handleChangeUdateUserInfo(e)}
              value={user.fullname ? user.fullname : ""}
              placeholder="Họ và tên"
            />
            <label htmlFor="jobtitle" className="float-start">
              Chức danh
            </label>
            <input
              id="jobtitle"
              name="job_title"
              className="w-full p-2 border rounded-lg bg-white text-black mb-2"
              type="text"
              onChange={(e) => handleChangeUdateUserInfo(e)}
              value={user.job_title ? user.job_title : ""}
              placeholder="Chức danh"
            />
            <label htmlFor="birth" className="float-start">
              Năm sinh
            </label>
            <input
              type="text"
              id="birth"
              name="birth"
              placeholder="Năm sinh"
              onChange={(e) => handleChangeUdateUserInfo(e)}
              value={user.birth ? user.birth : ""}
              className="w-full p-2 rounded-lg border text-black bg-white mb-2"
            />
            <div className="border border-white p-2 rounded-lg">
              <label htmlFor="address" className="float-start">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                onChange={(e) => handleChangeUdateUserInfo(e)}
                className="w-full p-2 rounded-lg border text-black bg-white mb-2"
                id="address"
                value={user.address ? user.address : ""}
                placeholder="Địa chi"
              />
              <label htmlFor="link_address" className="float-start">
                Link Google Map
              </label>
              <input
                type="url"
                name="link_address"
                id="link_address"
                onChange={(e) => handleChangeUdateUserInfo(e)}
                value={user.link_address ? user.link_address : ""}
                className="w-full p-2 rounded-lg border text-black bg-white mb-2"
                placeholder="Link địa chỉ"
              />
            </div>
            <label htmlFor="email" className="float-start">
              Email
            </label>
            <input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              onChange={(e) => handleChangeUdateUserInfo(e)}
              value={user.email ? user.email : ""}
              className="w-full p-2 rounded-lg border text-black bg-white mb-2"
            />
            <label htmlFor="phone" className="float-start">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={user.phone ? user.phone : ""}
              placeholder="Số điện thoại"
              onChange={(e) => handleChangeUdateUserInfo(e)}
              className="w-full p-2 rounded-lg border text-black bg-white mb-2"
            />
            <div className="border border-white p-2 rounded-lg">
              <label htmlFor="facebook" className="float-start">
                Facebook
              </label>
              <input
                type="text"
                name="facebook"
                value={user.facebook ? user.facebook : ""}
                className="w-full p-2 rounded-lg border text-black bg-white mb-2"
                id="facebook"
                onChange={(e) => handleChangeUdateUserInfo(e)}
                placeholder="Facebook"
              />
              <label htmlFor="" className="float-start">
                Link Facebook
              </label>
              <input
                type="url"
                id="link_facebook"
                name="link_facebook"
                onChange={(e) => handleChangeUdateUserInfo(e)}
                value={user.link_facebook ? user.link_facebook : ""}
                className="w-full p-2 rounded-lg border text-black bg-white mb-2"
                placeholder="Link facebook"
              />
            </div>
            <div className="border border-white p-2 rounded-lg my-2">
              <label htmlFor="github" className="float-start">
                Github
              </label>
              <input
                type="text"
                name="github"
                onChange={(e) => handleChangeUdateUserInfo(e)}
                value={user.github ? user.github : ""}
                className="w-full p-2 rounded-lg border text-black bg-white mb-2"
                id="github"
                placeholder="Github"
              />
              <label htmlFor="" className="float-start">
                Link github
              </label>
              <input
                type="url"
                id="link_github"
                name="link_github"
                onChange={(e) => handleChangeUdateUserInfo(e)}
                value={user.link_github ? user.link_github : ""}
                className="w-full p-2 rounded-lg border text-black bg-white mb-2"
                placeholder="Link github"
              />
            </div>
            <button
              type="submit"
              className="btn-save sticky bottom-0 bg-blue-600 px-6 py-2 hover:bg-blue-700 transition duration-500"
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
        </div>
      )}
    </>
  );
}

export default FormUpdateUserInfo;
