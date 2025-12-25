import { NavLink, useParams } from "react-router-dom";
function Navbar({ token }) {
  const { username } = useParams();
  const base = `/${username}`;

  return (
    <nav className="flex flex-col text-start gap-6  pb-2">
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
    </nav>
  );
}

export default Navbar;
