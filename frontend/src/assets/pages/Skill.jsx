import React from "react";
function Skill() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-red-600">Kỹ năng</h1>
      <p className="text-lg mb-4 text-start">
        Lập trình: C/C++, C#, Python, Java
      </p>
      <p className="text-lg mb-4 text-start">
        Web: HTML5, CSS, JavaScript, Bootstrap, Tailwind CSS, PHP
      </p>
      <p className="text-lg mb-4 text-start">
        Framework: Laravel, ReactJS, ExpressJS
      </p>
      <p className="text-lg mb-4 text-start">Database: MySQL, PostgreSQL</p>
      <p className="text-lg mb-4 text-start">Tool: Git/GitHub, Postman</p>
      <p className="text-lg mb-4 text-start">Đọc hiểu tài liệu tiếng Anh</p>
      <p className="text-lg mb-4 text-start">
        {" "}
        Làm việc nhóm, giải quyết vấn đề, tự học
      </p>
    </div>
  );
}

export default Skill;
