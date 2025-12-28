import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
function useUserDetail() {
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
        const res = await axios.get(
          `http://127.0.0.1:8000/api/users/${username}`
        );
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

export default useUserDetail;
