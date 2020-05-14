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
  const [reapairsCount, setRepairCount] = useState([]);
  const [repairsWarranty, setrepairsWarranty] = useState([0]);

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

  const repairsSum = repairs
    .filter(
      (x) =>
        x.status == "Zakończona" && moment(x.date).format("YYYY") == yearValue
    )
    .reduce((acc, cur) => {
      return acc + +cur.cost;
    }, 0);

  const repairsCount = repairs
    .filter(
      (x) =>
        x.status == "Zakończona" && moment(x.date).format("YYYY") == yearValue
    )
    .reduce((acc, cur) => {
      return acc + +cur.cost;
    }, 0);

  return (
    <Fragment>
      <div className="container">
        <label htmlFor="inputEmail4">Wybierz rok</label>
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
        <h2>Statystyki za rok {yearValue}</h2>
        <h3>Łączna suma przychodu: {repairsSum}zł</h3>
        <h3>Łączna suma przychodu: {repairsSum}zł</h3>
        <Chart value={setMonthValue} mie={miesiac} />
      </div>
    </Fragment>
  );
};

export default Stats;
