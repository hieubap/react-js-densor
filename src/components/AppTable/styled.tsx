import { Table } from "antd";
import styled from "styled-components";

export const StyledContainer = styled(Table)`
  &.border-cell {
    td.ant-table-cell {
      border: 1px solid #ccc;
    }
  }
  th {
    &.ant-table-cell {
      padding: 10px 12px;
      /* background-color: #d74457; */
      background-color: var(--red);
      font-weight: 600;
      color: white;
    }
  }
  .ant-table-tbody {
    .ant-table-row {
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &.row-total {
        td {
          background-color: #ffdadf;
        }
      }
      &.row-select-avaiable {
        cursor: pointer;
      }
      &:hover {
        td {
          background-color: #ffdadf;
        }
      }

      td {
        &.ant-table-cell {
          padding: 8px 12px;
          line-height: 1.2;
          /* background-color: #ccc; */

          .blue {
            color: var(--blue);
          }
          .red {
            color: var(--red);
          }
          .gray {
            color: var(--gray);
          }

          .btn-action {
            cursor: pointer;
            margin-right: 3px;
            padding: 5px;
          }
          &.col-question {
            white-space: break-spaces;
          }
        }
      }
    }
  }
`;
