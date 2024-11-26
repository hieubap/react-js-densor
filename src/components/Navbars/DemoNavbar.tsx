import { Button, Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "hooks/useAuth";
import useObjState from "hooks/useObjState";
import { useDispatch } from "react-redux";
import { IDispatch } from "redux";
import { StyleNavbar } from "./styled";
import UserInfo from "./UserInfo";

function DemoNavbar(props) {
  const openConfirm = useDispatch<IDispatch>().popup.openConfirm;

  const location = useLocation();
  const [state, setState] = useObjState({
    showDetail: false,
    showChangePass: false,
  });
  const [showDetail, setShowDetail] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [color, setColor] = useState("transparent");
  const sidebarToggle = useRef();
  // const toggle = () => {
  //   if (isOpen) {
  //     setColor("transparent");
  //   } else {
  //     setColor("white");
  //   }
  //   setIsOpen(!isOpen);
  // };
  // const dropdownToggle = (e) => {
  //   setDropdownOpen(!dropdownOpen);
  // };
  // const getBrand = () => {
  //   var name;
  //   routes.map((prop, key) => {
  //     if (prop.collapse) {
  //       prop.views.map((prop, key) => {
  //         if (prop.path === location.pathname) {
  //           name = prop.name;
  //         }
  //         return null;
  //       });
  //     } else {
  //       if (prop.redirect) {
  //         if (prop.path === location.pathname) {
  //           name = prop.name;
  //         }
  //       } else {
  //         if (prop.path === location.pathname) {
  //           name = prop.name;
  //         }
  //       }
  //     }
  //     return null;
  //   });
  //   return name;
  // };
  const openSidebar = () => {
    // document.documentElement.classList.toggle("nav-open");
    // sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("white");
    } else {
      setColor("transparent");
    }
  };
  const { userInfo } = useAuth();
  useEffect(() => {
    window.addEventListener("resize", updateColor);
  }, []);
  useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      // document.documentElement.classList.toggle("nav-open");
      // sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);

  console.log(userInfo, "authDataNavbar");

  const navigator = useNavigate();
  return (
    <StyleNavbar
      color={
        location.pathname.indexOf("full-screen-maps") !== -1 ? "white" : color
      }
      // expand="lg"
      style={{ padding: 0 }}
      className={
        location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
            (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <div className="container-header">
        <div className="navbar-wrapper">
          {/* <div className="navbar-toggle">
            <Button
              onClick={() => openSidebar()}
              className="app-button screen-create-btn"
              // className="navbar-toggler"
              type="primary"
              ref={sidebarToggle}
            >
              <i className="fa-solid fa-bars"></i>
            </Button>
          </div> */}
          {/* <NavbarBrand href="/">{getBrand()}</NavbarBrand> */}
          {/* <Tooltip
            title="Bán hàng"
            color="white"
            overlayInnerStyle={{ color: "black" }}
          >
            <Button
              onClick={() => {
                navigator("/p/sale");
              }}
              className="app-button screen-create-btn"
              type="primary"
            >
              <i className="ml-auto fa-solid fa-cart-shopping"></i>
            </Button>
          </Tooltip> */}
        </div>
        {/* <i class="fa-solid fa-database"></i> */}
        {/* <Tooltip
          title="Bán hàng"
          color="white"
          overlayInnerStyle={{ color: "black" }}
        >
          <Button
            onClick={() => {
              navigator("/p/sale");
            }}
            className="app-button screen-create-btn"
            type="primary"
          >
            <i className="ml-auto fa-solid fa-cart-shopping"></i>
          </Button>
        </Tooltip> */}
        {/* <Tooltip
          color="white"
          title="Tạo dữ liệu mẫu"
          overlayInnerStyle={{ color: "black" }}
        >
          <div
            className="d-flex ml-auto mr-4 pointer"
            onClick={() =>
              openConfirm({
                title: "Chú ý !",
                content: "Bạn có chắc muốn tạo dữ liệu mẫu",
                onOk: () => {
                  productService
                    .createDemo()
                    .then((res) => {
                      notify("tạo dữ liệu mẫu thành công");
                    })
                    .catch((e) => {
                      toast.error(e.message || e.toString());
                    });
                },
              })
            }
          >
            <i className="fa-solid fa-database"></i>
          </div>
        </Tooltip> */}

        {/* <UserInfo /> */}
        {/* <Dropdown
          overlayClassName="dropdown-user-info"
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
          <div className="d-flex user-info ml-auto">
            <i className="fa-regular fa-circle-user"></i>
            <div>{userInfo?.fullname}</div>
          </div>
        </Dropdown> */}
        {/* <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <Nav navbar>
            <Dropdown
              nav
              isOpen={dropdownOpen}
              toggle={(e) => dropdownToggle(e)}
            >
              <DropdownToggle caret nav>
                <i
                  className="now-ui-icons location_world"
                  style={{ color: "white" }}
                />
                <p>
                  <span className="d-lg-none d-md-block">Some Actions</span>
                </p>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Nav>
        </Collapse> */}
      </div>
    </StyleNavbar>
  );
}

export default DemoNavbar;
