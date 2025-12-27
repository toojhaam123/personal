import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";

const useMeInfo = () => {
  const token = localStorage.getItem("token");
  // Lấy thông tin người dùng từ API về hiện thị
  const [me, setMe] = useState([]);
  useEffect(() => {
    if (!token) return;
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get("auth/me");
        setMe(res.data);
        // console.log("Tôi: ", res.data);
      } catch (e) {
        console.log("Lỗi khi lấy thông tin người dùng!", e);
      }
    };
    fetchUserInfo();
  }, [token]);

  return { me, setMe };
};

export default useMeInfo;
