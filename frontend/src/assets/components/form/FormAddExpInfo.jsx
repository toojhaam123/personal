import axios from "axios";
import React, { useState } from "react";

function FormAddExpInfo({
  setAddMode,
  loading,
  setLoading,
  setStatus,
  setExpInfo,
}) {
  const [addExpInfo, setAddExpInfo] = useState({
    exp_info: "",
  });

  // xử lý khi nhập thông tin
  const handleChangeAddExpInfo = (e) => {
    setAddExpInfo({
      ...addExpInfo,
      [e.target.name]: e.target.value,
    });
  };

  // hàm xử lý submit thông tin kinh nghiệm
  const handleSubmitAddExpInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/creat_exp_info",
        addExpInfo
      );

      // Reset form
      setAddExpInfo({
        exp_info: "",
      });

      setStatus({
        type: "success",
        message: res.data.message,
      });
      setAddMode(false);
      setExpInfo((prev) => [res.data.data, ...prev]);
    } catch (e) {
      setStatus({
        type: "error",
        message: "Lỗi khi thêm thông tin kinh nghiệm!",
        e,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form action="" onSubmit={handleSubmitAddExpInfo} method="post">
      <div>
        <textarea
          name="exp_info"
          id="exp_info"
          onChange={(e) => handleChangeAddExpInfo(e)}
          rows={10}
          className="text-black bg-white w-full rounded-lg p-2 text-lg whitespace-pre-line"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 transition duration-500 scroll-hidden"
        disabled={loading}
      >
        {loading ? (
          <>
            <i className="fa-solid fa-spinner fa-spin"></i> Đang thêm...
          </>
        ) : (
          <>
            <i className="fa-solid fa-floppy-disk"></i> Thêm{" "}
          </>
        )}
      </button>
    </form>
  );
}

export default FormAddExpInfo;
