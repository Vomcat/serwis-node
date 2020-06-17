import React, { useState, Fragment, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRepair, updateRepair } from "../../actions/repairs";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EditRepair = ({
  repair: { repair, loading },
  getRepair,
  updateRepair,
  history,
  match,
}) => {
  const [formData, SetFormData] = useState({
    repairid: match.params.id,
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    device: "",
    code: "",
    imei: "",
    description: "",
    cost: "",
    status: "",
  });
  const {
    repairid,
    first_name,
    last_name,
    phone_number,
    email,
    device,
    code,
    imei,
    description,
    cost,
    status,
  } = formData;

  useEffect(() => {
    getRepair(repairid);
  }, [repairid, getRepair]);

  const useIsMounted = () => {
    const isMounted = useRef(false);
    useEffect(() => {
      isMounted.current = true;
      return () => (isMounted.current = false);
    }, []);
    return isMounted;
  };

  const isMounted = useIsMounted();

  useEffect(() => {
    if (loading === false && isMounted.current) {
      const {
        repairid,
        first_name,
        last_name,
        phone_number,
        email,
        device,
        code,
        imei,
        description,
        cost,
        status,
      } = repair;
      SetFormData({
        repairid,
        first_name,
        last_name,
        phone_number,
        email,
        device,
        code,
        imei,
        description,
        cost,
        status,
      });
    }
  }, [repair, isMounted, loading]);

  const onChange = (e) =>
    SetFormData({ ...formData, [e.target.name]: e.target.value });

  const print = () => {
    var usersRows = [];
    for (var o in formData) {
      usersRows.push(formData[o]);
    }
    const doc = new jsPDF("p", "pt", "a4");
    doc.setFontSize(35);
    doc.text("Serwis Komputerowy", 105 * 2.83, 20 * 2.83, null, null, "center");
    doc.autoTable({
      head: [["", "Dane naprawy"]],
      body: [
        ["Imie", usersRows[0]],
        ["Nazwisko", usersRows[1]],
        ["Numer telefonu", usersRows[2]],
        ["Email", usersRows[3]],
        ["Nazwa ", usersRows[4]],
        ["Numer seryjny/imei", usersRows[5]],
        ["kod blokady", usersRows[6]],
        ["Opis usterki", usersRows[7]],
        ["Koszt naprawy", usersRows[8]],
        // ...
      ],
      startY: 100,
      theme: "grid",
      margin: {
        right: 20,
        left: 50,
      },
      tableWidth: 500,
      styles: {
        overflow: "linebreak",
        columnWidth: "wrap",
        rowHeight: "wra",
        lineWidth: 1,
      },
      columnStyles: {
        0: {
          columnWidth: 130,
        },
        1: {
          columnWidth: 350,
        },
        columnWidth: "wrap",
      },
      rowStyles: {
        0: { rowHeight: 150 },
      },
    });
    doc.setFontSize(9);
    doc.text("Data i podpis klienta", 50, 800);
    doc.text("Podpis serwisanta", 350, 800);
    doc.save("naprawa.pdf");
  };

  return (
    <Fragment>
      <div className="container container--flex ">
        <div className="form-body form-repair">
          <div className="form-items-wrapper">
            <h1>Edytuj naprawę</h1>
          </div>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              updateRepair(match.params.id, formData, history);
            }}
          >
            <div className="row row-space">
              <div className="col-2">
                <div className="form-input-wrapper">
                  <label htmlFor="name" className="label">
                    Imie
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    value={first_name}
                    placeholder="Imie"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
              </div>
              <div className="col-2">
                <div className="form-input-wrapper">
                  <label htmlFor="name" className="label">
                    Nazwisko
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    value={last_name}
                    placeholder="Nazwisko"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row row-space">
              <div className="col-2">
                <div className="form-input-wrapper">
                  <label htmlFor="name" className="label">
                    Numer telefonu
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone_number"
                    value={phone_number}
                    placeholder="500600700"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
              </div>
              <div className="col-2">
                <div className="form-input-wrapper">
                  <label htmlFor="name" className="label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    placeholder="email@wp.pl"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row row-space">
              <div className="form-input-wrapper">
                <label htmlFor="inputEmail4" className="label">
                  Nazwa urządzenia
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="device"
                  value={device}
                  placeholder="Nazwa"
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <div className="row row-space">
              <div className="col-2">
                <div className="form-input-wrapper">
                  <label htmlFor="inputEmail4" className="label">
                    Kod Blokady
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="imei"
                    value={imei}
                    placeholder="Imei/Numer seryjny"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
              </div>
              <div className="col-2">
                <div className="form-input-wrapper">
                  <label htmlFor="inputEmail4" className="label">
                    Numer seryjny / Imei
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    value={code}
                    placeholder="Kod blokady"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md">
                <label htmlFor="exampleFormControlTextarea1" className="label">
                  Opis Usterki
                </label>
                <textarea
                  className="form-control form-control__textarea "
                  name="description"
                  value={description}
                  onChange={(e) => onChange(e)}
                  required
                ></textarea>
              </div>
            </div>
            <div className="row row-space">
              <div className="form-row">
                <div className="form-input-wrapper">
                  <label htmlFor="inputEmail4" className="label">
                    Koszt naprawy
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="cost"
                    value={cost}
                    placeholder="cena"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
              </div>
              <div className="col-2">
                <div className="form-row">
                  <div className="form-input-wrapper">
                    <label htmlFor="inputEmail4" className="label">
                      Status naprawy
                    </label>
                    <select
                      className="select-css"
                      name="status"
                      value={status}
                      onChange={(e) => onChange(e)}
                      required
                    >
                      <option value="0">Wybierz status naprawy</option>
                      <option value="Otwarta">Otwarta</option>
                      <option value="Reklamacja"> Reklamacja</option>
                      <option value="Gwarancja">Gwarancja</option>
                      <option value="Zakończona">Zakończona</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <input type="submit" value="zapisz" className="btn btn--green" />
          </form>
          <button className="btn btn--yellow" onClick={print}>
            pdf
          </button>
        </div>
      </div>
    </Fragment>
  );
};

EditRepair.propTypes = {
  getRepair: PropTypes.func.isRequired,
  updateRepair: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repair: state.repairs,
});

export default connect(mapStateToProps, { updateRepair, getRepair })(
  EditRepair
);
