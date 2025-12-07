import axios from "axios";
import React, { useState } from "react";
function FormAddContactInfo({
  setAddMode,
  loading,
  setLoading,
  setStatus,
  setContactInfo,
}) {
  const [addContactInfo, setAddContactInfo] = useState({
    information_contacts: "",
  });

  const [key, setKey] = useState("");

  // Xử lý khi nhập thông tin thêm dự án
  const handleChangeAddInfor = (e) => {
    setAddContactInfo({ ...addContactInfo, [e.target.name]: e.target.value });
    setKey(e.target.value);
  };

  //   Xử lý submit thêm thông tin
  const handleSubmitAddInfor = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/information_contacts",
        addContactInfo
      );

      // reset lại form
      setAddContactInfo({
        information_contacts: "",
      });

      setContactInfo((prev) => [res.data.data, ...prev]);
      console.log(res.data.data);

      setAddMode(false);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (e) {
      setStatus({
        type: "error",
        message: "Lỗi khi thêm thông tin liên hệ!",
        e,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmitAddInfor} method="post">
        <div>
          <textarea
            name="information_contacts"
            id="information_contacts"
            onChange={(e) => {
              handleChangeAddInfor(e);
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            className="w-full p-2 border rounded-lg bg-white text-black mb-2"
            rows="5"
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
      <p className="text-start whitespace-pre-line">Bạn đang viết: {key}</p>
    </>
  );
}

export default FormAddContactInfo;
