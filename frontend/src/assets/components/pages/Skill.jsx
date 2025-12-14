import React, { useEffect, useState } from "react";
import axios from "axios";
import FormAddSkillInfo from "../form/FormAddSkillInfo";
import FormUpdateSkillInfo from "../form/FormUpdateSkillInfo";
function Skill({ isLogedIn, setStatus }) {
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [skillInfo, setSkillInfo] = useState([]);

  useEffect(() => {
    const fetchSkillInfo = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/get_skill_info");
        setSkillInfo(Array.isArray(res.data) ? res.data : [res.data]);
        // console.log("Thông tin kỹ năng: ", res.data);
      } catch (e) {
        console.log("Lỗi lấy thông tin kỹ năng: ", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSkillInfo();
  }, []);

  // Hàm xử lý xóa thông tin kỹ năng
  const handleDeleteSkillInffo = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa không!")) return;
    setLoading(true);

    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/delete_skill_info/${id}`
      );

      setSkillInfo((prev) => prev.filter((item) => item.id != id));
      setStatus({
        type: "success",
        message: res.data.message,
      });
      setEditMode(false);
    } catch (e) {
      setStatus({
        type: "error",
        message: "Xóa thông tin kỹ năng thất bại!",
        e,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fas fa-code"></i> Kỹ năng
      </h1>
      <div className="flex gap-2">
        {/* Nút thêm thông tin kỹ năng */}
        {isLogedIn && (!skillInfo || skillInfo.length === 0) ? (
          <>
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
          </>
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
                <button
                  onClick={() => handleDeleteSkillInffo(skillInfo[0].id)}
                  className="bg-red-600 border hover:bg-red-700 mb-3 transition duration-500"
                >
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
          {/* Hiện thị form thêm thông tin kỹ năng */}
          {addMode ? (
            <FormAddSkillInfo
              setAddMode={setAddMode}
              setStatus={setStatus}
              setLoading={setLoading}
              loading={loading}
              setSkillInfo={setSkillInfo}
            ></FormAddSkillInfo>
          ) : editMode ? (
            // Chế độ chỉnh sửa
            <FormUpdateSkillInfo
              loading={loading}
              setLoading={setLoading}
              setEditMode={setEditMode}
              setStatus={setStatus}
              skillInfo={skillInfo}
              setSkillInfo={setSkillInfo}
            ></FormUpdateSkillInfo>
          ) : (
            <div className="skill_info">
              {loading ? (
                <p>
                  <i className="fa-solid fa-spinner fa-spin"></i> Đang tải...
                  Vui lòng chờ!
                </p>
              ) : skillInfo.length === 0 ? (
                <p className="text-center">Không có thông tin kỹ năng nào!</p>
              ) : (
                skillInfo?.[0]?.skill_info && (
                  <p
                    key={skillInfo[0].id}
                    className="text-lg mb-4 text-start whitespace-pre-line"
                  >
                    {skillInfo[0].skill_info}
                  </p>
                )
              )}
            </div>
          )}
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
