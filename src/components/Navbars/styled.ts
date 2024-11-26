import { Navbar } from "reactstrap";
import styled from "styled-components";

export const StyleNavbar = styled.div`
  position: absolute;
  width: 100%;
  color: white;
  margin-bottom: 0;
  z-index: 900;
  .container-header {
    display: flex;
    align-items: center;
    padding: 5px 30px;
    height: 60px;
    /* justify-content: space-between; */
    .navbar-wrapper {
      display: flex;
      button:first-child {
        margin-right: 10px;
      }
    }
  }
`;
