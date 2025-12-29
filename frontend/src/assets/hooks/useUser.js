import axiosPublic from "@/utils/axiosPublic";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function useUser() {
  // Lấy username
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (!username) return setLoading(false);
    const FetchUserDetail = async () => {
      setLoading(true);
      try {
        const res = await axiosPublic.get(`/users/${username}`);
        setUser(res.data);
      } catch (error) {
        console.log("Lỗi khi lấy chi tiết người dùng!", error);
      } finally {
        setLoading(false);
      }
    };
    FetchUserDetail();
  }, [username]);
  return { user, setUser, loading };
}

export default useUser;
