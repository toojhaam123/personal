import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosPrivate from "@/utils/axiosPrivate";
import { formatDateVN } from "@/assets/utils/dateUtils";
export default function NotificationDetail() {
  const [loading, setLoading] = useState(false);
  const { username, id } = useParams();
  const [notifactionDetail, setNotificationDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotificationDetail = async () => {
      setLoading(true);

      try {
        const res = await axiosPrivate.get(`${username}/contacts/${id}`);
        setNotificationDetail(res.data);
      } catch (error) {
        console.log("Lỗi khi lấy chi tiết thông báo!", error.response?.data);
      } finally {
        setLoading(false);
      }
    };
    fetchNotificationDetail();
  }, [id, username]);

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-bold text-3xl text-red-600 mb-4">
        <i className="fa-solid fa-bell"></i> Chi tiết thông báo
      </h1>
      {/*Nút quay lại trang danh sách thông báo*/}
      <button
        className="flex items-center gap-1 text-slate-800 bg-gray-900 dark:text-slate-100 dark:hover:text-slate-100 transition-colors duration-500 mb-6"
        onClick={() => navigate(-1)}
      >
        {" "}
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-[7]">
          {loading ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 shadow-sm border border-slate-200 dark:border-slate-800 flex justify-center">
              <i className="fa-solid fa-spinner fa-spin text-3xl text-blue-500"></i>
            </div>
          ) : !notifactionDetail ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-10 shadow-sm border border-slate-200 dark:border-slate-800 text-center">
              <p className="text-slate-500 text-lg">
                Không tìm thấy thông tin liên hệ!
              </p>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
              {/* Header của nội dung - Dùng Gradient nhẹ để đồng bộ */}
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {notifactionDetail?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                      {notifactionDetail?.name}
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400">
                      <i className="fa-regular fa-envelope mr-2"></i>
                      {notifactionDetail?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Nội dung tin nhắn */}
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Nội dung lời nhắn
                  </span>
                  <span className="text-sm text-slate-400 italic">
                    Gửi lúc: {formatDateVN(notifactionDetail?.created_at)}
                  </span>
                </div>

                <div className="text-start whitespace-pre-line bg-slate-50 dark:bg-slate-800/30 p-6 rounded-xl border border-slate-100 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300 text-lg italic italic-quote">
                  "{notifactionDetail?.message}"
                </div>

                {/* Nút hành động nhanh */}
                <div className="mt-8 flex gap-4">
                  <a
                    href={`mailto:${notifactionDetail?.email}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white hover:dark:text-slate-100 text-center py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-blue-500/30 duration-500"
                  >
                    <i className="fa-solid fa-paper-plane mr-2"></i> Phản hồi
                    ngay
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex-[3] space-y-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl text-white shadow-xl border border-slate-700">
            <i className="fa-solid fa-shield-halved text-blue-400 text-2xl mb-4"></i>
            <h3 className="font-bold text-lg mb-2">Bảo mật thông tin</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Thông tin này chỉ hiển thị với bạn. Hãy cẩn trọng khi phản hồi các
              email yêu cầu thông tin nhạy cảm.
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-3">
              Thông tin kỹ thuật
            </h4>
            <div className="space-y-2 text-xs text-slate-500">
              <p>
                ID:{" "}
                <span className="text-slate-800 dark:text-slate-300">
                  #INF-{id}
                </span>
              </p>
              <p>
                Trạng thái:{" "}
                <span className="text-green-500 font-medium italic">
                  Đã xem
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
