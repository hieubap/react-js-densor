import PerfectScrollbar from "perfect-scrollbar";
import React, { useMemo } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DemoNavbar from "components/Navbars/DemoNavbar";
import Sidebar from "components/Sidebar/Sidebar";

import routes from "routes";
import ConfirmDelete from "components/ConfirmDelete";

var ps;

function Admin(props) {
  console.log(routes, "routes...");
  const location = useLocation();
  const [backgroundColor] = React.useState("orange");
  const mainPanel = React.useRef();
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.body.classList.toggle("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // mainPanel.current.scrollTop = 0;
  }, [location]);

  const routeAdmin = useMemo(() => {
    return routes.reduce(
      (a, b: any) =>
        b.children || b.layout == "admin"
          ? [...a, ...(b.children ? b.children : [b])]
          : a,
      []
    );
  }, []);

  return (
    <div className="wrapper">
      {/* <Sidebar {...props} /> */}
      <div className="main-panel" ref={mainPanel}>
        <DemoNavbar {...props} />
        <Routes>
          {routeAdmin.map((prop, key) => {
            return (
              <Route path={prop.path} element={prop.component} key={key} />
            );
          })}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Routes>
        {/* <Footer fluid /> */}
      </div>

      {/* <FixedPlugin
        bgColor={backgroundColor}
        handleColorClick={handleColorClick}
      /> */}
    </div>
  );
}

export default Admin;
