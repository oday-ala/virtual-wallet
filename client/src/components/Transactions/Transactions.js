import "./Transactions.css";
import { DataGrid } from "@material-ui/data-grid";
import React from "react";
import { columns } from "../Data/Data";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const Transactions = () => {
  const [dataGridRows, setDataGridRows] = useState([]);
  const [lodaing, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/data", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        Object.keys(res.data.transactions).forEach((key) => {
          setDataGridRows((dataGridRows) => [
            ...dataGridRows,
            {
              id: key,
              title: res.data.transactions[key].title,
              points: res.data.transactions[key].points,
              actions: res.data.transactions[key].actions,
              date: res.data.transactions[key].date,
            },
          ]);
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  // const columns = [
  //   { field: "id", headerName: "ID", width: 200 },
  //   {
  //     field: "title",
  //     headerName: "Title",
  //     width: 200,
  //   },
  //   { field: "points", headerName: "Points", width: 200 },
  //   { field: "actions", headerName: "Actions", width: 200 },
  //   {
  //     field: "date",
  //     headerName: "Date",
  //     width: 200,
  //   },
  // ];

  const dataGrid = (
    <DataGrid
      autoHeight
      rows={dataGridRows}
      disableSelectionOnClick
      columns={columns}
      pageSize={8}
      checkboxSelection
    />
  );

  return <div className="transactions">{lodaing ? <Spinner /> : dataGrid}</div>;
};
export default Transactions;
