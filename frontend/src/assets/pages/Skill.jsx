import React, { useEffect, useState } from "react";
import useStatus from "../hooks/useStatus";
import axios from "axios";
function Skill() {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { status, setStatus, visible } = useStatus();
  const [skillInfo, setSkillInfo] = useState([]);
  const isLogedIn = localStorage.getItem("token");

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

  // Xử lý thay đổi nhập thoog tin
  const handleChangUpdateSkillInfo = (e, id) => {
    const newValue = e.target.value;

    // Cập nhật thông tin với giá trị mới
    setSkillInfo((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, skill_info: newValue } : item
      )
    );
  };

  // Xử lý Submit gửi cập nhật
  const handleSubmitSkillInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const skill = skillInfo[0];
      const res = await axios.post(
        `http://127.0.0.1:8000/api/update_skill_info/${skill.id}`,
        {
          skill_info: skill.skill_info,
        }
      );
      setEditMode(false);
      setStatus({
        type: "success",
        message: res.data.message,
      });
    } catch (e) {
      console.log("Lỗi cập nhật thông tin kỹ năng:", e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section>
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        <i className="fas fa-code"></i> Kỹ năng
      </h1>
      {status && (
        <div
          className={`mb-3 rounded transition-opacity-500 p-3 
        ${visible ? "opacity-100" : "opacity-0"}
        ${
          status.type === "success"
            ? "bg-green-100 text-green-700 font-bolt"
            : "bg-red-100 text-red-700 font-bolt"
        }`}
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
            <form action="" method="post" onSubmit={handleSubmitSkillInfo}>
              {skillInfo.map((item) => (
                <div key={item.id}>
                  <textarea
                    name="skill_info"
                    rows={10}
                    id="skill_info"
                    value={item.skill_info}
                    onChange={(e) => handleChangUpdateSkillInfo(e, item.id)}
                    className="w-full text-black bg-white rounded p-2 mb-2 text-lg"
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
          ) : loading ? (
            <p>
              <i class="fa-solid fa-spinner fa-spin"></i> Đang tải... Vui lòng
              chờ!
            </p>
          ) : (
            <div className="skill_info">
              {skillInfo.map((item) => (
                <p
                  key={item.id}
                  className="text-lg mb-4 text-start whitespace-pre-line"
                >
                  {item.skill_info}
                </p>
              ))}
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
