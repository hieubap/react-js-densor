import { IDispatch } from "redux";

const initState = {
  confirmDelOpen: false,
  onConfirm: () => {},
  confirmVisible: false,

  type: "delete",
  title: "Chú ý !",
  content: "Bạn có chắc muốn xóa",
  cancelText: "Hủy",
  okText: "Xóa",
  onCancel: () => {},
  onOk: () => {},
};
export default {
  state: initState,
  reducers: {
    updateData(state: any, payload = {}) {
      return { ...state, ...payload };
    },
    resetData() {
      return { ...initState };
    },
  },
  effects: (dispatch: IDispatch) => ({
    openConfirmDelete: ({ onConfirm }: any) => {
      console.log(onConfirm, "onConfirm");

      dispatch.popup.updateData({
        // confirmDelOpen: true,
        // onConfirm,
        type: "delete",
        confirmVisible: true,
        title: "Chú ý !",
        content: "Bạn có chắc muốn xóa",
        cancelText: "Hủy",
        okText: "Xóa",
        onCancel: () => {
          dispatch.popup.updateData({ confirmVisible: false });
        },
        onOk: onConfirm,
      });
    },
    openConfirm: ({
      title,
      content,
      cancelText = "Hủy",
      okText = "Đồng ý",
      onCancel,
      onOk,
    }: any) => {
      dispatch.popup.updateData({
        confirmVisible: true,
        type: "confirm",
        title,
        content,
        cancelText,
        okText,
        onCancel,
        onOk,
      });
    },
  }),
};
