import axiosInstance from "../../config/axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function useUserDetail() {
  // Lấy username
  const { username } = useParams();
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!username || !token) return;
    const FetchUserDetail = async () => {
      try {
        const res = await axiosInstance.get(`/users/${username}`);
        setUser(res.data);
      } catch (error) {
        console.log("Lỗi khi lấy chi tiết người dùng!", error);
      }
    };
    FetchUserDetail();
  }, [username]);
  return { user, setUser };
}

export default useUserDetail;
