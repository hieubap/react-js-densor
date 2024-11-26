import { Dropdown } from "antd";
import useAuth from "hooks/useAuth";
import useObjState from "hooks/useObjState";
import React from "react";
import styled from "styled-components";
import UserModal from "./UserModal";
import ChangePassModal from "./ChangePassModal";

function UserInfo({ color }: { color?: string }) {
  const [state, setState] = useObjState({});
  const { userInfo } = useAuth();
  return (
    <>
      <DropdownStyle
        overlayClassName={"dropdown-user-info "}
        menu={{
          items: [
            {
              label: "Thông tin tài khoản",
              key: "1",
              onClick: () => {
                setState({ showDetail: true });
              },
            },
            {
              label: "Đổi mật khẩu",
              key: "2",
              onClick: () => {
                setState({ showChangePass: true });
                // localStorage.clear();
                // window.location.href = "/";
              },
            },
            {
              label: "Đăng xuất",
              key: "3",
              onClick: () => {
                localStorage.clear();
                window.location.href = "/";
              },
            },
          ],
        }}
      >
        <div
          className={
            "d-flex user-info ml-auto " + (color == "white" ? "drop-white" : "")
          }
        >
          <i className="fa-regular fa-circle-user"></i>
          <div className="user-name">{userInfo?.fullname}</div>
        </div>
      </DropdownStyle>

      <UserModal
        visible={state.showDetail}
        onClose={() => {
          setState({ showDetail: false });
        }}
      />
      <ChangePassModal
        visible={state.showChangePass}
        onClose={() => {
          setState({ showChangePass: false });
        }}
      />
    </>
  );
}

export default UserInfo;

const DropdownStyle = styled(Dropdown)`
  border: 1px solid #888;
  padding: 5px 12px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  align-items: center;
  cursor: pointer;

  .user-info {
    align-items: center;
  }

  i {
    margin-left: 3px;
    margin-right: 8px;
    font-size: 16px;
  }
  &.drop-white {
    background-color: unset;
    color: white;
    border-color: rgba(0, 0, 0, 0);
  }
  .user-name {
    font-weight: 600;
  }
`;
