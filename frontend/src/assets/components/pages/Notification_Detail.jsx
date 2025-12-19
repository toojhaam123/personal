import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../config/axios";
export default function Notification_Details() {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [notifactionDetail, setNotificationDetail] = useState(null);
  useEffect(() => {
    const fetchNotificationDetail = async () => {
      setLoading(true);

      try {
        const res = await axiosInstance.get(`contacts/${id}`);
        setNotificationDetail(res.data);
      } catch (error) {
        console.log("Lỗi khi lấy chi tiết thông báo!", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotificationDetail();
  }, [id]);
  if (!notifactionDetail) return <p>Đang tải...</p>;
  return (
    <section>
      <h1 className="font-bold text-3xl text-red-600 mb-4">
        <i className="fa-solid fa-bell"></i> Chi tiết thông báo
      </h1>
      <div className="flex">
        {loading ? (
          <>
            <p>
              <i className="fa-solid fa-spinner fa-spin" /> Đang tải...
            </p>
          </>
        ) : (
          <div className="text-start flex-[7] text-lg">
            <p>
              <strong>Người gửi: </strong> {notifactionDetail.name} -{" "}
              {notifactionDetail.email}
            </p>
            <p>
              <strong>Nội dung: </strong>
              {notifactionDetail.message}
            </p>
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
