import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import moment from "moment";
import Chart from "./Chart";

const Stats = () => {
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
  const [yearValue, setyearValue] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get("/api/repairs/");
      setRepairs(res.data);
    };
    fetchData();
  }, []);

  const [search, setSearch] = useState([]);

  /*  const okres = repairs
    .filter((repair) => moment(repair.date).format("MM") == 4)
    .reduce((prev, cur) => {
      return prev + cur.cost;
    }, 0); */

  const sumPer = () => {
    const mapDayToMonth = repairs.map((x) => ({
      ...x,
      date: moment(x.date).format("M"),
    }));
    const setyearValue = mapDayToMonth.reduce((acc, cur) => {
      acc[cur.date] = acc[cur.date] + cur.cost || cur.cost;
      return acc;
    }, []);

    return setyearValue;
  };

  const mapDayToYear = repairs.map((x) => ({
    ...x,
    date: moment(x.date).year(),
  }));

  const rok = ["2019", "2020"];

  const sumPerYear = mapDayToYear.reduce((acc, cur) => {
    acc[cur.date] = acc[cur.date] + cur.cost || cur.cost;
    return acc;
  }, []);

  return (
    <Fragment>
      <Chart value={sumPer} mie={miesiac} />
      <Chart value={sumPerYear} mie={rok} />
    </Fragment>
  );
};

export default Stats;
