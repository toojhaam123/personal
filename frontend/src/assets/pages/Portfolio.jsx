import React from "react";
function Portfolie() {
  const projects = [
    {
      title: "Website giới thiệu Bảo tàng Chiến thắng Điện Biên Phủ",
      description:
        "Website giới thiệu Bảo tàng Chiến thắng Điện Biên Phủ được phát triển bằng PHP thuần và MySQL. Website cung cấp thông tin về lịch sử, hiện vật, triển lãm và các sự kiện liên quan đến Bảo tàng Chiến thắng Điện Biên Phủ. Người dùng có thể duyệt qua các bài viết, hình ảnh và video về bảo tàng, cũng như để lại bình luận và đánh giá.",
      technologies: "PHP, MySQL, HTML, CSS, JavaScript, Bootstrap",
      github: "github.com/toojhaam123/baotangchienthangdienbienphu",
    },
    {
      title: "Website cho thuê xe đạp điện tại thành phố Sơn La",
      description:
        "Website cho thuê xe đạp điện tại thành phố Sơn La được phát triển bằng React cho frontend và Express.js cho backend, với cơ sở dữ liệu PostgreSQL. Website cho phép người dùng đăng ký tài khoản, duyệt qua các loại xe đạp điện có sẵn, đặt thuê xe và quản lý đơn hàng. Quản trị viên có thể thêm, sửa, xóa thông tin xe và quản lý đơn hàng từ người dùng.",
      technologies:
        "React, Express.js, PostgreSQL, HTML, CSS, JavaScript, Tailwind CSS",
      github: "Tạm chưa có",
    },
  ];
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fas fa-folder-open"></i> Dự án
      </h1>
      <div className="flex">
        <div className="flex-[7]">
          {projects.map((project, i) => (
            <div className="mb-4" key={i}>
              <h2 className="font-bold text-lg">{project.title}</h2>
              <p className="text-lg text-start mb-4">{project.description}</p>
              <a
                href="{project.github}"
                target="_blank"
                className="border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-500 hover:border-white px-2 py-1"
              >
                Github
              </a>
            </div>
          ))}
        </div>
        <div className="flex-[3]">
          <img
            src="../../public/portfolio.png"
            alt="Portfolio"
            className="w-100% h-100% mx-auto mb-4"
          />
        </div>
      </div>
    </section>
  );
}
export default Portfolie;
