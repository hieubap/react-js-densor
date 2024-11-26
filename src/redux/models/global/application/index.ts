const initState = {
  confirmDelOpen: false,
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
  effects: (dispatch) => ({}),
};
