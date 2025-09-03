import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex gap-6 border-b pb-2 mb">
      <Link to="/" className="hover:text-blue-600">
        Home
      </Link>
      <Link to="/experience" className="hover:text-blue-600">
        Kinh nghiệm
      </Link>
      <Link to="/skill" className="hover:text-blue-600">
        Kỹ năng
      </Link>
      <Link to="/education" className="hover:text-blue-600">
        Học vấn
      </Link>
      <Link to="/portfolio" className="hover:text-blue-600">
        Dự án
      </Link>
      <Link to="/contact" className="hover:text-blue-600">
        Liên hệ
      </Link>
    </nav>
  );
}

export default Navbar;
