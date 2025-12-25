import axios from "axios";
import { useEffect, useState } from "react";
// import axiosInstance from "../../config/axios";

const useUsers = () => {
  // Lấy thông tin người dùng từ API về hiện thị
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/users");
        setUsers(res.data);
        // console.log("Tất cả người dùng, ", res.data);
      } catch (e) {
        console.log("Lỗi khi lấy thông tin người dùng!", e);
      }
    };
    fetchUserInfo();
  }, []);

  return { users, setUsers };
};

export default useUsers;
