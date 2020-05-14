import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import Chart from "./ChartYear";

const Stats = () => {
  const miesiac = [
    "",
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ];

  const [repairs, setRepairs] = useState([]);
  const [yearValue, setyearValue] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get("/api/repairs/");
      setRepairs(res.data);
    };
    fetchData();
  }, []);

  const mapDayToMonth = repairs.map((x) => ({
    ...x,
    month: moment(x.date).format("M"),
  }));
  const setMonthValue = mapDayToMonth
    .filter((x) => moment(x.date).format("YYYY") == yearValue)
    .reduce((acc, cur) => {
      acc[cur.month] = acc[cur.month] + cur.cost || cur.cost;
      return acc;
    }, []);

  const repairsTypeSum = repairs
    .filter(
      (x) =>
        x.status === "Zakończona" && moment(x.date).format("YYYY") == yearValue
    )
    .reduce((acc, cur) => {
      acc[cur.status] = acc[cur.status] + cur.cost || cur.cost;
      return acc;
    }, []);

  return (
    <Fragment>
      <label htmlFor="inputEmail4">Status naprawy</label>
      <select
        className="form-control"
        name="status"
        value={yearValue}
        onChange={(e) => setyearValue(e.target.value)}
        required
      >
        <option value="0">Wybierz rok</option>
        <option value="2019">2019</option>
        <option value="2020"> 2020</option>
      </select>
      <Chart value={setMonthValue} mie={miesiac} />
    </Fragment>
  );
};

export default Stats;
