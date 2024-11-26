import { Models } from "@rematch/core";
import account from "./global/account";
import application from "./global/application";
import language from "./global/language";
import popup from "./global/popup";
import sale from "./screens/sale";

export interface RootModel extends Models<RootModel> {
  // global
  application: typeof application;
  account: typeof account;
  language: typeof language;
  popup: typeof popup;
  sale: typeof sale;
  // provider
}

export const models: RootModel = {
  application,
  account,
  language,
  popup,
  sale,
};
export default models;
