import { Button, DatePicker, Input } from "antd";
import { AppModal } from "components/AppModal";
import useAuth from "hooks/useAuth";
import useObjState from "hooks/useObjState";
import { useEffect } from "react";
import { toast } from "react-toastify";
import authService from "service/auth-service";
import { formatMoment } from "utils/app-utils";

function UserModal({ visible, onClose: _onClose }) {
  const [state, setState] = useObjState({});
  const { userInfo, saveAuthData } = useAuth();

  useEffect(() => {
    setState({
      userInfo,
    });
  }, [userInfo]);
  console.log(state, "state...");

  const onChange = (key) => (value) => {
    const newUserInfo = { ...state.userInfo };
    newUserInfo[key] = typeof value == "object" ? value?.target.value : value;
    setState({ userInfo: newUserInfo });
  };

  const handleSubmit = () => {
    authService
      .update(state.userInfo)
      .then((res) => {
        saveAuthData(res);
        toast.success("Cập nhật thành công");
        _onClose();
      })
      .catch((e) => {
        toast.error(e.message || e.toString());
      });
  };

  return (
    <AppModal open={visible} onCancel={_onClose} footer={false} width={800}>
      <div>
        <div className="text-title">{"Tài khoản"}</div>
        <div className="wrap-info">
          {[
            {
              label: "Vai trò",
              value: "Admin",
              field: "",
              renderEdit: () => "Admin",
            },
            {
              label: "Tên đăng nhập",
              value: state.userInfo?.username,
              field: "username",
              renderEdit: () => state.userInfo?.username,
            },
            {
              label: "Tên cửa hàng",
              value: state.userInfo?.shopName,
              field: "shopName",
              // renderEdit: () => "Admin",
            },
            {
              label: "Họ và tên",
              value: state.userInfo?.fullname,
              field: "fullname",
              renderEdit: null,
            },
            {
              label: "Số điện thoại",
              value: state.userInfo?.phone,
              field: "phone",
              renderEdit: null,
            },
            {
              label: "Ngày sinh",
              value: state.userInfo?.birth,
              field: "birth",
              renderEdit: () => {
                const v: any = formatMoment(state.userInfo?.birth, "moment");
                return (
                  <DatePicker
                    format={"DD/MM/YYYY"}
                    value={v}
                    onChange={(e) => {
                      onChange("birth")(e.format());
                      // setState({})
                    }}
                    className="field-input"
                    placeholder="Chọn ngày sinh"
                  />
                );
              },
            },
            {
              label: "Email",
              value: state.userInfo?.email,
              field: "email",
              renderEdit: null,
            },
            {
              label: "Địa chỉ",
              value: state.userInfo?.address,
              field: "address",
              renderEdit: null,
            },
            {
              label: "Ghi chú",
              value: state.userInfo?.note,
              field: "note",
              renderEdit: null,
            },
          ].map((item, key) => (
            <div key={key} className="group-field group-col-2">
              <label>{item.label}</label>
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
            </div>
          ))}
        </div>
        <div className="d-flex mt-3">
          <Button
            type="primary"
            className="app-button gray ml-auto"
            onClick={_onClose}
          >
            <i className="btn-action fa-solid fa-xmark mr-2"></i>
            Hủy
          </Button>
          <Button
            type="primary"
            className="app-button green ml-2"
            onClick={handleSubmit}
          >
            {/* <i class="fa-solid fa-retweet"></i> */}
            <i className="btn-action fa-solid fa-save mr-2"></i>
            Cập nhật
          </Button>
        </div>
      </div>
    </AppModal>
  );
}

export default UserModal;
