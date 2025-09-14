import React from "react";
import { useState, useEffect } from "react";
import { formatDateVN } from "../utils/dateUtils";
function Notification() {
  // Lấy thông tin từ bằng contacts ra để hiện thị
  const [notifaction, setNotification] = useState([]);
  const [selected, setSelected] = useState(null); // Lưu thông báo đang chọn

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/contacts")
      .then((res) => res.json())
      .then((data) => setNotification(data))
      .catch((err) => console.error("Lỗi lấy thông báo!", err));
  }, []);
  return (
    <section>
      <h1 className="font-bold text-red-600 text-3xl mb-4">
        {" "}
        <i className="fa fa-bell"></i>Thông báo
      </h1>
      <div className="flex">
        {notifaction.length === 0 ? (
          <p className="text-lg mb-4">Không có thông báo nào!</p>
        ) : (
          <div className="flex-[7]">
            <div className="space-y-4 mb-5">
              {notifaction.map((item) => (
                <li
                  key={item.id}
                  onClick={() => setSelected(item)} // Khi click vào thì chọn item đó
                  className="rounded-lg shadow-white text-start p-4 m-2 border-b-2 cursor-pointer hover:bg-gray-800 transition duration-500 shadow-sm"
                >
                  <p className="text-lg font-bold">
                    {item.name} - đã gửi một liên hệ lúc{" "}
                    {formatDateVN(item.created_at)}
                  </p>
                </li>
              ))}
            </div>
          </div>
          //   hiện thị chi tiết nếu chọn liên hệ
        )}
        <div className="flex-[3]">
          <img
            src="../../public/notifaction.png"
            alt="Contact"
            className="w-100% h-100% mx-auto mb-4 float-end"
          />
        </div>
      </div>
    </section>
  );
}

export default Notification;
