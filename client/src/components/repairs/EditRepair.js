import React, { useState, Fragment, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const EditRepair = ({ match, history }) => {
  const [formData, SetData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    device: "",
    code: "",
    imei: "",
    description: "",
    cost: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/repairs/" + match.params.id);
      SetData({
        first_name: !res.data.first_name ? "" : res.data.first_name,
        last_name: !res.data.last_name ? "" : res.data.last_name,
        phone_number: !res.data.phone_number ? "" : res.data.phone_number,
        email: !res.data.email ? "" : res.data.email,
        device: !res.data.device ? "" : res.data.device,
        code: !res.data.code ? "" : res.data.code,
        imei: !res.data.imei ? "" : res.data.imei,
        description: !res.data.description ? "" : res.data.description,
        cost: !res.data.cost ? "" : res.data.cost
      });
    };
    fetchData();
  }, []);

  const {
    first_name,
    last_name,
    phone_number,
    email,
    device,
    code,
    imei,
    description,
    cost,
    status
  } = formData;
  const onChange = e =>
    SetData({ ...formData, [e.target.name]: e.target.value });

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
        ["Koszt naprawy", usersRows[8]]
        // ...
      ],
      startY: 100,
      theme: "grid",
      margin: {
        right: 20,
        left: 50
      },
      tableWidth: 500,
      styles: {
        overflow: "linebreak",
        columnWidth: "wrap",
        rowHeight: "wra",
        lineWidth: 1
      },
      columnStyles: {
        0: {
          columnWidth: 130
        },
        1: {
          columnWidth: 350
        },
        columnWidth: "wrap"
      },
      rowStyles: {
        0: { rowHeight: 150 }
      }
    });
    doc.setFontSize(9);
    doc.text("Data i podpis klienta", 50, 800);
    doc.text("Podpis serwisanta", 350, 800);
    doc.save("naprawa.pdf");
  };

  /* 
const ustawka = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  device: "",
  code: "",
  imei: "",
  description: "",
  cost: ""
};

const EditRepair = ({
  repair: { repair },
  getRepair,
  updaterepair,
  history,
  match
}) => {
  const [formData, SetFormData] = useState(ustawka);

  useEffect(() => {
    console.log(typeof getRepair(match.params.id));
    getRepair(match.params.id);
    const repairDara = { ...ustawka };
    for (const key in repair) {
      if (key in repairDara) repairDara[key] = repair[key];
    }
    SetFormData(repairDara);
  }, [getRepair]);

  const {
    first_name,
    last_name,
    phone_number,
    email,
    device,
    code,
    imei,
    description,
    cost,
    status
  } = formData;

  const onChange = e =>
    SetFormData({ ...formData, [e.target.name]: e.target.value }); */
  const onSubmit = async e => {
    e.preventDefault();
    const upUser = {
      first_name,
      last_name,
      phone_number,
      email,
      device,
      code,
      imei,
      description,
      cost,
      status
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const body = upUser;
      const res = await axios.put(
        "/api/repairs/" + match.params.id,
        body,
        config
      );

      history.push("/repairs");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <div className="container text-center title">
        <h1>Edytuj naprawę</h1>
      </div>

      <div className="container">
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Imie</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={first_name}
                placeholder="Imie"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="surname">Nazwisko</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={last_name}
                placeholder="Nazwisko"
                onChange={e => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Numer telefonu</label>
              <input
                type="text"
                className="form-control"
                name="phone_number"
                value={phone_number}
                placeholder="500300330"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group col-md">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder=" Email"
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md">
              <label htmlFor="inputEmail4">Nazwa urządzenia</label>
              <input
                type="text"
                className="form-control"
                name="device"
                value={device}
                placeholder="Nazwa"
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md">
              <label htmlFor="inputEmail4">Numer seryjny / Imei</label>
              <input
                type="text"
                className="form-control"
                name="code"
                value={code}
                placeholder="Kod blokady"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group col-md">
              <label htmlFor="inputEmail4">Kod Blokady</label>
              <input
                type="text"
                className="form-control"
                name="imei"
                value={imei}
                placeholder="Imei/Numer seryjny"
                onChange={e => onChange(e)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md">
              <label htmlFor="exampleFormControlTextarea1">Opis Usterki</label>
              <textarea
                className="form-control"
                name="description"
                value={description}
                rows="3"
                onChange={e => onChange(e)}
              ></textarea>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Koszt naprawy</label>
              <input
                type="text"
                className="form-control"
                name="cost"
                value={cost}
                placeholder="cena"
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Status naprawy</label>
              <select
                className="form-control"
                name="status"
                value={status}
                onChange={e => onChange(e)}
                required
              >
                <option value="0">Wybierz status naprawy</option>
                <option value="Otwarta">Otwarta</option>
                <option value="Reklamacja"> Reklamacja</option>
                <option value="Gwaracnja">Gwaracnja</option>
                <option value="Zakończona">Zakończona</option>
              </select>
            </div>
          </div>
          <div className="btn-group mr-2"></div>
          <input
            type="submit"
            value="zapisz"
            className="btn btn-primary my-1 btn-lg btn-block"
          />
        </form>
        <button
          className="btn btn-primary my-1 btn-lg btn-block"
          onClick={print}
        >
          pdf
        </button>
      </div>
    </Fragment>
  );
};

export default EditRepair;
