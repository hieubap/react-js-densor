import React, { useEffect, useState } from "react";

import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import { AppModal } from "components/AppModal";
import AppTable from "components/AppTable";
import { requestFetch } from "service/request";
import { formatPrice } from "utils";
import { notify } from "utils/notification";
import moment from "moment";
import { formatMoment, toGender } from "utils/app-utils";

function CustomerModal({
  visible,
  onClose = () => {},
  onSuccess = (_: any) => {},
  data,
}) {
  //   const dataRef = React.useRef({});
  const [state, _setState] = useState<any>({ modalData: {}, categoryList: [] });
  const setState = (data) => {
    _setState((pre) => ({ ...pre, ...data }));
  };

  const [form] = Form.useForm();

  //   dataRef.current = data ? { ...data } : {};
  //   if (!data) {
  //     dataRef.current = {
  //       fullname: "",
  //     };
  //   }

  React.useEffect(() => {
    setState({ modalData: data || {}, editMode: !data, isNew: !data?._id });
  }, [data]);

  useEffect(() => {
    requestFetch("get", "/s/provinces").then((res: any) => {
      if (res.code == 0) {
        setState({
          provinceList: res.data?.map((i) => ({
            label: i.name,
            value: i._id,
          })),
        });
      }
    });
  }, []);

  const handleSubmit = (values) => {
    // console.log(data, "data???");
    const data: any = state.modalData;
    const body = { ...data, _id: data?._id };
    requestFetch(data?._id ? "put" : "post", "/s/supplier", body).then(
      (res: any) => {
        if (res.code == 0) {
          notify("Chỉnh sủa thành công");
          onSuccess(res.data);
        } else {
          notify(res.message, "error");
        }
      }
    );
  };

  const onChange = (key) => (e) => {
    const newData = {
      ...state.modalData,
      [key]:
        typeof e == "string" || typeof e == "number"
          ? e
          : e.target?.value || "",
    };
    // dataRef.current[key] = e.target?.value || e;
    setState({ modalData: newData });
    // console.log(dataRef.current, "dataRef.current", e.target.value);
  };

  return (
    <AppModal open={visible} onCancel={onClose} footer={false} width={700}>
      <div>
        <div className="text-title">
          {!state.editMode
            ? "Chi tiết"
            : state.isNew
            ? "Thêm mới"
            : "Chỉnh sửa"}
        </div>
        <div className="wrap-info">
          {[
            {
              label: "Mã nhà cung cấp",
              value: state.modalData?.supplierCode,
              field: "supplierCode",
              renderEdit: null,
            },
            {
              label: "Tên nhà cung cấp",
              value: state.modalData?.supplierName,
              field: "supplierName",
            },
            {
              label: "Số điện thoại",
              value: state.modalData?.phone,
              field: "phone",
            },
            {
              label: "Email",
              value: state.modalData?.email,
              field: "email",
            },
            {
              label: "Điạ chỉ",
              value: state.modalData?.address,
              field: "address",
            },
            {
              label: "Công ty",
              value: state.modalData?.company,
              field: "company",
            },
            {
              label: "Ghi chú",
              value: state.modalData?.note,
              field: "note",
            },
          ].map((item, idx) => (
            <div className="group-field group-col-2" key={idx}>
              <label>{item.label}</label>
              {state.editMode ? (
                <div className="visible-field">
                  {item.renderEdit ? (
                    item.renderEdit()
                  ) : (
                    <Input
                      className="field-input"
                      value={item.value}
                      onChange={onChange(item.field)}
                    />
                  )}
                </div>
              ) : (
                <div className="visible-field">{item.value || "Chưa có"}</div>
              )}
            </div>
          ))}
        </div>

        <div className="group-bottom">
          {state.editMode ? (
            <div className="d-flex">
              <Button
                type="primary"
                className="app-button gray ml-auto"
                onClick={() => {
                  if (state.isNew) {
                    onClose();
                    return;
                  }
                  setState({ editMode: false });
                }}
              >
                <i className="btn-action fa-solid fa-xmark mr-1"></i>
                Hủy
              </Button>
              <Button
                type="primary"
                className="app-button green ml-2"
                onClick={handleSubmit}
              >
                <i className="btn-action fa-solid fa-pen-to-square mr-1"></i>
                Lưu
              </Button>
            </div>
          ) : (
            <div className="d-flex">
              <Button
                type="primary"
                // style={{ marginLeft: "auto" }}
                className="app-button gray ml-auto"
                onClick={onClose}
              >
                <i className="btn-action fa-solid fa-xmark mr-1"></i>
                Đóng
              </Button>
              <Button type="primary" className="app-button red ml-2">
                <i className="btn-action fa-solid fa-trash mr-1"></i>
                Xóa
              </Button>
              <Button
                type="primary"
                className="app-button green ml-2"
                onClick={() => {
                  setState({ editMode: true });
                }}
              >
                <i className="btn-action fa-solid fa-pen-to-square mr-1"></i>
                Chỉnh sửa
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppModal>
  );
}

export default CustomerModal;
