import React from "react";
function Education() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fas fa-graduation-cap"></i> Học vấn
      </h1>
      <div className="flex">
        <div className="flex-[7]">
          <p className="text-start text-lg mb-4">
            Học tại Trường Đại học Tây Bắc - Tay Bac University
            <br /> Chuyên nghành: Công nghệ thông tin ( 2021 - 2025 ) <br /> •
            Tốt nghiệp loại giỏi (GPA: 3.2/4.0) <br /> • Đồ án tốt nghiệp:
            Website giới thiệu Bảo tàng Chiến thắng Điện Biên Phủ (thuần PHP +
            MySQL) <br /> • Thành viên CLB Lập trình <br /> • Chủ động tự học
            công nghệ mới (React, Express, Laravel, Git, PostgreSQL)
          </p>
        </div>
        <div className="flex-[3]">
          <img
            src="../../public/education.png"
            alt="Education"
            className="w-100% h-100% mx-auto mb-4"
          />
        </div>
      </div>
    </section>
  );
}
export default Education;
