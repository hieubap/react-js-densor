import { IDispatch } from "../../..";

export default {
  state: {
    language: {},
  },
  reducers: {
    updateData(state: any, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch: IDispatch) => ({
    initLanguage: () => {},
  }),
};
