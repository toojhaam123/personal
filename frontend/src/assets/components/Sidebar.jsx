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
      confirmButtonColor: "#ef4444", // Màu đỏ cho nút xóa
      cancelButtonColor: "#64748b", // Màu xanh cho nút thoát
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      borderRadius: "15px",
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await axiosPrivate.delete("users");
        // Thông báo thành công
        await Swal.fire({
          title: "Đã xóa!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        setEditMode(false);
        // Xóa token
        localStorage.removeItem("token");
        navigate("/");
      } catch (e) {
        Swal.fire("Lỗi!", "Không thể xóa thông tin.", "error", e);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded 2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
      {/* Nút chỉnh sửa  */}
      {token && (
        <div className="flex gap-2 justify-center mb-4">
          <button
            type="button"
            onClick={() => setEditMode(!editMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
              editMode
                ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30"
            }`}
          >
            <i
              className={`fa-solid ${
                editMode ? "fa-xmark" : "fa-pen-to-square"
              }`}
            ></i>
            {editMode ? "Hủy" : "Chỉnh sửa"}
          </button>
          {/* Nút xóa */}
          {editMode && (
            <button
              type="button"
              onClick={handleDeleteUserInfo}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-full text-sm font-medium transition-all duration-500"
              disabled={loading}
            >
              <i
                className={`fa-solid ${
                  loading ? "fa-spinner fa-spin" : "fa-trash-can"
                }`}
              ></i>
              {loading ? "Đang xóa..." : "Xóa"}
            </button>
          )}
        </div>
      )}
      {/* Nếu ở chế độ chỉnh sửa thì hiện thị form  */}
      {editMode ? (
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
        <div className="flex flex-col items-center">
          {loading ? (
            <div className="py-20 text-slate-400">
              {" "}
              <i className="fa-solid fa-spinner fa-spin text-2xl mb-2"></i>
              <p> Đăng tải thông tin!</p>
            </div>
          ) : user ? (
            <div className="space-y-3 w-full">
              {/* Phần Avatar và Name */}
              <div className="text-center ">
                <div className="relative group w-32 h-32 mx-auto mb-1 ">
                  <div className="w-full h-full rounded-full ring-4 ring-blue-50 dark:ring-slate-800 overflow-hidden shadow-inherit bg-slate-100">
                    {user?.avatar ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/avatars/${user?.avatar}`}
                        alt="Ảnh"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text:slate-400">
                        <i className="fa-solid fa-user text-4xl"></i>
                      </div>
                    )}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text:slate-800 dark:text-white uppercase tracking-tight">
                  {user?.fullname}
                </h2>
                <p className="text-blue-600 dark:text-blue-400 fornt-medium">
                  {user?.job_title}
                </p>
              </div>
              {/* Danh sách thông tin liên hệ */}
              <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                <InfoItem
                  icon="fa-cake-candles"
                  label="Năm sinh"
                  value={user?.birth}
                />
                <InfoItem
                  icon="fa-location-dot"
                  label="Địa chỉ"
                  value={user?.address}
                  link={user?.link_address}
                />
                <InfoItem
                  icon="fa-envelope"
                  label="Email"
                  value={user?.email}
                  link={`mailto:${user?.email}`}
                />
                <InfoItem
                  icon="fa-phone"
                  label="SĐT"
                  value={user?.phone}
                  link={`tel:${user?.phone}`}
                />
                <InfoItem
                  icon="fa-facebook"
                  label="Facebook"
                  value={user?.facebook}
                  link={`${user.link_facebook}`}
                  isBrand
                />
                <InfoItem
                  icon="fa-github"
                  label="Github"
                  value={user?.github}
                  link={`${user?.link_github}`}
                  isBrand
                />
              </div>

              {user?.updated_at && (
                <p className="text-center text-[10px] text-salte-400 italic pt-4">
                  <i>Cập nhật lần cuối: {formatDateVN(user?.updated_at)}</i>
                </p>
              )}
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl w-full">
              <p>Chưa có dữ liệu cá nhân</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Component phụ render từng dòng từng dòng thông tin cho gọn code
function InfoItem({ icon, label, value, link, isBrand = false }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 group text-slate-600 dark:text-slate-400">
      <div
        className="w-8 h-8 my-auto rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center 
      justify-center text-slate-400 group-hover:text-blue-500 transition-colors shrink-0"
      >
        <i className={`${isBrand ? "fa-brands" : "fa-solid"} ${icon}`}></i>
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-start uppercase tracking-widest text-slate-400 font-semibold">
          {label}
        </span>
        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium hover:text-blue-600 transition-colors text-start"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {value}
          </span>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
