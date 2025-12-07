import { createSlice } from "@reduxjs/toolkit";

// Khai báo trạng thái ban đầu của slice này
const initialState = {
  loading: false,
  editMode: false,
  addMode: false,
  previewImage: {},
  status: null,
  visible: false,
};

// tạo slice ban đầu tên app,
const appSlice = createSlice({
  name: "app",
  initialState, // state ban đầu
  reducers: {
    // Object chứa các hàm reducers thay đổi state
    setLoading(state, action) {
      state.loading = action.payload; // payload là giá trị true/false
    },
    setEditMode(state, action) {
      state.editMode = action.payload;
    },
    setAddMode(state, action) {
      state.addMode = action.payload;
    },
    setPreviewImage(state, action) {
      state.previewImage = action.payload; // payload là object ảnh
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setVisible(state, action) {
      state.visible = action.payload;
    },
  },
});

// export các action để các component khác có thể dispath
export const {
  setLoading,
  setEditMode,
  setAddMode,
  setPreviewImage,
  setStatus,
  setVisible,
} = appSlice.actions;

// export các reducer để đưa vào store

export default appSlice.reducers;
