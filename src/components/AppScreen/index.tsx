import { Button, Card, Input, Pagination } from "antd";
import { AppCard } from "components/AppCard";
import AppTable from "components/AppTable";
import React, { Component, Fragment } from "react";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import styled from "styled-components";

export const ContainerStyle = styled.div`
  .oneline {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 180px;
    height: 1.2em;
    white-space: nowrap;
    width: 100%;
  }
  .table button {
    padding: 5px 3px;
    margin-right: 5px;
  }
  .now-ui-icons {
    width: 24px;
  }
`;

function AppScreen({
  screenOptions,
  columns = [],
  title = "",
  ModalDetail = null,
  searchComponents = [],
  rightHeader = null,
  children = "",
  ignoreHeader = false,
  newText = "Thêm mới",
  onNewClick = null,
  onRowClick = null,
}) {
  // : {
  //   columns: any[];
  //   screenOptions: any;
  //   title: string;
  //   ModalDetail?: any;
  //   searchComponents?: any[];
  //   rightHeader?: any;
  //   children?: any;
  //   ignoreHeader?: boolean;
  //   //   setState?: (payload: any) => void;
  // }
  const { state, setState, onSearch } = screenOptions;
  const onEdit = (data) => {
    setState({ editData: data, visibleDetail: true });
  };

  return (
    <AppCard>
      {!ignoreHeader && <PanelHeader size="sm" />}
      <ContainerStyle className="content">
        <Card className="screen-card">
          <div className="screen-header">
            <h3 className="screen-title">{title}</h3>
            {rightHeader ? (
              rightHeader
            ) : (
              <Button
                onClick={() => {
                  if (onNewClick) {
                    onNewClick();
                  } else {
                    setState({ visibleDetail: true, editData: null });
                  }
                }}
                className="app-button screen-create-btn"
                type="primary"
              >
                <i className="mr-2 fa-solid fa-circle-plus"></i>
                {newText}
              </Button>
            )}
          </div>
          {children}
          <div className="screen-body">
            <div className="screen-search">
              {searchComponents.map((item, key) =>
                item.type == "select" ? (
                  <Input />
                ) : (
                  <Input
                    className="search-field"
                    placeholder={item.placeholder}
                    onChange={onSearch(item.field)}
                  />
                )
              )}
            </div>

            <AppTable
              columns={columns}
              data={state.dataList}
              onRow={
                onRowClick
                  ? (record, rowIndex) => {
                      return {
                        onClick: (event) => {
                          onRowClick(record, rowIndex);
                        },
                      };
                    }
                  : !!ModalDetail
                  ? (record, rowIndex) => {
                      return {
                        onClick: (event) => {
                          onEdit(record);
                        },
                      };
                    }
                  : undefined
              }
            />

            <Pagination
              onChange={(page) => {
                setState({ page: page - 1 });
              }}
              current={state.page + 1}
              pageSize={state.size}
              total={state.totalElements}
            />
          </div>
        </Card>

        {!!ModalDetail && (
          <ModalDetail
            visible={state.visibleDetail}
            onClose={() => {
              setState({ visibleDetail: false, editData: undefined });
            }}
            // setVisible={(visibleDetail) => setState({ visibleDetail })}
            data={state.editData}
            onSuccess={() => {
              setState({
                // page: 0,
                visibleDetail: false,
                editData: undefined,
                refresh: !state.refresh,
              });
              // refreshData();
            }}
          />
        )}
      </ContainerStyle>
    </AppCard>
  );
}

export default AppScreen;
