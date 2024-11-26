import { Button, Input, Modal } from "antd";
import { AppModal } from "components/AppModal";
import useAuth from "hooks/useAuth";
import useObjState from "hooks/useObjState";
import React from "react";
import { toast } from "react-toastify";
import authService from "service/auth-service";

function ChangePassModal({ visible, onClose }) {
  const { userInfo } = useAuth();
  const [state, setState] = useObjState({});

  const _onClose = () => {
    setState({ password: "", newPassword: "", newPassword2: "" });
    onClose();
  };

  const handleSubmit = () => {
    if (state.newPassword != state.newPassword2) {
      toast.error("Vui lòng nhập lại mật khẩu");
      return;
    }
    authService
      .changePassword({
        username: userInfo.username,
        password: state.password,
        newPassword: state.newPassword,
      })
      .then((res) => {
        toast.success("Đổi mật khẩu thành công");
        _onClose();
      })
      .catch((e) => {
        toast.error(e?.message || e?.toString());
      });
  };

  return (
    <AppModal open={visible} onCancel={_onClose} footer={false}>
      <div>
        <div className="text-title">{"Đổi mật khẩu"}</div>
        <div className="wrap-info">
          {[
            {
              label: "Mật khẩu hiện tại",
              value: state?.password,
              field: "password",
            },
            {
              label: "Mật khẩu mới",
              value: state?.newPassword,
              field: "newPassword",
            },
            {
              label: "Nhập lại mật khẩu",
              value: state?.newPassword2,
              field: "newPassword2",
            },
          ].map((item, key) => (
            <div key={key} className="group-field group-col-1">
              <label>
                {item.label}
                <i className="icon-required fa-solid fa-asterisk text-red"></i>
              </label>
              <div className="visible-field">
                <Input
                  className="field-input"
                  value={item.value}
                  onChange={(e) => setState({ [item.field]: e.target.value })}
                  type="password"
                  //   onChange={onChange(item.field)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="d-flex mt-3">
          <Button
            type="primary"
            className="app-button gray ml-auto"
            onClick={_onClose}
          >
            <i className="btn-action fa-solid fa-xmark mr-1"></i>
            Hủy
          </Button>
          <Button
            type="primary"
            className="app-button green ml-2"
            onClick={handleSubmit}
          >
            {/* <i class="fa-solid fa-retweet"></i> */}
            <i className="btn-action fa-solid fa-retweet mr-1"></i>
            Đổi
          </Button>
        </div>
      </div>
    </AppModal>
  );
}

export default ChangePassModal;
