import React from "react";
import { Modal, ModalProps } from "antd";
import styled from "styled-components";

export const AppModal = (props: ModalProps) => {
  return <AppModalComponent {...props} />;
};

const AppModalComponent = styled(Modal)`
  .visible-field,
  .visible-field-table {
    .ant-select-single .ant-select-selector .ant-select-selection-item {
      line-height: 18px;
    }
    .ant-select-single:not(.ant-select-customize-input) .ant-select-selector,
    .field-input,
    input {
      width: 100%;
      height: 28px;
    }
  }
  .visible-field {
    min-height: 25px;
    margin-right: 30px;
    margin-bottom: 5px;
  }

  .icon-required {
    font-size: 10px;
    margin-left: 3px;
  }

  .group-bottom {
    margin-top: 35px;
  }

  .ant-select > .ant-select-selector,
  input,
  input:focus {
    border: none;
    border-bottom: 1.6px solid #aaa;
    border-radius: 0;
    padding: 4px 10px 0;
  }
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(
      .ant-select-customize-input
    )
    .ant-select-selector,
  input:focus {
    box-shadow: none;
    border-bottom: 1.5px solid #40a9ff;
  }
  .text-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .wrap-info {
    display: flex;
    flex-wrap: wrap;
  }
  .group-field {
    margin-bottom: 8px;

    label {
      color: #666;
      font-weight: 500;
      margin-bottom: 0;
    }
    div {
      font-weight: 600;
    }
    &.group-col-2 {
      width: 50%;
    }
    &.group-col-1 {
      width: 100%;

      .visible-field {
        margin-right: 0;
      }
    }
  }
`;

export const DropdownSelect = styled.div`
  .dropdown-create-btn {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    i {
      color: var(--green);
    }
    &:hover {
      background-color: #eee;
    }
  }
`;
