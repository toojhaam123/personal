import { useEffect, useState } from "react";
import axiosInstance from "../../config/axios";

const useUsers = () => {
  // Lấy thông tin người dùng từ API về hiện thị
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get("users");
        setUsers(res.data);
      } catch (e) {
        console.log("Lỗi khi lấy thông tin người dùng!", e);
      }
    };
    fetchUserInfo();
  }, []);
  return { users, setUsers };
};

export default useUsers;
