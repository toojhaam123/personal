import React from "react";
function Sidebar() {
  return (
    <div className="text-center max-vh-100">
      <img
        src="../../../public/1696433119267khunghinh.net.png"
        alt="Avatar"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-bold">Hạng A Tùng</h2>
      <p className="text-gray-400">Fullstack Developer</p>
      <div className="mt-4 space-y-2 text-sm text-start">
        <p>Email: toojhaam123@gmail.com</p>
        <p>Phone: 0345-312-083</p>
        <p>Địa chỉ: Sín Chải - Điện Biên</p>
      </div>
    </div>
  );
}

export default Sidebar;
