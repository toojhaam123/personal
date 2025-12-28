import { NavLink, Link, useParams } from "react-router-dom";
import Logout from "./Logout";
function Navbar({ token, setStatus }) {
  const { username } = useParams();
  const base = `/${username}`;

  return (
    <nav className="flex flex-col text-start gap-6">
      <NavLink
        to={base}
        end
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : " "}`
        }
      >
        <i className="fa-solid fa-circle-info"></i> Giới thiệu
      </NavLink>
      <NavLink
        to={`${base}/experience`}
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : " "}`
        }
      >
        <i className="fas fa-briefcase"></i> Kinh nghiệm
      </NavLink>
      <NavLink
        to={`${base}/skill`}
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : " "}`
        }
      >
        <i className="fas fa-code"></i> Kỹ năng
      </NavLink>
      <NavLink
        to={`${base}/education`}
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : " "}`
        }
      >
        <i className="fas fa-graduation-cap"></i> Học vấn
      </NavLink>
      <NavLink
        to={`${base}/portfolio`}
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : " "}`
        }
      >
        <i className="fas fa-folder-open"></i> Dự án
      </NavLink>
      <NavLink
        to={`${base}/contact`}
        className={({ isActive }) =>
          `hover:text-blue-600 ${isActive ? "text-blue-600" : " "}`
        }
      >
        <i className="fas fa-envelope"></i> Liên hệ
      </NavLink>
      {token && (
        <NavLink
          to={`${base}/notifications`}
          className={({ isActive }) =>
            `hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`
          }
        >
          <i className="fas fa-bell"></i> Thông báo
        </NavLink>
      )}
      <div className="mt-auto">
        {token ? (
          <Logout setStatus={setStatus} />
        ) : (
          <Link
            to="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-2 hover:text-gray-100 duration-500 rounded transition"
          >
            Tạo CV của bạn
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
