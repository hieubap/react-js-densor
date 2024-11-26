import styled from "styled-components";

export const StyleSidebar = styled.div`
  .ant-collapse-content,
  .ant-collapse,
  .ant-collapse-content-box {
    background-color: unset;
    border: unset;
    border-bottom: none;
  }

  .ant-collapse > .ant-collapse-content {
    background-color: #e95463;
    border-bottom: none;
  }

  .nav i {
    margin-right: 5px;
    font-size: 14px;
    color: #eee;
  }
  .ant-collapse-content-box {
    /* padding-top: 0; */
    padding: 0 8px;
    border-bottom: none;
    li {
      border-left: 1px solid white;
      margin-left: 16px;
      a {
        margin: 0;
        margin-left: 8px;
        padding: 8px 5px 8px;
      }
    }
  }

  li > a.nav-link {
    margin-left: -1px;
    border-radius: 0;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }
  .nav-link.active {
    background-color: white;
  }
  .ant-collapse-header {
    .ant-collapse-header-text {
      p {
        font-size: 13px;
      }
    }
  }

  .ant-collapse-icon-position-end > .ant-collapse-item {
    border-bottom: none;
    .ant-collapse-header {
      color: white;
      font-size: 11px;
      padding-left: 7px;
    }
  }

  li > a,
  .off-canvas-sidebar .nav li > a,
  .sidebar .nav li:first-child > a,
  .off-canvas-sidebar .nav li:first-child > a {
    margin: 0 5px 0 10px;
  }
`;
