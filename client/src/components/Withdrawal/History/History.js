import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const History = (props) => {
  return (
    <DataGrid
      rows={props.rows}
      columns={props.columns}
      pageSize={5}
      autoHeight
    />
  );
};
export default History;
