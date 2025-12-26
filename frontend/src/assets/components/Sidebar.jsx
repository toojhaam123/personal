import { useState } from "react";
import { formatDateVN } from "../utils/dateUtils";
// import FormAddUserInfo from "./form/FormAddUserInfo";
import FormUpdateUserInfo from "./form/FormUpdateUserInfo";
import useUsers from "../hooks/useUsers";
import axiosInstance from "../../config/axios";
function Sidebar({ token, setStatus }) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState({});

  // Lấy thông tin người dùng từ API về hiện thị
  const { user, setUser } = useUsers(); // Thông tin người dùng
  console.log("user, ", user);

  // Hàm xử lý xóa thông tin người dùng
  const handleDeleteUserInfo = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa không!")) return;
    setLoading(true);
    try {
      const res = await axiosInstance.delete("auth/users");
      setUser((prev) => prev.filter((item) => item.id !== id));
      setStatus({
        type: "success",
        message: res.data.message,
      });
      setEditMode(false);
    } catch (err) {
      setStatus({
        type: "error",
        message: "Lỗi khi xóa thông tin người dùng!",
        err,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center h-full w-full">
      <div className="flex text-center justify-center">
        {/* Nút chỉnh sửa  */}
        {token && (
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
                onClick={() => handleDeleteUserInfo(user[0].id)}
                className="border bg-red-600 hover:bg-red-700 transition duration-500 mb-3"
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
        )}
      </div>
      {
        // {/* Nếu ở chế độ chỉnh sửa thì hiện thị form  */}
        editMode ? (
          <FormUpdateUserInfo
            loading={loading}
            setLoading={setLoading}
            setStatus={setStatus}
            setEditMode={setEditMode}
            user={user}
            setUser={setUser}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          ></FormUpdateUserInfo>
        ) : (
          // nếu ko ở trạng thái chỉnh sửa và chế độ thêm thì in ra thông tin
          <div>
            {loading ? (
              <p>
                {" "}
                <i className="fa-solid fa-spinner fa-spin"></i> Đăng tải thông
                tin!
              </p>
            ) : user?.length > 0 ? (
              user?.map((item, index) => (
                <div
                  key={item?.id || index}
                  className="mt-4 space-y-2 text-sm text-start"
                >
                  <div className="w-32 h-32 rounded-full mx-auto flex jusify-center items-center bg-gray-400 overflow-hidden">
                    {item?.avatar ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/avatars/${item?.avatar}`}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <p className="text-gray-100 mx-auto">Avatar</p>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-center">
                    {item?.fullname}
                  </h2>
                  <p className="text-gray-400 text-center">{item?.job_title}</p>
                  {item?.birth && (
                    <p>
                      <i className="fa-solid fa-cake-candles"></i> Năm sinh:{" "}
                      {item?.birth}
                    </p>
                  )}
                  {item?.address && (
                    <p>
                      <i className="fa-solid fa-location-dot"></i> Địa chỉ:{" "}
                      <a href={item?.link_address} target="_blank">
                        {item?.address}
                      </a>
                    </p>
                  )}
                  {item?.email && (
                    <p>
                      <i className="fa-solid fa-envelope"></i> Email:{" "}
                      <a href={`mailto:${item?.email}`}>{item?.email}</a>
                    </p>
                  )}
                  {item?.phone && (
                    <p>
                      <i className="fa-solid fa-phone"></i> Phone:{" "}
                      <a href={`tel:${item?.phone}`}>{item?.phone}</a>
                    </p>
                  )}
                  {item?.facebook && (
                    <p>
                      <i className="fa-brands fa-facebook"></i> Facebook:{" "}
                      <a href={item?.link_facebook} target="_blank">
                        {item?.facebook}
                      </a>
                    </p>
                  )}
                  {item?.github && (
                    <p>
                      <i className="fa-brands fa-github"></i> Github:{" "}
                      <a href={item?.link_github} target="_blank">
                        {item?.github}
                      </a>
                    </p>
                  )}
                  {item?.updated_at && (
                    <p className="text-[10px]">
                      <i>Cập nhật lần cuối: {formatDateVN(item?.updated_at)}</i>
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="border-b-2">Không có thông tin người dùng</p>
            )}
          </div>
        )
      }
    </div>
  );
}

export default Sidebar;
