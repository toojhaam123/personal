import axiosInstance from "../../../utils/axiosPrivate";
import { useState, useEffect } from "react";
import { formatDateVN } from "../../../utils/dateUtils";
import { truncatetext } from "@/assets/utils/stringUtils";
import { Link, useParams } from "react-router-dom";
import useMeInfo from "@/assets/hooks/useMeInfo";
function Notification() {
  // Lấy thông tin từ bảng contacts ra để hiện thị
  const [notifaction, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const base = `/${username}`;
  const { me } = useMeInfo();

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    if (diffInSeconds < 60) return "Vừa xong";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} giờ trước`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ngày trước`;

    // Nếu quá 7 ngày thì hiện ngày tháng cụ thể
    return new Date(date).toLocaleDateString("vi-VN");
  };

  useEffect(() => {
    const fetchNotification = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`${username}/contacts`);
        setNotification(res.data.data);
      } catch (error) {
        console.error("Lỗi lấy thông báo nhé!", error.response?.data);
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchNotification();
  }, [username]);
  return (
    <section className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center gap-5 mb-5">
        <h1 className="font-bold text-slate-800 dark:text-white text-3xl">
          <i className="fa fa-bell text-red-500 mr-3"></i>Thông báo
        </h1>
        <span className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 mt-2 py-1 rounded-full">
          Bạn có {notifaction.length} liên hệ
        </span>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-[7]">
          {loading ? (
            <div className="flex -flex-col items-center justify-center py-20">
              <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-500"></i>{" "}
              <p className="text-slate-500">Đang tải... Vui lòng chờ!</p>
            </div>
          ) : me?.username !== username ? (
            <div className="bg-yellow-500 border border-yellow-500 p-4 rounded-lg text-yelow-700">
              <i className="fa-solid fa-triangle-exclamation mr-2"></i>
              Bạn không có quyền xem hoặc người dùng không tồn tại. Trân trọng!
            </div>
          ) : notifaction.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <i className="fa-regular fa-folder-open text-5xl text-slate-300 mb-4"></i>
              <p className="text-slate-500">Hộp thư hiện đang trống.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifaction.map((noti) => (
                <div
                  key={noti?.id}
                  className="group bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex gap-4 text-start">
                      <div className="shrink-0 w-12 h-12 my-auto rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                        {noti?.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="text-start text-slate-800 dark:text-slate-100 font-semibold text-lg">
                          {noti?.name}
                          <span className="text-slate-500 dark:text-slate-400 font-normal text-sm ml-2">
                            - {noti?.email}
                          </span>
                        </p>

                        <p className="text-slate-600 text-start dark:text-slate-400 mt-1 line-clamp-1">
                          <i className="fa-regular fa-comment-dots opacity-70"></i>{" "}
                          {""}
                          {truncatetext(noti?.message, 500)}
                        </p>

                        <div className="flex items-center gap-4 mt-3 text-xs">
                          <span>
                            <i className="fa-regular fa-clock mr-1"></i>
                            {formatDateVN(noti?.created_at)}
                          </span>

                          {(() => {
                            const timeAgao = getTimeAgo(noti?.created_at);
                            let badgeClassName =
                              "border text-gray-600 dark:bg-gray-800 dark:text-gray-400"; // Mặc định
                            // Nếu vừa xong hoặc vài phút trước thì màu xanh lá
                            if (
                              timeAgao === "Vừa xong" ||
                              timeAgao.includes("phút")
                            ) {
                              badgeClassName =
                                "border text-green-700 dark:bg-green-900/30 dark:text-green-400";
                            } else if (timeAgao.includes("giờ")) {
                              badgeClassName =
                                "border text-blue-700 dark:blue-900/30 dark:text-blue-400";
                            }

                            return (
                              <span
                                className={`${badgeClassName} shrink-0 px-2 py-0.5 rounded-full font-medium`}
                              >
                                {timeAgao}
                              </span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                    <Link
                      to={`${base}/notification/detail/${noti?.id}`}
                      className="shrink-0 w-full md:w-auto text-center bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500"
                    >
                      Xem chi tiết
                      <i className="fa-solid fa-chevron-right ml-1 text-xs"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Phần bên */}
        <div className="flex-[3] space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
            <h3 className="font-bold text-xl mb-2">
              Xin chào, {me?.fullname}! 👋
            </h3>
            <p className="text-blue-100 text-sm">
              Bạn có {notifaction.length} thông báo mới trong danh sách liên hệ
              của mình.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="font-semibold mb-4 dark:text-white">Mẹo quản lý</h4>
            <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-3 text-start">
              <li className="flex gap-2">
                <i className="fa-solid fa-check text-green-500 mt-1"></i>
                Phản hồi khách hàng trong vòng 24h để tăng uy tín.
              </li>
              <li className="flex gap-2">
                <i className="fa-solid fa-circle-info text-blue-500 mt-1"></i>
                Kiểm tra kỹ email trước khi gửi phản hồi.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Notification;
