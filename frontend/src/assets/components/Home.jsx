import { Link, Routes, Route } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import useMeInfo from "../hooks/useMeInfo";
function Home({ token }) {
  const { users } = useUsers();
  const { me } = useMeInfo();

  return (
    <div className=" overflow-y-auto scroll-hidden p-5">
      <div className="flex flex-col items-center">Trang chủ</div>
      <p className="text-start">
        Website được xây dựng như một hệ thống CV trực tuyến, nơi mọi người có
        thể đăng ký tài khoản để tạo và quản lý hồ sơ cá nhân. Người dùng có thể
        nhập và cập nhật thông tin về bản thân, kỹ năng, kinh nghiệm và các nội
        dung liên quan đến quá trình học tập, làm việc. Mục tiêu của website là
        mang đến một giải pháp CV online thuận tiện, giúp người dùng trình bày
        năng lực một cách thống nhất, dễ theo dõi và phù hợp với môi trường
        tuyển dụng hiện đại.
      </p>
      <div className="profile">
        {token ? (
          users.map(
            (user) =>
              user.username == me.username && (
                <Link key={user.id} to={`/${user.username}`}>
                  Tôi
                </Link>
              )
          )
        ) : (
          <Link to={"/login"}>Đăng nhập</Link>
        )}
      </div>
    </div>
  );
}

export default Home;
