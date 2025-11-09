import axios from "axios";
import React, { useEffect, useState } from "react";
import useStatus from "../hooks/useStatus";
function Experience() {
  const [editMode, setEditMode] = useState(false);
  const isLogedIn = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [expInfo, setExpInfo] = useState([]);
  const { status, setStatus, visible } = useStatus();

  useEffect(() => {
    // Lấy thông tin kinh nghiệm từ API gửi về
    const fetcExpInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/get_exp_info");
        setExpInfo(Array.isArray(res.data) ? res.data : [res.data]);
        // console.log("Thông tin kinh nghiệm", res.data);
      } catch (e) {
        console.log("Có lỗi khi lấy thông tin kinh nghiệm!", e);
      } finally {
        setLoading(false);
      }
    };
    fetcExpInfo();
  }, []);

  // Xử lý submit khi chỉnh sửa thông tin kinh nghiệm
  const handleSubmitUpdateExpInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const exp = expInfo[0];
      const res = await axios.post(
        `http://127.0.0.1:8000/api/update_exp_info/${exp.id}`,
        {
          exp_info: exp.exp_info,
        }
      );
      setEditMode(false);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (e) {
      console.log("Lỗi khi cập nhật thông tin kinh nghiệm!", e);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi khi chỉnh sửa thông tin kinh nghiệm
  const handleChangeUpdateExpInfo = (e, id) => {
    const newValue = e.target.value;

    // Cập nhật thông tin với giá trị mới
    setExpInfo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, exp_info: newValue } : item
      )
    );
  };
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fas fa-briefcase"></i> Kinh nghiệm
      </h1>
      {status && (
        <div
          className={`mb-3 rounded transition-opacity duration-500 p-3
            ${visible ? "opacity-100" : "opacity-0"}
            ${
              status.type === "success"
                ? "bg-green-100 text-green-700 font-bolt"
                : "bg-red-100 text-red-700 font-bolt"
            }
          `}
        >
          {status.message}
        </div>
      )}
      <div className="flex gap-2">
        {/* Nút chỉnh sửa  */}
        {isLogedIn && (
          <button
            type="button"
            onClick={() => setEditMode(!editMode)}
            className="border bg-blue-600 hover:bg-blue-700 transition duration-500 mb-3"
          >
            {editMode ? (
              <>
                {" "}
                <i class="fa-solid fa-xmark"></i> Hủy
              </>
            ) : (
              <>
                {" "}
                <i class="fa-solid fa-pen-to-square"></i> Chỉnh sửa
              </>
            )}
          </button>
        )}
      </div>
      <div className="flex">
        <div className="flex-[7]">
          {editMode ? (
            <form action="" onSubmit={handleSubmitUpdateExpInfo} method="post">
              {expInfo.map((item) => (
                <div key={item.id}>
                  <textarea
                    name="exp_info"
                    id="exp_info"
                    onChange={(e) => handleChangeUpdateExpInfo(e, item.id)}
                    rows={10}
                    value={item.exp_info || ""}
                    className="text-black bg-white w-full rounded-lg p-2 text-lg whitespace-pre-line"
                  ></textarea>
                </div>
              ))}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 transition duration-500 scroll-hidden"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <i class="fa-solid fa-spinner fa-spin"></i> Đang lưu...
                  </>
                ) : (
                  <>
                    <i class="fa-solid fa-floppy-disk"></i> Lưu{" "}
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="exp_info">
              {loading ? (
                <p>
                  <i class="fa-solid fa-spinner fa-spin"></i> Đang tải... Vui
                  lòng chờ!
                </p>
              ) : (
                expInfo.map((item) => (
                  <p
                    key={item.id}
                    className="text-start text-lg mb-4 whitespace-pre-line"
                  >
                    {item.exp_info}
                  </p>
                ))
              )}
            </div>
          )}
        </div>
        <div className="flex-[3]">
          <img
            src="../../public/experience.png"
            alt="Experience"
            className="w-100% h-100% mx-auto mb-4"
          />
        </div>
      </div>
    </section>
  );
}

export default Experience;
