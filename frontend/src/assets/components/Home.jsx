import { NavLink } from "react-router-dom";
import useUsers from "../hooks/useUsers";
function Home() {
  const { users } = useUsers();
  return (
    <>
      <p>Danh sách người dùn </p>

      {users.map((user) => (
        <p key={user.id}>Tên người dùng: {user.username}</p>
      ))}
    </>
  );
}

export default Home;
