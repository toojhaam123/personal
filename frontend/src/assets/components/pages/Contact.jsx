import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import FormContact from "../../components/form/FormContact";
import FormAddContactInfo from "../../components/form/FormAddContactInfo";
function Contact({
  loading,
  setLoading,
  editMode,
  setEditMode,
  addMode,
  setAddMode,
  isLogedIn,
  setStatus,
}) {
  const [contactInfo, setContactInfo] = useState([]);

  // Lấy API từ Laravel để hiện thị
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://127.0.0.1:8000/api/get_information_contacts"
        );
        setContactInfo(res.data);
      } catch (e) {
        console.error("Lỗi khi lấy dữ liệu", e);
      } finally {
        setLoading(false);
      }
    };
    fetchContactInfo();
  }, []);

  // xử lý khi nhập thông tin update
  const handleChangeUpdateInfor = (e, id) => {
    const newValue = e.target.value;

    //Cập nhập thông tin với giá trị mới
    setContactInfo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, information_contacts: newValue } : item
      )
    );
  };

  // xử lý submit lưu thay đổi
  const handleSubmitUpdateInfor = async (e) => {
    e.preventDefault(); // Ngăn reload trang
    setLoading(true);
    try {
      const i = contactInfo[0];
      const res = await axios.put(
        `http://127.0.0.1:8000/api/contacts/${i.id}`,
        {
          information_contacts: i.information_contacts,
        }
      );

      setStatus({ type: "success", message: res.data.message });
      setEditMode(false);
    } catch (error) {
      console.error("Lỗi khi cập nhật", error.response?.data || error.message);
      alert("Có lỗi khi cập nhật!");
    } finally {
      setLoading(false);
    }
  };

  // Xóa thông tin liên hệ
  const handleDeleteContacts = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa không!")) return;
    setLoading(true);
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/delete_info_contacts/${id}`
      );

      setContactInfo((prev) => prev.filter((item) => item.id != id));
      setStatus({
        type: "success",
        message: res.data.message,
      });
      setEditMode(false);
    } catch (e) {
      setStatus({
        type: "error",
        message: "Lỗi khi xóa thông tin liên hệ!",
        e,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <h1 className="font-bold text-red-600 text-3xl mb-4">
        <i className="fas fa-envelope"></i> Liên hệ
      </h1>
      <p className=" text-lg mb-4">
        Nếu bạn quan tâm đến mình hoặc dự án của mình, hãy liên hệ qua các kênh
        dưới đây:
      </p>
      <div className="flex gap-2">
        {/* Nút thêm  */}
        {isLogedIn && (!contactInfo || contactInfo.length === 0) ? (
          <button
            type="button"
            onClick={() => setAddMode(!addMode)}
            className="border bg-blue-600 hover:bg-blue-700 transition duration-500 mb-3"
          >
            {addMode ? (
              <>
                {" "}
                <i className="fa-solid fa-xmark"></i> Hủy
              </>
            ) : (
              <>
                {" "}
                <i className="fa-solid fa-add"></i> Thêm
              </>
            )}
          </button>
        ) : (
          /* Nút chỉnh sửa  */
          isLogedIn && (
            <>
              <button
                type="button"
                onClick={() => setEditMode(!editMode)}
                className="border bg-blue-600 hover:bg-blue-700 transition duration-500 mb-3"
              >
                {editMode ? (
                  <>
                    {" "}
                    <i className="fa-solid fa-xmark"></i> Hủy
                  </>
                ) : (
                  <>
                    {" "}
                    <i className="fa-solid fa-pen-to-square"></i> Chỉnh sửa
                  </>
                )}
              </button>
              {editMode && (
                // Nút xóa
                <button
                  onClick={() => handleDeleteContacts(contactInfo[0].id)}
                  className="bg-red-600 hover:bg-red-700 border mb-3 rounded transition duration-500"
                >
                  {" "}
                  {loading ? (
                    <>
                      <i className="fa-solid fa-delete-left"></i> Đang xóa
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-delete-left"></i> Xóa
                    </>
                  )}
                </button>
              )}
            </>
          )
        )}
      </div>
      <div className="flex">
        <div className="flex-[7]">
          {/* Form thêm thông tin liên hệ */}
          {addMode && (!contactInfo || contactInfo.length === 0) ? (
            <FormAddContactInfo
              setAddMode={setAddMode}
              setLoading={setLoading}
              setStatus={setStatus}
              setContactInfo={setContactInfo}
            ></FormAddContactInfo>
          ) : editMode ? (
            /* Nếu ở chế độ chinh sửa thì hiện form */
            <>
              <form onSubmit={handleSubmitUpdateInfor} method="post">
                {contactInfo?.[0].information_contacts && (
                  <div key={contactInfo[0].id}>
                    <textarea
                      name="information_contacts"
                      id="information_contacts"
                      onChange={(e) => {
                        handleChangeUpdateInfor(e, contactInfo[0].id);
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                      value={contactInfo[0].information_contacts}
                      className="w-full p-2 border rounded-lg bg-white text-black mb-2"
                      rows="5"
                    ></textarea>
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 transition duration-500 scroll-hidden"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Đang
                      lưu...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-floppy-disk"></i> Lưu{" "}
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            //  Nếu ko ở chế độ chỉnh sửa thì hiện thông tin
            <div className="space-y-4 mb-5">
              {loading ? (
                <p>
                  <i className="fa-solid fa-spinner fa-spin"></i> Đang tải...
                  Vui lòng chờ!
                </p>
              ) : contactInfo.length === 0 ? (
                <p className="text-center">Không có thông tin liên hệ nào!</p>
              ) : (
                contactInfo?.[0]?.information_contacts && (
                  <p
                    key={contactInfo[0].id}
                    className="text-start text-lg whitespace-pre-line"
                  >
                    {contactInfo[0].information_contacts}
                  </p>
                )
              )}
            </div>
          )}
        </div>
        {/* Ảnh minh họa */}
        <div className="flex-[3]">
          <img
            src="/contact.png"
            alt="Contact"
            className="w-100% h-100% mx-auto mb-4"
          />
        </div>
      </div>
      {!isLogedIn && (
        <div>
          <p className="text-2xl">Form liên hệ</p>
          <FormContact
            loading={loading}
            setLoading={setLoading}
            setStatus={setStatus}
          ></FormContact>
        </div>
      )}
    </section>
  );
}
export default Contact;
