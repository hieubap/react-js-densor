import React from "react";
import { StyledContainer } from "./styled";
import { TableProps } from "antd";

interface TableViewProp<Record> extends TableProps<Record> {
  data: Record[];
}
function AppTable({
  columns = [],
  data = [],
  rowClassName,
  ...rest
}: // rowClick = () => () => {},
// rowClassName,
TableViewProp<any>) {
  return (
    <StyledContainer
      {...rest}
      columns={columns}
      dataSource={data}
      rowClassName={
        rowClassName ? rowClassName : rest.onRow ? "row-select-avaiable" : ""
      }
      pagination={false}
    />
  );
}

export default AppTable;
