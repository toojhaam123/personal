import { useEffect, useState } from "react";
import axios from "axios";

const useUserInfo = () => {
  // Lấy thông tin người dùng từ API về hiện thị
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/get_user_info");
        setUserInfo(Array.isArray(res.data) ? res.data : [res.data]);
        // console.log("Dữ liệu nhận đc:", res.data);
      } catch (e) {
        console.log("Lỗi khi lấy dữ liệu", e);
      }
    };
    fetchUserInfo();
  }, []);
  return { userInfo };
};

export default useUserInfo;
