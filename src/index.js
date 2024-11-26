import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/demo.css";
import "./assets/scss/now-ui-dashboard.scss";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import "../node_modules/@font-awesome/css/font-awesome.min.css";

import AdminLayout from "./layouts/Admin";
import PublicLayout from "./layouts/Public";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./assets/scss/app.scss";
import store from "./redux";
import ConfirmDelete from "components/ConfirmDelete";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const notificationAlert = React.createRef();
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/p/*" element={<PublicLayout />} /> */}
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="*" element={<Navigate to="/admin/device" replace />} />
        </Routes>
        {/* <NotificationAlert ref={notificationAlert} /> */}
        <ToastContainer theme="colored" position="bottom-right" />
        <ConfirmDelete />
      </BrowserRouter>
    </Provider>
  );
};
root.render(<App />);
