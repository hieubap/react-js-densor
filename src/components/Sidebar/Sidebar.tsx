/*eslint-disable*/
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";

import useAuth from "hooks/useAuth";
import dashRoutes from "routes";
import { Collapse } from "antd";
import { StyleSidebar } from "./styled";

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  const location = useLocation();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   ps = new PerfectScrollbar(sidebar.current, {
    //     suppressScrollX: true,
    //     suppressScrollY: false,
    //   });
    // }
    return function cleanup() {
      // if (navigator.platform.indexOf("Win") > -1) {
      //   ps.destroy();
      // }
    };
  });
  const { userInfo } = useAuth();
  console.log(userInfo, "authData===");
  return (
    <StyleSidebar className="sidebar" data-color={props.backgroundColor}>
      <div className="logo">
        {/* <span className="simple-text logo-mini" target="_blank">
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </span> */}
        <div
          className="simple-text logo-normal"
          // target="_blank"
          style={{ textAlign: "center" }}
        >
          Thiết bị
        </div>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          <Collapse defaultActiveKey={["1"]} expandIconPosition="right">
            {dashRoutes
              .filter((item) => {
                return (
                  !item.roles?.length ||
                  item.roles?.some((r) => userInfo?.roles?.includes(r))
                  // !item.noSidebar
                );
              })
              .map((prop: any, key) => {
                if (prop.children)
                  return (
                    <Collapse.Panel
                      key={key}
                      header={
                        <a>
                          <i className={prop.icon} />
                          <p>{prop.name}</p>
                        </a>
                      }
                    >
                      {prop.children.map((route, key) => (
                        <li
                          className={
                            activeRoute(route.path) +
                            (route.pro ? " active active-pro" : "")
                          }
                          key={key}
                        >
                          <NavLink
                            to={"/" + route.layout + route.path}
                            className="nav-link"
                          >
                            <i className={route.icon} />
                            <p>{route.name}</p>
                          </NavLink>
                        </li>
                      ))}
                    </Collapse.Panel>
                  );

                return (
                  <li
                    className={
                      activeRoute(prop.path) +
                      (prop.pro ? " active active-pro" : "")
                    }
                    key={key}
                  >
                    {prop.dev && (
                      <div
                        style={{
                          color: "white",
                          margin: "25px 10px 0",
                          borderBottom: "1px solid white",
                        }}
                      >
                        Đang phát triển
                      </div>
                    )}
                    <NavLink
                      to={"/" + prop.layout + prop.path}
                      className="nav-link simple-nav"
                    >
                      <i className={prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              })}
          </Collapse>
        </Nav>
      </div>
    </StyleSidebar>
  );
}

export default Sidebar;
