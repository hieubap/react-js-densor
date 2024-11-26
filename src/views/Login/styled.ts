import styled from "styled-components";

export const ContainerStyle = styled.div`
  min-height: 100vh;
  height: auto;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;

  position: relative;
  top: 0;
  height: 100vh;
  overflow: hidden;

  .full-page.section-image {
    position: static;
  }
  .section-image {
    background-size: cover;
    background-position: 50%;
    position: relative;
    width: 100%;
  }
  .full-page {
    min-height: 100vh;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .section-image:after {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    left: 0;
    top: 0;
    content: "";
    background-color: rgba(0, 0, 0, 0.7);
  }

  .full-page > .content {
    padding-bottom: 150px;
    padding-top: 150px;
    width: 100%;
  }
  .full-page > .content,
  .full-page > .footer {
    position: relative;
    z-index: 4;
  }

  .full-page .full-page-background {
    background-image: url(${require("./background-login.jpg")});
  }

  .login-page .card-login .logo-container {
    width: 65px;
    margin: 0 auto 55px;
  }
  .login-page .card-login.card-plain .input-group.no-border .form-control {
    background-color: hsla(0, 0%, 100%, 0.1);
    color: #fff;
  }
  .login-page .card-login.card-plain .input-group.no-border .form-control {
    background-color: hsla(0, 0%, 100%, 0.1);
    color: #fff;
  }

  .login-page
    .card-login.card-plain
    .input-group.no-border
    .input-group-prepend
    .input-group-text {
    background-color: hsla(0, 0%, 100%, 0.1);
    border: none;
    color: #fff;
  }

  .card-login {
    padding: 0 12px;
  }

  .full-page .full-page-background,
  .full-page:after {
    position: absolute;
    height: 100%;
    width: 100%;
    display: block;
    top: 0;
    left: 0;
  }
  .full-page .full-page-background {
    z-index: -1;
    background-size: cover;
    background-position: 50%;
  }

  .full-page .footer {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  .footer {
    padding: 24px 0;
  }
  /* .full-page .full-page-background,
  .full-page:after {
    position: absolute;
    height: 100%;
    width: 100%;
    display: block;
    top: 0;
    left: 0;
  }
  .full-page-background {
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: block;
    top: 0;
    left: 0;
    z-index: -1;
    background-size: cover;
    background-position: 50%;
    background-image: url(${require("./background-login.jpg")});
    &::after {
      background-color: rgba(0, 0, 0, 0.7);
    }
  } */

  .container-card {
    background-color: white;
    border-radius: 10px;
    .header-text {
      font-weight: 600;
      text-align: center;
      margin-bottom: 18px;
      font-size: 18px;
    }

    .card-body {
      label {
        color: #444;
      }
    }

    .text-navigate {
      margin-top: 15px;
      text-align: center;
      span {
        color: var(--blue);
        font-weight: 600;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
  .ant-select > .ant-select-selector,
  input,
  input:focus {
    border: none;
    border-bottom: 1.6px solid #aaa;
    border-radius: 0;
    padding: 4px 10px 0;
    box-shadow: none;
  }

  input:focus {
    border-color: var(--blue);
  }
`;
