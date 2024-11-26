import { IDispatch } from "../../..";

const initState = {
  userInfo: {},
  email: "",
  address: "",
  accountMap: {},
  listEmailStorage: [],
  storeLoaded: false,
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
  effects: (dispatch: IDispatch) => ({}),
};
