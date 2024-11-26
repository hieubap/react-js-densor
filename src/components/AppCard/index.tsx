import styled from "styled-components";

export const AppCard = ({ children, ...props }: any) => {
  return <AppCardComponent {...props} children={children} />;
};

const AppCardComponent = styled.div`
  .ant-card-body {
    padding: 0;
  }
  .screen-title {
    font-weight: 600;
    margin-bottom: 0;
  }
  .screen-header {
    display: flex;
    justify-content: space-between;
    padding: 8px 18px 0px;
  }
  .screen-card {
    /* margin: 0 10px; */
    .screen-create-btn {
      padding: 3px 15px;
      border-radius: 8px;
    }
  }
  .screen-search {
    display: flex;
    padding: 0 12px 10px;
  }
  .screen-body {
    .d-flex {
      display: flex;
    }
    .ant-pagination {
      padding: 18px 18px 10px;
      display: flex;
      justify-content: flex-end;
      .ant-pagination-item-active {
        background-color: var(--red);
        color: white;
      }
      .ant-pagination-item {
        border: none;
        a {
          font-weight: 600;
        }
      }
      .ant-pagination-item-link {
        border: none;
        svg {
          fill: black;
        }
      }
    }
  }
  .search-field {
    margin-right: 10px;
    &::placeholder {
      color: #666;
    }
  }
  .p-0 {
    padding: 0 !important;
  }
`;
