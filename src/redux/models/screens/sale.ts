import { IDispatch } from "../..";

const initState = {
  refreshBill: () => {},
};
export default {
  state: {
    refreshBill: () => {},
  },
  reducers: {
    updateData(state: any, payload = {}) {
      return { ...state, ...payload };
    },
    resetData() {
      return { ...initState };
    },
  },
  effects: (dispatch: IDispatch) => ({}),
};
