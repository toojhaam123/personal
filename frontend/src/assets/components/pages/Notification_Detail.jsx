import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
export default function Notification_Details() {
  const { id } = useParams();
  const [notifactionDetail, setNotificationDetail] = useState(null);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/notification_detail/${id}`)
      .then((res) => setNotificationDetail(res.data))
      .catch((e) => console.error("Lỗi khi lấy chi tiết", e));
  }, [id]);
  if (!notifactionDetail) return <p>Đang tải...</p>;
  return (
    <section>
      <h1 className="font-bold text-3xl text-red-600 mb-4">
        <i className="fa-solid fa-bell"></i> Chi tiết thông báo
      </h1>
      <div className="flex">
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
