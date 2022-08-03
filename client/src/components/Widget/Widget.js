import "./Widget.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { columns } from "../Data/Data";
export default function WidgetLg() {
  const [dataGridRows, setDataGridRows] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/data", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        let len = res.data.transactions.length - 1;
        if (len <= 3) {
          Object.keys(res.data.transactions).forEach((key) => {
            console.log("points ", res.data.transactions[key].points);
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
        } else {
          Object.keys(res.data.transactions).forEach((key) => {
            if (key < 3) {
              setDataGridRows((dataGridRows) => [
                ...dataGridRows,
                {
                  id: len - key,
                  title: res.data.transactions[len - key].title,
                  points: res.data.transactions[len - key].points,
                  actions: res.data.transactions[key].actions,
                  date: res.data.transactions[len - key].date,
                },
              ]);
            }
          });
        }
      });
  }, []);

  return (
    <div className="widget">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <div>
        <DataGrid
          autoHeight
          rows={dataGridRows}
          disableSelectionOnClick
          columns={columns}
          pageSize={3}
          checkboxSelection
        />
      </div>
    </div>
  );
}
