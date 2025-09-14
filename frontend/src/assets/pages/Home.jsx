import React from "react";
function Home() {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i class="fa-solid fa-hand"></i> Xin chào
      </h1>
      <div className="flex">
        <div className="flex-[6]">
          <p className="text-start text-lg mb-4">
            Tôi tên là Hạng A Tùng, mục tiêu của tôi là xây dựng các ứng dụng số
            hiện đại, dễ dùng và tối ưu hiệu năng.
          </p>
          <p className="text-start text-lg mb-4">
            Ngắn hạn: Ứng tuyển vị trí Lập trình viên Web Fullstack, áp dụng
            kiến thức về React, Node.js/Express, PHP/Laravel, MySQL và
            PostgreSQL vào các dự án thực tế. Rèn luyện kỹ năng lập trình, kỹ
            năng teamwork và làm quen với môi trường làm việc chuyên nghiệp.
          </p>
          <p className="text-start text-lg mb-4">
            Dài hạn: Trở thành Fullstack Developer có chuyên môn vững vàng, có
            khả năng đảm nhận và phát triển các dự án lớn, đồng thời đóng góp
            giải pháp tối ưu và định hướng kỹ thuật cho doanh nghiệp.
          </p>
          <a
            href="/cv.pdf"
            target="_blank"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-500 hover:border-white float-end"
          >
            Xem CV
          </a>
        </div>
        <div className="flex-[4]">
          <img
            src="../../../public/1696433119267khunghinh.net.png"
            alt="Avatar"
            className="w-100% h-100% rounded-full mx-auto mb-4"
          />
          <img
            src="../../public/laptop.svg"
            alt="Laptop"
            className="w-32 h-32 ms-auto mt-4 animate-bounce"
          />
        </div>
      </div>
    </section>
  );
}

export default Home;
