import React from "react";
import { ContainerStyle } from "./styled";
import { requestHeaders, requestFetch } from "service/request";
import { notificationAlert } from "index";
import { notify } from "utils/notification";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAuth from "hooks/useAuth";
import { Button, Input } from "antd";

function Login() {
  const params = useParams();
  console.log(params, "params");

  const dataRef = React.useRef<any>({});
  const [isSignin, setSignin] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const { saveAuthData } = useAuth();
  const onLogin = () => {
    requestFetch("post", "/account/sign-in", {
      username: dataRef.current.username,
      password: dataRef.current.password,
      merchant: params?.merchant || dataRef.current.merchant,
      router: "shop",
    }).then((res: any) => {
      console.log(res, "res");
      if (res.code != 200) {
        notify(res.message, "error");
      } else {
        requestHeaders.authorization = "Bearer " + res.data.token;
        saveAuthData(res.data);
        notify("Đăng nhập thành công");
        setSignin(true);
      }
    });
  };

  const navigate = useNavigate();

  return (
    <ContainerStyle className="wrapper wrapper-full-page">
      {isSignin && <Navigate to="/admin/dashboard" replace={true} />}
      <div className="full-page section-image" filter-color="yellow">
        <div className="content">
          <div className="login-page">
            <div className="container">
              <div className="ml-auto mr-auto col-12 col-md-8 col-lg-5 container-card">
                <form className="">
                  <div className="card-login card-plain card">
                    <div className="card-header">
                      {/* <div className="logo-container">
                        <img src="" alt="now-logo" />
                      </div> */}
                      <div className="header-text">Đăng nhập</div>
                    </div>
                    <div className="card-body">
                      <div className="no-border form-control-lg mt-4 input-group">
                        {/* <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="now-ui-icons users_circle-08" />
                          </span>
                        </div> */}

                        <label>Tên đăng nhập</label>
                        <Input
                          placeholder="Nhập tên đăng nhập"
                          onChange={(e) => {
                            dataRef.current.username = e.target.value;
                          }}
                        />
                        {/* <input
                          placeholder="Username..."
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            dataRef.current.username = e.target.value;
                          }}
                        /> */}
                      </div>
                      <div className="no-border form-control-lg  input-group mt-4">
                        {/* <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="now-ui-icons text_caps-small" />
                          </span>
                        </div> */}
                        <label>Mật khẩu</label>
                        <Input
                          placeholder="Nhập mật khẩu"
                          type="password"
                          onChange={(e) => {
                            dataRef.current.password = e.target.value;
                          }}
                        />
                        {/* <input
                          placeholder="Password..."
                          type="password"
                          className="form-control"
                          
                        /> */}
                      </div>
                    </div>
                    <Button
                      onClick={onLogin}
                      className="app-button screen-create-btn w-100 bg-green"
                      type="primary"
                    >
                      {/* <i className="mr-2 fa-solid fa-circle-plus"></i> */}
                      <i className="mr-2 fa-solid fa-right-to-bracket"></i>
                      Đăng nhập
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="full-page-background" />
        <footer className="footer"></footer>
      </div>
      {/* <ModalLeaveForm
        visible={visible}
        setVisible={(visible) => setVisible(false)}
      /> */}
    </ContainerStyle>
  );
}

export default Login;
