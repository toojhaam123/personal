import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDateVN } from "../utils/dateUtils";
import FormUpdateUserInfo from "./form/FormUpdateUserInfo";
import useUser from "../hooks/useUser";
import axiosPrivate from "@/utils/axiosPrivate";
function Sidebar({ token, setStatus }) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ API về hiện thị
  const { user, setUser } = useUser(); // Thông tin người dùng

  // Hàm xử lý xóa thông tin người dùng
  const handleDeleteUserInfo = async () => {
    // hiện thị hộp thoại xác nhận xóa
    const result = await Swal.fire({
      title: "Bạn có chắc chắn!",
      text: "Tài khoản sẽ bị xóa vĩnh viễn",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red", // Màu đỏ cho nút xóa
      cancelButtonColor: "green", // Màu xanh cho nút thoát
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await axiosPrivate.delete("users");
        // Thông báo thành công
        await Swal.fire({
          title: "Xóa thành công!",
          text: "Tài khoản đã xóa khỏi hệ thống!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setEditMode(false);
        // Xóa token
        localStorage.removeItem("token");
        navigate("/");
      } catch (err) {
        Swal.fire({
          title: "Lỗi!",
          text:
            err.response?.data?.message ||
            "Không thể xóa thông tin, vui lòng thử lại.",
          icon: "error",
          confirmButtonText: "Đã hiểu",
        });
        console.log("Lỗi chi tiết: ", err.response?.data);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="">
      <div className="flex text-center justify-center">
        {/* Nút chỉnh sửa  */}
        {token && (
          <>
            <div className="flex gap-2">
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
                  type="button"
                  onClick={handleDeleteUserInfo}
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
            </div>
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
            ) : user ? (
              <div
                key={user?.id}
                className="space-y-2 text-sm text-start h-[76vh]"
              >
                <div className="w-32 h-32 rounded-full mx-auto flex justify-center items-center bg-gray-400 overflow-hidden">
                  {user?.avatar ? (
                    <img
                      src={`http://127.0.0.1:8000/storage/avatars/${user?.avatar}`}
                      alt="Ảnh"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-100 mx-auto">Ảnh</p>
                  )}
                </div>
                <h2 className="text-xl font-bold text-center">
                  {user?.fullname}
                </h2>
                <p className="text-gray-400 text-center">{user?.job_title}</p>
                {user?.birth && (
                  <p>
                    <i className="fa-solid fa-cake-candles"></i> Năm sinh:{" "}
                    {user?.birth}
                  </p>
                )}
                {user?.address && (
                  <p>
                    <i className="fa-solid fa-location-dot"></i> Địa chỉ:{" "}
                    <a href={user?.link_address} target="_blank">
                      {user?.address}
                    </a>
                  </p>
                )}
                {user?.email && (
                  <p>
                    <i className="fa-solid fa-envelope"></i> Email:{" "}
                    <a href={`mailto:${user?.email}`}>{user?.email}</a>
                  </p>
                )}
                {user?.phone && (
                  <p>
                    <i className="fa-solid fa-phone"></i> Phone:{" "}
                    <a href={`tel:${user?.phone}`}>{user?.phone}</a>
                  </p>
                )}
                {user?.facebook && (
                  <p>
                    <i className="fa-brands fa-facebook"></i> Facebook:{" "}
                    <a href={user?.link_facebook} target="_blank">
                      {user?.facebook}
                    </a>
                  </p>
                )}
                {user?.github && (
                  <p>
                    <i className="fa-brands fa-github"></i> Github:{" "}
                    <a href={user?.link_github} target="_blank">
                      {user?.github}
                    </a>
                  </p>
                )}
                {user?.updated_at && (
                  <p className="text-[10px]">
                    <i>Cập nhật lần cuối: {formatDateVN(user?.updated_at)}</i>
                  </p>
                )}
              </div>
            ) : (
              <div className="h-[82vh] flex justify-center items-center">
                <p className="border-b-2">Không có thông tin người dùng</p>
              </div>
            )}
          </div>
        )
      }
    </div>
  );
}

export default Sidebar;
