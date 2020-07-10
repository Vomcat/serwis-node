import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAllRepairs } from "../../../actions/repairs";
import moment from "moment";
import Chart from "./ChartYear";
import PieChart from "./PieChart";

const Stats = ({ repair: { repairs }, getAllRepairs }) => {
  useEffect(() => {
    getAllRepairs();
  }, [getAllRepairs]);
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

  const [yearValue, setyearValue] = useState(new Date().getFullYear());

  const allRepairsNumer = repairs.filter((x) => {
    return moment(x.dateEnd).format("YYYY") == yearValue;
  }).length;

  const endedRepairs = repairs.filter((x) => {
    return (
      x.status == "Zako?czona" && moment(x.dateEnd).format("YYYY") == yearValue
    );
  }).length;
  const warrantyRepairs = repairs.filter((x) => {
    return (
      x.status == "Gwarancja" && moment(x.dateEnd).format("YYYY") == yearValue
    );
  }).length;
  const returnedRepairs = repairs.filter((x) => {
    return (
      x.status == "Reklamacja" && moment(x.dateEnd).format("YYYY") == yearValue
    );
  }).length;

  const mapDayToMonth = repairs.map((x) => ({
    ...x,
    month: moment(x.dateEnd).format("M"),
  }));
  const setMonthValue = mapDayToMonth
    .filter((x) => moment(x.dateEnd).format("YYYY") == yearValue)
    .reduce((acc, cur) => {
      acc[cur.month] = acc[cur.month] + cur.cost || cur.cost;
      return acc;
    }, []);
  console.log({ setMonthValue });

  const repairsSum = repairs
    .filter(
      (x) =>
        x.status == "Zako?czona" &&
        moment(x.dateEnd).format("YYYY") == yearValue
    )
    .reduce((acc, cur) => {
      return acc + +cur.cost;
    }, 0);

  const repairsCount = repairs
    .filter(
      (x) =>
        x.status == "Zako?czona" &&
        moment(x.dateEnd).format("YYYY") == yearValue
    )
    .reduce((acc, cur) => {
      return acc + +cur.cost;
    }, 0);

  return (
    <Fragment>
      <div className="container">
        <div className="form-body">
          <div className="form-items-wrapper">
            <label className="label">Wybierz rok</label>
          </div>
          <div className="form-input-wrapper">
            <select
              className="select-css"
              name="status"
              value={yearValue}
              onChange={(e) => setyearValue(e.target.value)}
              required
            >
              <option value="0">Wybierz rok</option>
              <option value="2019">2019</option>
              <option value="2020"> 2020</option>
            </select>
          </div>
          <div className="form-items-wrapper">
            <h2>Statystyki za rok {yearValue}</h2>
          </div>
          <div className="stats-row">
            <h3>Suma przychodu: {repairsSum}zł</h3>
          </div>
          <div className="stats-row">
            <h3>Ilość zakończonych napraw: {endedRepairs}</h3>
          </div>
          <Chart value={setMonthValue} mie={miesiac} />

          <div className="stats-row">
            <h3>Ilość wszystkich napraw: {allRepairsNumer}</h3>
          </div>
          <div className="stats-pie">
            <PieChart
              label={[
                "Ilość zakończonych napraw: " + endedRepairs,
                "Ilość napraw gwarancyjnych: " + warrantyRepairs,
                "Ilość zwrotów: " + returnedRepairs,
              ]}
              value={[endedRepairs, warrantyRepairs, returnedRepairs]}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
Stats.propTypes = {
  getAllRepairs: PropTypes.func.isRequired,
  repair: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  repair: state.repairs,
});

export default connect(mapStateToProps, {
  getAllRepairs,
})(Stats);
