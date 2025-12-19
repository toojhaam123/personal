import axiosInstance from "../../../config/axios";
import { useState, useEffect } from "react";
import { formatDateVN } from "../../../utils/dateUtils";
import { truncatetext } from "../../../utils/stringUtils";
// import { truncatetext } from "../../utils/stringUtils";
import { Link } from "react-router-dom";
function Notification() {
  // Lấy thông tin từ bằng contacts ra để hiện thị
  const [notifaction, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotification = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("contacts");
        setNotification(res.data);
      } catch (error) {
        console.error("Lỗi lấy thông báo nhé!", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotification();
  }, []);
  return (
    <section>
      <h1 className="font-bold text-red-600 text-3xl mb-4">
        {" "}
        <i className="fa fa-bell"></i>Thông báo
      </h1>
      <div className="flex">
        {loading ? (
          <p>
            <i class="fa-solid fa-spinner fa-spin"></i> Đang tải... Vui lòng
            chờ!
          </p>
        ) : notifaction.length === 0 ? (
          <p className="text-lg mb-4">Không có thông báo nào!</p>
        ) : (
          <div className="flex-[7]">
            <div className="space-y-4 mb-5">
              {notifaction.map((item) => (
                <li
                  key={item.id}
                  className="rounded-lg text-start p-4 m-2 border-b-2 hover:bg-gray-800 hover:text-white transition duration-500"
                >
                  <p className="">
                    <strong>{item.name}</strong> - đã gửi một liên hệ!{" "}
                  </p>
                  <p>
                    <strong>Nội dung:</strong> {truncatetext(item.message, 15)}
                  </p>
                  <p>
                    <strong>Lúc:</strong> {formatDateVN(item.created_at)}
                  </p>
                  <Link className="" to={`/notification_detail/${item.id}`}>
                    Chi tiết <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </li>
              ))}
            </div>
          </div>
        )}
        <div className="flex-[3]">
          <div>
            <img
              src="../../public/bell.svg"
              alt="Contact"
              className="w-100% h-100% mx-auto mb-4 float-end"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Notification;
