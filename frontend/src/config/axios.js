import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Gắn token ngay lần đầu App load, tạo một axios riêng biệt
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//Bắt lỗi 401,auto logout
axiosInstance.interceptors.response.use(
  (response) => response, // Ok thì đi tiếp
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Xóa token
      localStorage.removeItem("token");
      localStorage.getItem("expireAt");

      // Xóa Authorization headers
      delete axiosInstance.defaults.headers.common["Authorization"];

      // Đưa về trang chủ
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
