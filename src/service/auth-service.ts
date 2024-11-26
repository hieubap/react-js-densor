import { Method, requestData, requestPage } from "./request";

export default {
  login: (body: any) =>
    requestData("/account/sign-in", body, { method: Method.POST }),
  register: (body: any) =>
    requestData("/account/sign-up", body, { method: Method.POST }),
  changePassword: (param: any) =>
    requestData("/account/change-password", param, { method: Method.PUT }),
  update: (param: any) =>
    requestData("/account/info", param, { method: Method.PUT }),
};
