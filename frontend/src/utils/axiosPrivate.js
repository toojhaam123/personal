import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // URL gốc của backend
});

// Gắn token ngay lần đầu App load, tạo một axios customer => chạy trước khi request đc gửi đi
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Backend (sanctun) dựa vào token này để xác thực user
    }
    // Trả lại config để axios tiếp tục gửi request
    return config;
  },
  (error) => Promise.reject(error) // Nếu có lỗi trước khi gửi request
);

//Bắt lỗi 401 + auto logout => Chạy sau khi serve trả lại response về
axiosPrivate.interceptors.response.use(
  (response) => response, // nếu Ok thì đi tiếp
  (error) => {
    // Lấy status code từ response lỗi
    const status = error.response?.status;

    // Nếu backend trả về 401 => token hết hạn, token sai, user đã logout
    if (status === 401) {
      localStorage.removeItem("token"); // Xóa token
      localStorage.removeItem("expireAt"); // Xóa thời gian bắt đầu đăng nhập

      // Xóa Authorization headers
      delete axiosPrivate.defaults.headers.common["Authorization"];

      // Đưa về trang chủ
      window.location.href = "/";
    }
    return Promise.reject(error); // Trả lỗi để component gọi API bắt lỗi
  }
);

export default axiosPrivate;
