import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import { Form, NavLink } from "react-router-dom";
import { formatDateVN } from "../utils/dateUtils";
import FormAddUserInfo from "./form/FormAddUserInfo";
import FormUpdateUserInfo from "./form/FormUpdateUserInfo";
import axios from "axios";
function Sidebar({ token, setStatus }) {
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState({});

  // Lấy thông tin người dùng từ API về hiện thị
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/user-info");
        setUserInfo(Array.isArray(res.data) ? res.data : [res.data]);
        // console.log("Dữ liệu nhận đc:", res.data);
      } catch (e) {
        console.log("Lỗi khi lấy dữ liệu", e);
        setStatus({
          type: "error",
          message: "Lỗi server, không lấy đc dữ liệu!",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  // Hàm xử lý xóa thông tin người dùng
  const handleDeleteUserInfo = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa không!")) return;
    setLoading(true);
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/user-info/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserInfo((prev) => prev.filter((item) => item.id !== id));
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
    <div className="text-center max-vh-100 flex flex-col">
      <div className="flex gap-2 text-center justify-center">
        {/* Nút thêm thông tin người dùng */}
        {token && (!userInfo || userInfo.length === 0) ? (
          <button
            type="button"
            onClick={() => setAddMode(!addMode)}
            className="border bg-blue-600 hover:bg-blue-700 transition duration-500 mb-3"
          >
            {addMode ? (
              <>
                {" "}
                <i className="fa-solid fa-xmark"></i> Hủy
              </>
            ) : (
              <>
                {" "}
                <i className="fa-solid fa-plus"></i> Thêm
              </>
            )}
          </button>
        ) : (
          // {/* Nút chỉnh sửa  */}
          token && (
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
                  onClick={() => handleDeleteUserInfo(userInfo[0].id)}
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
          )
        )}
      </div>
      {/* Nếu ở chế độ thêm thì hiện form thêm thông tin người dùng */}
      {addMode ? (
        <FormAddUserInfo
          token={token}
          loading={loading}
          setLoading={setLoading}
          setAddMode={setAddMode}
          setStatus={setStatus}
          setUserInfo={setUserInfo}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        ></FormAddUserInfo>
      ) : // {/* Nếu ở chế độ chỉnh sửa thì hiện thị form  */}
      editMode ? (
        <FormUpdateUserInfo
          token={token}
          loading={loading}
          setLoading={setLoading}
          setStatus={setStatus}
          setEditMode={setEditMode}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
        ></FormUpdateUserInfo>
      ) : (
        // nếu ko ở trạng thái chỉnh sửa và chế độ thêm thì in ra thông tin
        <div className="infomation">
          {loading ? (
            <p>
              {" "}
              <i className="fa-solid fa-spinner fa-spin"></i> Đăng tải thông
              tin!
            </p>
          ) : userInfo.length > 0 ? (
            userInfo.map((item) => (
              <div key={item.id} className="mt-4 space-y-2 text-sm text-start">
                <img
                  src={`http://127.0.0.1:8000/storage/avatars/${item.avatar}`}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-bold text-center">
                  {item.fullname}
                </h2>
                <p className="text-gray-400 text-center">{item.job_title}</p>
                {item.birth && (
                  <p>
                    <i className="fa-solid fa-cake-candles"></i> Năm sinh:{" "}
                    {item.birth}
                  </p>
                )}
                {item.address && (
                  <p>
                    <i className="fa-solid fa-location-dot"></i> Địa chỉ:{" "}
                    <a href={item.link_address} target="_blank">
                      {item.address}
                    </a>
                  </p>
                )}
                {item.email && (
                  <p>
                    <i className="fa-solid fa-envelope"></i> Email:{" "}
                    <a href={`mailto:${item.email}`}>{item.email}</a>
                  </p>
                )}
                {item.phone && (
                  <p>
                    <i className="fa-solid fa-phone"></i> Phone:{" "}
                    <a href={`tel:${item.phone}`}>{item.phone}</a>
                  </p>
                )}
                {item.facebook && (
                  <p>
                    <i className="fa-brands fa-facebook"></i> Facebook:{" "}
                    <a href={item.link_facebook} target="_blank">
                      {item.facebook}
                    </a>
                  </p>
                )}
                {item.github && (
                  <p>
                    <i className="fa-brands fa-github"></i> Github:{" "}
                    <a href={item.link_github} target="_blank">
                      {item.github}
                    </a>
                  </p>
                )}
                {item.updated_at && (
                  <p className="text-[10px]">
                    <i>Cập nhật lần cuối: {formatDateVN(item.updated_at)}</i>
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="border-b-2">Không có thông tin người dùng</p>
          )}

          <div className="mt-5">
            {!token && (
              <div className="login">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `hover:text-white bg-blue-600 py-2 px-4 rounded mt-5 ${
                      isActive
                        ? "text-white "
                        : "bg-blue-600 text-white rounded w-100 p-2"
                    }`
                  }
                >
                  <i className="fa-solid fa-right-to-bracket"></i> Đăng nhập
                </NavLink>
              </div>
            )}
          </div>
          {token && <Logout setStatus={setStatus} />}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
