import { Link } from "react-router-dom";
import useMeInfo from "../hooks/useMeInfo";
function Home({ token }) {
  const { me } = useMeInfo();

  return (
    <div className="bg-gray-900 text-white rounded-3xl overflow-y-auto scroll-hidden p-5 w-full">
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-4xl font-bold">CV Online cho người hiện đại</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Tạo và quản lý hồ sơ cá nhân, kỹ năng, kinh nghiệm và dự án chỉ với
          một đường link duy nhất.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 mt-12">
        <div className="bg-gray-800 p-5 rounded-xl">
          <i className="fa-solid fa-user text-blue-500 text-2xl"></i>
          <h3 className="font-semibold mt-3">Hồ sơ cá nhân</h3>
          <p className="text-sm text-gray-400">
            Thông tin cá nhân rõ ràng, nhất quán
          </p>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl">
          <i className="fa-solid fa-code text-blue-500 text-2xl"></i>
          <h3 className="font-semibold mt-3">Kỹ năng & Kinh nghiệm</h3>
          <p className="text-sm text-gray-400">
            Trình bày năng lực theo chuẩn tuyển dụng
          </p>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl">
          <i className="fa-solid fa-link text-blue-500 text-2xl"></i>
          <h3 className="font-semibold mt-3">Chia sẻ nhanh</h3>
          <p className="text-sm text-gray-400">
            Gửi CV cho nhà tuyển dụng chỉ bằng 1 link
          </p>
        </div>
      </div>
      {/* Vào login tạo CV */}
      <div className="text-center mt-10 profile">
        {token ? (
          <Link
            key={me.id}
            to={`/${me.username}`}
            className="inline-block bg-blue-600 hover:bg-blue-700 hover:text-gray-100 px-6 py-2 rounded duration-500 transition"
          >
            Xem CV của tôi
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-2 hover:text-gray-100 duration-500 rounded transition"
          >
            Tạo CV của bạn
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;
