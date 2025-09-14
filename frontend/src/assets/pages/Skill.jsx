import React from "react";
function Skill() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fas fa-code"></i> Kỹ năng
      </h1>
      <div className="flex">
        <div className="flex-[7]">
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
            Làm việc nhóm, giải quyết vấn đề, tự học
          </p>
        </div>
        <div className="flex-[3]">
          <img
            src="../../public/skill.png"
            alt="Skill"
            className="w-100% h-100% mx-auto mb-4"
          />
        </div>
      </div>
    </section>
  );
}

export default Skill;
