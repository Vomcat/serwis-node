import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import Chart from "./ChartYear";

const StatsFunction = (props) => {
  const miesiac = [
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
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get("/api/repairs/");
      setRepairs(res.data);
    };
    fetchData();
  }, []);

  /*  const okres = repairs
    .filter((repair) => moment(repair.date).format("MM") == 4)
    .reduce((prev, cur) => {
      return prev + cur.cost;
    }, 0); */

  const mapDayToMonth = repairs.map((x) => ({
    ...x,
    month: moment(x.date).format("M"),
    year: moment(x.date).format("YYYY"),
  }));
  const setMonthValue = mapDayToMonth
    .filter(({ year }) => year === props.year)
    .reduce((acc, cur) => {
      acc[cur.month] = acc[cur.month] + cur.cost || cur.cost;
      return acc;
    }, []);

  console.log("miesiac", setMonthValue);
  console.log(year);
  const repairsTypeSum = repairs
    .filter(({ status }) => status === "Zakończona")
    .reduce((acc, cur) => {
      acc[cur.status] = acc[cur.status] + cur.cost || cur.cost;
      return acc;
    }, []);

  console.log(repairsTypeSum);
  return (
    <Fragment>
      <label htmlFor="inputEmail4">Status naprawy</label>
      <select
        className="form-control"
        name="status"
        value={year}
        onChange={(e) => setYear(e.target.value)}
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

export default StatsFunction;
