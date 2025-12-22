import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";

const useUserInfo = () => {
  // Lấy thông tin người dùng từ API về hiện thị
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get("auth/users");
        setUser([res.data.user]);
      } catch (e) {
        console.log("Lỗi khi lấy thông tin người dùng!", e);
      }
    };
    fetchUserInfo();
  }, []);
  return { user, setUser };
};

export default useUserInfo;
