import moment, { Moment } from "moment";

export const toGender = (g) => (g == 1 ? "Nam" : g == 2 ? "Nữ" : "");
export const formatMoment = (
  v,
  type?: "format" | "moment"
): Moment | string | null =>
  v ? (type == "moment" ? moment(v) : moment(v).format("DD/MM/YYYY")) : "";
